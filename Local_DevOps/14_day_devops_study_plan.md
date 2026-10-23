# Local End-to-End DevOps & GitOps CI/CD Mastery Roadmap

This documentation provides a structured, 14-day step-by-step implementation plan (2 hours/day) to build an enterprise-grade, zero-cost DevOps & GitOps pipeline entirely on your local machine.

---

## Architectural Blueprint & System Design

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

---

## Daily Action Plan (2 Hours/Day)

---

### **Phase 1: Local Environment & Cluster Setup (Days 1–3)**

#### **Day 1: WSL 2 / OS Prep, Docker Engine & Resource Governance**
* **Goal:** Configure resource limits and install local container tools.
* **Tasks (2 Hours):**
  1. Confirm system resource settings (`.wslconfig` on Windows or host limits on Linux).
     - "C:\Users\prade\.wslconfig"
     ```
      [wsl2]
      memory=6GB
      processors=4
      swap=2GB
     ```
  3. Restart WSL: `wsl --shutdown` in PowerShell (if using Windows).
  4. Install Docker Engine / Docker Desktop.
     ```bash
      sudo apt update -y
      sudo apt install docker.io -y
     ```
  6. Verify resource allocation: run `docker info` and check memory thresholds.

---

#### **Day 2: Local Kubernetes (`Kind`) Deployment**
* **Goal:** Spin up a local Kubernetes cluster.
* **Tasks (2 Hours):**
  1. Install `kind` CLI and `kubectl`.
     ```
      # kubectl
      curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
      sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
      kubectl version --client

      # kind
      [ $(uname -m) = x86_64 ] && curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
      chmod +x ./kind
      sudo mv ./kind /usr/local/bin/kind
      kind version
     ```
  3. Create a cluster configuration file (`kind-config.yaml`):
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
  4. Create cluster: `kind create cluster --config kind-config.yaml --name devops-lab`.
  5. Test connectivity: `kubectl cluster-info` and `kubectl get nodes`.

---

#### **Day 3: Application Development & Containerization**
* **Goal:** Write a lightweight microservice and package it into a Docker image.
* **Tasks (2 Hours):**
  1. Create a simple Node.js or Python Flask REST API with a `/health` endpoint.
     - folder structure
       ```
        your-project-folder/
        ├── Dockerfile
        ├── package.json
        ├── package-lock.json   (optional, npm will generate or use package.json)
        └── server.js
       ```

     - `package.json`
       ```json
          {
            "name": "local-app",
            "version": "1.0.0",
            "description": "Local DevOps lab microservice",
            "main": "server.js",
            "scripts": {
              "start": "node server.js"
            },
            "dependencies": {
              "express": "^4.18.2"
            }
          }

       ```
       - `server.js`
         ```
          const express = require('express');
          const app = express();
          const PORT = process.env.PORT || 3000;
          
          app.get('/health', (req, res) => {
            res.status(200).json({ status: 'UP', timestamp: new Date() });
          });
          
          app.get('/', (req, res) => {
            res.send('Hello from Local DevOps Lab App!');
          });
          
          app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
         ```
         
  3. Write an optimized multi-stage `Dockerfile`:
     ```dockerfile
     # Build stage
     FROM node:18-alpine AS builder
     WORKDIR /app
     COPY package*.json ./
     #RUN npm ci --only=production
     RUN npm install --omit=dev

     # Runtime stage
     FROM node:18-alpine
     WORKDIR /app
     COPY --from=builder /app/node_modules ./node_modules
     COPY . .
     USER node
     EXPOSE 3000
     CMD ["node", "server.js"]
     ```
  4. Build and test locally: `docker build --no-cache -t local-app:v1.0.0 .`
  5. Load the image into Kind: `kind load docker-image local-app:v1.0.0 --name devops-lab`.
  6. This loads newly built image in kind container. To verify connect to container and run `crictl images` commands
     ```bash
      docker exec -it devops-lab-control-plane /bin/bash
      crictl images
     
     ```
     

---

### **Phase 2: Declarative Infrastructure & Secrets (Days 4–6)**

