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
 
# Day 2: Local Kubernetes (`Kind`) Deployment
- Goal: Spin up a single-node local Kubernetes cluster.
- Tasks (2 Hours):
  1. Install kind CLI and kubectl.
  2. Create a cluster configuration file (kind-config.yaml):
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
