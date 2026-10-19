```
+-----------------------------------------------------------------------------------+
|                                   DEVELOPER LAPTOP                                 |
|                                                                                   |
|  +--------------------+        +--------------------+                             |
|  |   VS Code / Git    | -----> | Local Git / GitLab |                             |
|  +--------------------+        +--------------------+                             |
|            |                              |                                       |
|            |                              v (Triggers CI Pipeline)                |
|            |                   +--------------------+                             |
|            |                   |    GitLab Runner   |                             |
|            |                   | (Build, Test, Push)|                             |
|            |                   +--------------------+                             |
|            |                              |                                       |
|            |                              v (Pushes container image)              |
|            |                   +--------------------+                             |
|            |                   | Container Registry |                             |
|            |                   +--------------------+                             |
|            |                              ^                                       |
|            | (IaC Manifests)              | (Pull Image)                          |
|            v                              |                                       |
|  +-----------------------------------------------------------------------------+  |
|  |                     KIND (Kubernetes in Docker) Cluster                     |  |
|  |                                                                             |  |
|  |  +--------------------+    Syncs Git State    +--------------------------+  |  |
|  |  |   Argo CD Engine   | <===================  |  App Configuration Repo  |  |  |
|  |  +--------------------+                       +--------------------------+  |  |
|  |            |                                                                |  |
|  |            v Deploys Manifests                                              |  |
|  |  +-----------------------------------------------------------------------+  |  |
|  |  | Deployments | Services | Ingress | ConfigMaps | Secrets (SOPS/ESO)   |  |  |
|  |  +-----------------------------------------------------------------------+  |  |
|  |                                                                             |  |
|  |  +-----------------------------------------------------------------------+  |  |
|  |  | Observability Stack (Prometheus + Grafana Dashboards)                 |  |  |
|  |  +-----------------------------------------------------------------------+  |  |
|  +-----------------------------------------------------------------------------+  |  |
+-----------------------------------------------------------------------------------+
```

# Phase 1: Local Environment & Cluster Setup (Days 1–3)
## Day 1: WSL 2, Docker Engine & Resource Governance
- Goal: Configure resource limits and install local container tools.
- Tasks (2 Hours):
  1. Confirm `.wslconfig` settings (`memory=6GB, processors=4, swap=2GB`).
  2. Restart WSL: wsl --shutdown in PowerShell.
  3. Install Docker Desktop or configure Docker Engine inside WSL 2
  4. Verify resource allocation: run `docker info` and check memory thresholds.
 
## Day 2: Local Kubernetes (`Kind`) Deployment
- Goal: Spin up a single-node local Kubernetes cluster.
- Tasks (2 Hours):
  1. Install `kind` CLI and `kubectl`.
  2. Create a cluster configuration file (`kind-config.yaml`):
     ```yaml
      kind: Cluster
      apiVersion: kind.x-k8s.io/v1alpha4
      nodes:
      - role: control-plane
        extraPortMappings:
        - containerPort: 30080
          hostPort: 8080
          protocol: TCP
     ```
  3. Create cluster:
     `kind create cluster --config kind-config.yaml --name devops-lab`.
  4. Test connectivity: `kubectl cluster-info` and `kubectl get nodes`.

## Day 3: Application Development & Containerization
- Goal: Write a lightweight microservice and package it into a Docker image.
- Tasks (2 Hours):
  1. Create a simple Node.js or Python Flask REST API with a `/health` endpoint.
  2. Write an optimized multi-stage `Dockerfile`:
     ```Dockerfile
      # Build stage
      FROM node:18-alpine AS builder
      WORKDIR /app
      COPY package*.json ./
      RUN npm ci --only=production
      
      # Runtime stage
      FROM node:18-alpine
      WORKDIR /app
      COPY --from=builder /app/node_modules ./node_modules
      COPY . .
      USER node
      EXPOSE 3000
      CMD ["node", "server.js"]
     ```
  3. Build and test locally: `docker build -t local-app:v1.0.0` .
  4. Load the image into Kind:
     `kind load docker-image local-app:v1.0.0 --name devops-lab`.


# Phase 2: Declarative Infrastructure & Secrets (Days 4–6)
## Day 4: OpenTofu Infrastructure Provisioning
- Goal: Declare local Kubernetes namespaces, ConfigMaps, and deployments using OpenTofu.
- Tasks (2 Hours):
  1. Create `providers.tf` pointing to the local Kubernetes cluster context:
     ```Terraform
      terraform {
        required_providers {
          kubernetes = {
            source  = "hashicorp/kubernetes"
            version = "~> 2.23"
          }
        }
      }
      
      provider "kubernetes" {
        config_path = "~/.kube/config"
      }
     ```
  2. Define Kubernetes resources in `main.tf`:
     - Namespace: `dev-environment`
     - ConfigMap: Application environment variables
    
  3. Execute OpenTofu workflow:
     ```Bash
    tofu init
    tofu plan
    tofu apply -auto-approve
     ```

## Day 5: Secrets Management in GitOps

- Goal: Implement encrypted secrets that can safely live in Git.
- Tasks (2 Hours):
  1. Install Bitnami **Sealed Secrets** controller on the Kind cluster:
  ```Bash
  kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml
  ```
  2. Install `kubeseal` CLI on host machine.
  3. Convert a standard Kubernetes Secret into an encrypted `SealedSecret` custom
     ```Bash
      kubectl create secret generic app-db-secret --from-literal=password='SuperSecretPass' --dry-run=client -o yaml | kubeseal --format yaml > sealed-secret.yaml
     ```
  4. Confirm that sealed-secret.yaml can be committed safely to Git.
     
## Day 6: Manifest Packaging with Kustomize
- Goal: Structure manifests across environments (Dev / Staging) without duplicating YAML code.
- Tasks (2 Hours):
  1. Set up Kustomize directory structure:
     ```
      k8s-manifests/
      ├── base/
      │   ├── deployment.yaml
      │   ├── service.yaml
      │   └── kustomization.yaml
      └── overlays/
          ├── dev/
          │   └── kustomization.yaml
          └── prod/
              └── kustomization.yaml
     ```
  2. Configure image tagging and replicas in `overlays/dev/kustomization.yaml`.
  3. Test rendering: `kubectl kustomize k8s-manifests/overlays/dev`.