#### **Day 4: OpenTofu Infrastructure Provisioning**
* **Goal:** Declare local Kubernetes namespaces, ConfigMaps, and deployments using OpenTofu.
* **Tasks (2 Hours):**
  1. Create `providers.tf` pointing to the local Kubernetes cluster context:
     ```hcl
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
     * Namespace: `dev-environment`
     * ConfigMap: Application environment variables
       ```Terraform
        # Define the Kubernetes Namespace for your development environment
        resource "kubernetes_namespace" "dev" {
          metadata {
            name = "dev-environment"
          }
        }
        
        # Define a ConfigMap for application environment variables
        resource "kubernetes_config_map" "app_config" {
          metadata {
            name      = "app-config"
            namespace = kubernetes_namespace.dev.metadata[0].name
          }
        
          data = {
            ENVIRONMENT = "development"
            LOG_LEVEL   = "debug"
            PORT        = "3000"
          }
        }
       ```
  3. Install OpenTofu:
     ```bash
      sudo apt update && sudo apt install -y curl unzip
      curl -Lo opentofu.zip https://github.com/opentofu/opentofu/releases/download/v1.8.8/tofu_1.8.8_linux_amd64.zip
      unzip opentofu.zip
      chmod +x tofu
      sudo mv tofu /usr/local/bin/tofu
      tofu version
     ```
  4. Execute OpenTofu workflow:
     ```bash
     
     tofu init
     tofu plan
     tofu apply -auto-approve
     ```
  5. Verify:
     ```bash
     kubectl get namespaces
     kubectl get configmap -n dev-environment
     kubectl describe configmap app-config -n dev-environment

     ```
     

---

#### **Day 5: Secrets Management in GitOps**
* **Goal:** Implement encrypted secrets that can safely live in Git.
* **Tasks (2 Hours):**
  1. Install Bitnami **Sealed Secrets** controller on the Kind cluster:
     ```bash
     kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml
     ```
  2. Install `kubeseal` CLI on host machine.
     ```bash
      # Set your desired version (matching v0.24.0 controller)
      KUBESEAL_VERSION="0.24.0"    
      # download and extract directly if using the tarball format:
      wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v${KUBESEAL_VERSION}/kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz
      tar -xvzf kubeseal-${KUBESEAL_VERSION}-linux-amd64.tar.gz kubeseal
      # Move the binary into your system's global PATH so you can run it from anywhere
      chmod +x kubeseal
      sudo mv kubeseal /usr/local/bin/kubeseal
      # Verify the Installation
      kubeseal --version

     ```
  4. Convert a standard Kubernetes Secret into an encrypted `SealedSecret` custom resource:
     ```bash
     kubectl create secret generic app-db-secret --from-literal=password='SuperSecretPass' --dry-run=client -o yaml | kubeseal --format yaml > sealed-secret.yaml
     ```
  5. Confirm that `sealed-secret.yaml` can be committed safely to Git.

---

#### **Day 6: Manifest Packaging with Kustomize**
* **Goal:** Structure manifests across environments (Dev / Staging) without duplicating YAML code.
* **Tasks (2 Hours):**
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
     - command to create folder structure
       ```bash
       mkdir -p k8s-manifests/base k8s-manifests/overlays/dev k8s-manifests/overlays/prod && touch k8s-manifests/base/deployment.yaml k8s-manifests/base/service.yaml k8s-manifests/base/kustomization.yaml k8s-manifests/overlays/dev/kustomization.yaml k8s-manifests/overlays/prod/kustomization.yaml
       ```
  2. Configure image tagging and replicas in `overlays/dev/kustomization.yaml`.
     - vi k8s-manifests/overlays/dev/kustomization.yaml
       ```
        apiVersion: kustomize.config.k8s.io/v1beta1
        kind: Kustomization
        
        # Inherit resources and base configurations from the base folder
        resources:
          - ../../base
        
        # Override or set specific images for the dev environment
        images:
          - name: local-app
            newTag: v1.0.0
        
        # Scale the number of replicas for development
        replicas:
          - name: local-app-deployment  # Make sure this matches the name in your base deployment.yaml
            count: 1
            
       ```
       - vi k8s-manifests/base/kustomization.yaml
         ```
          apiVersion: kustomize.config.k8s.io/v1beta1
          kind: Kustomization
          
          resources:
            - deployment.yaml
            - service.yaml

         ```
      - vi k8s-manifests/base/deployment.yaml
        ```yaml
        apiVersion: apps/v1
        kind: Deployment
        metadata:
          name: local-app-deployment
        spec:
          replicas: 2
          selector:
            matchLabels:
              app: local-app
          template:
            metadata:
              labels:
                app: local-app
            spec:
              containers:
              - name: local-app
                image: local-app:latest
                ports:
                - containerPort: 3000
        ```
      - vi k8s-manifests/base/service.yaml
        ```yaml
        apiVersion: v1
        kind: Service
        metadata:
          name: local-app-service
        spec:
          selector:
            app: local-app
          ports:
          - protocol: TCP
            port: 80
            targetPort: 3000
        ```
  4. Test rendering: `kubectl kustomize k8s-manifests/overlays/dev`.
     > It will now successfully render and output your complete, scaled Kubernetes manifests for the development environment!
  5. To deploy your application manifests using your Kustomize overlay, run
     ```bash
     kubectl apply -k k8s-manifests/overlays/dev
     ```
  6. Port-Forwarding (Quickest Test)
     ```bash
      kubectl port-forward svc/local-app-service 8080:80
     ```
     > browse: <br>
     > http://localhost:8080 <br>
     > http://localhost:8080/health
     
     


     
   

   

---

### **Phase 3: Continuous Delivery Engine (Days 7–9)**

#### **Day 7: Argo CD Installation & Configuration**
* **Goal:** Deploy Argo CD engine inside the cluster.
* **Tasks (2 Hours):**
  1. Create `argocd` namespace and deploy manifests:
     ```bash
     kubectl create namespace argocd
     kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
     ```
  2. Expose the server interface:
     ```bash
     kubectl port-forward svc/argocd-server -n argocd 8080:443
     ```
  3. Retrieve initial admin password:
     ```bash
     kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
     ```
  4. Log into `https://localhost:8080`.

