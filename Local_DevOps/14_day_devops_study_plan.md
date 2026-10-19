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
  2. Restart WSL: `wsl --shutdown` in PowerShell (if using Windows).
  3. Install Docker Engine / Docker Desktop.
  4. Verify resource allocation: run `docker info` and check memory thresholds.

---

#### **Day 2: Local Kubernetes (`Kind`) Deployment**
* **Goal:** Spin up a local Kubernetes cluster.
* **Tasks (2 Hours):**
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
  3. Create cluster: `kind create cluster --config kind-config.yaml --name devops-lab`.
  4. Test connectivity: `kubectl cluster-info` and `kubectl get nodes`.

---

#### **Day 3: Application Development & Containerization**
* **Goal:** Write a lightweight microservice and package it into a Docker image.
* **Tasks (2 Hours):**
  1. Create a simple Node.js or Python Flask REST API with a `/health` endpoint.
  2. Write an optimized multi-stage `Dockerfile`:
     ```dockerfile
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
  3. Build and test locally: `docker build -t local-app:v1.0.0 .`
  4. Load the image into Kind: `kind load docker-image local-app:v1.0.0 --name devops-lab`.

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
  3. Execute OpenTofu workflow:
     ```bash
     tofu init
     tofu plan
     tofu apply -auto-approve
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
  3. Convert a standard Kubernetes Secret into an encrypted `SealedSecret` custom resource:
     ```bash
     kubectl create secret generic app-db-secret --from-literal=password='SuperSecretPass' --dry-run=client -o yaml | kubeseal --format yaml > sealed-secret.yaml
     ```
  4. Confirm that `sealed-secret.yaml` can be committed safely to Git.

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
  2. Configure image tagging and replicas in `overlays/dev/kustomization.yaml`.
  3. Test rendering: `kubectl kustomize k8s-manifests/overlays/dev`.

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