---

#### **Day 8: GitOps Application Lifecycle**
* **Goal:** Configure Argo CD to monitor your local manifest repository.
* **Tasks (2 Hours):**
  1. Define the Argo CD `Application` resource (`app-definition.yaml`):
     ```yaml
     apiVersion: argoproj.io/v1alpha1
     kind: Application
     metadata:
       name: my-local-app
       namespace: argocd
     spec:
       project: default
       source:
         repoURL: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
         targetRevision: HEAD
         path: k8s-manifests/overlays/dev
       destination:
         server: 'https://kubernetes.default.svc'
         namespace: dev-environment
       syncPolicy:
         automated:
           prune: true
           selfHeal: true
     ```
  2. Apply the application manifest: `kubectl apply -f app-definition.yaml`.
  3. Verify automated deployment via Argo CD dashboard.

---

#### **Day 9: Drift Detection & Automated Reconciliation**
* **Goal:** Test GitOps self-healing capabilities.
* **Tasks (2 Hours):**
  1. Manually tamper with the running cluster:
     ```bash
     kubectl scale deployment my-local-app --replicas=5 -n dev-environment
     ```
  2. Watch Argo CD mark the state as `OutOfSync`.
  3. Observe Argo CD automatically overriding manual changes to revert cluster replicas back to the state declared in Git.

---

### **Phase 4: Continuous Integration & Automation (Days 10–12)**

#### **Day 10: Local CI Pipeline Execution**
* **Goal:** Run CI pipeline steps locally using `act` (GitHub Actions runner) or a local GitLab Runner container.
* **Tasks (2 Hours):**
  1. Create a CI definition file (`.github/workflows/ci.yml`):
     ```yaml
     name: Local CI Pipeline
     on: [push]
     jobs:
       build-and-test:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v3
           - name: Set up Node.js
             uses: actions/setup-node@v3
             with:
               node-version: '18'
           - run: npm install
           - run: npm test
     ```
  2. Install `act` locally.
  3. Execute pipeline steps locally inside Docker: `act push`.

---

#### **Day 11: End-to-End Automated Pipeline Hand-off**
* **Goal:** Connect CI image tagging with CD manifest updates.
* **Tasks (2 Hours):**
  1. Write an automated update script in CI:
     * Builds new Docker image tagged with Git commit SHA (`my-app:${GITHUB_SHA}`).
     * Loads image into `kind` cluster.
     * Uses `kustomize edit set image` to update the image tag in `k8s-manifests/overlays/dev/kustomization.yaml`.
     * Commits the updated manifest back to the Git repository.
  2. Trigger execution and observe automated deployment by Argo CD.

---

#### **Day 12: Progressive Delivery with Canary Deployments**
* **Goal:** Configure controlled software rollouts using Argo Rollouts.
* **Tasks (2 Hours):**
  1. Install Argo Rollouts controller and CLI plugin:
     ```bash
     kubectl create namespace argo-rollouts
     kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
     ```
  2. Convert standard `Deployment` resource into a `Rollout` definition:
     ```yaml
     apiVersion: argoproj.io/v1alpha1
     kind: Rollout
     metadata:
       name: my-local-app
     spec:
       replicas: 5
       strategy:
         canary:
           steps:
           - setWeight: 20
           - pause: { duration: 30s }
           - setWeight: 50
           - pause: { duration: 30s }
     ```
  3. Execute canary deployment and monitor status via CLI: `kubectl argo rollouts get rollout my-local-app -w`.

---

### **Phase 5: Observability, Verification & Final Audit (Days 13–14)**

#### **Day 13: Local Monitoring & Metrics Engine**
* **Goal:** Deploy Prometheus and Grafana onto the Kind cluster.
* **Tasks (2 Hours):**
  1. Add Prometheus Helm repository:
     ```bash
     helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
     helm repo update
     ```
  2. Install kube-prometheus-stack:
     ```bash
     helm install kube-prometheus prometheus-community/kube-prometheus-stack --namespace monitoring --create-namespace
     ```
  3. Access Grafana dashboard:
     ```bash
     kubectl port-forward deployment/kube-prometheus-grafana -n monitoring 3000:3000
     ```
  4. Import standard Kubernetes cluster performance dashboards.

---

#### **Day 14: End-to-End Pipeline Audit & Validation**
* **Goal:** Run an end-to-end commit-to-deployment verification test.
* **Tasks (2 Hours):**
  1. Modify application code locally (e.g., update home endpoint response message).
  2. Push commit to Git repository.
  3. Verify local CI execution (Tests pass, image built).
  4. Verify GitOps reconciliation (Argo CD detects change, applies updated manifest).
  5. Verify deployment rollout via Argo Rollouts.
  6. Confirm application health via Prometheus metrics and Grafana dashboard.

---

## Operations & Maintenance Cheat Sheet

### Essential Local Control Commands

| Task | Command |
| :--- | :--- |
| **WSL Memory Shutdown** | `wsl --shutdown` |
| **Start Kind Cluster** | `kind create cluster --config kind-config.yaml --name devops-lab` |
| **Stop Kind Cluster** | `kind delete cluster --name devops-lab` |
| **Load Image to Cluster** | `kind load docker-image <image:tag> --name devops-lab` |
| **Argo CD Dashboard** | `kubectl port-forward svc/argocd-server -n argocd 8080:443` |
| **Grafana Dashboard** | `kubectl port-forward deployment/kube-prometheus-grafana -n monitoring 3000:3000` |
| **Run GitHub Actions Locally** | `act push` |
| **OpenTofu Execution** | `tofu init && tofu plan && tofu apply` |

---

## Resource Optimization Protocol

1. Keep system memory capped (e.g., 6 GB in `.wslconfig` if on Windows).
2. Do not run Docker GUI when unnecessary; run commands through the terminal interface.
3. Shut down the local `Kind` cluster at the end of every 2-hour session (`kind delete cluster --name devops-lab`) to reclaim system memory for daily tasks.

## Revert all changes
```
# Delete the Kind Cluster
kind delete cluster --name devops-lab

# Destroy OpenTofu Resources (Note: you already deleted the Kind cluster above, this will clear.terraform folders)
tofu destroy -auto-approve


# Clear Local Docker Cache/Containers
docker system prune -f
docker image prune -a -f
```
