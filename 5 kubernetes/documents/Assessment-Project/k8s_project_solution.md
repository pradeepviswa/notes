# Deploy an Application Using the Kubernetes Dashboard

# Problem Statement 
```
Karen is a DevOps engineer at a tech startup. Her team has developed a new
application using MySQL. Now, it is her task to deploy that application.
The company plans to utilize Kubernetes for its robust container
orchestration capabilities.
Karen must create a Kubernetes dashboard with specific configurations, user
roles, storage, service verification, and data management.
```

# Steps
1. Get started with pods, services, and deployments
2. Create and verify the service
3. Create a token and work on a dashboard
4. Configure the NFS-server for MySQL and WordPress deployment
5. Set up the NFS client side
6. Create and verify the PV
7. Create a secret for MySQL deployments secret data
8. Create a configmap for WordPress deployment to store non-sensitive information


# 1. Get started with pods, services, and deployments
```
What is expected:

Understand the basic building blocks of Kubernetes
You should be able to:
Create a Pod (single container)
Create a Deployment (manages replicas, updates)
Understand why Deployment is preferred over Pod
Expose your app using a Service

👉 Outcome:

You can run an application inside Kubernetes
You understand scaling and self-healing
```
#### Create 3 ec2 instances in AWS
<img width="556" height="127" alt="image" src="https://github.com/user-attachments/assets/2446015e-7253-4184-a00d-49300c6782e3" />
#### install kubernetes on ec2 instances and create cluster
- Install commands for master and node to configure k8s cluster: https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh
- **run below cluster join command on node1 and node2.**
  > This unique command is generated as part of cluster installation commnd which was executed on master n ode
   ```
   sudo kubeadm join 172.31.32.15:6443 --token b7cz8o.3zodxe3yu6lmov0u         --discovery-token-ca-cert-hash sha256:53412b32bb5e817895da9b3d561772ad4a6518402aea8736450fa32a5f1b347a
   ```
 <img width="1342" height="368" alt="image" src="https://github.com/user-attachments/assets/245c1c40-6475-4af3-8503-62541486eeca" />
#### **run below command on master node to check cluster status**
   kubectl get nodes
   <img width="772" height="130" alt="image" src="https://github.com/user-attachments/assets/be0b5c4c-1431-496f-b8db-4dc3d94af69d" />


-----
# 2. Create and verify the service
```
👉 What is expected:

Expose your application using a Service
Understand types:
ClusterIP (internal)
NodePort (external access)
LoadBalancer (cloud)
Verify:
Service is reachable
Traffic is routed to Pods

👉 Outcome:

You can access your app (internally or externally)
```

# 3. Create a token and work on a dashboard
```
👉 What is expected:

Enable Kubernetes Dashboard
Create:
ServiceAccount
Role / ClusterRole
Token
Use token to log into dashboard UI

👉 Outcome:

You can visually monitor:
Pods
Deployments
Services
```

# 4. Configure the NFS-server for MySQL and WordPress deployment
```
What is expected:

Set up shared storage using:
Traditional NFS OR
Cloud NFS like Amazon EFS
Understand:
Why MySQL needs persistent storage
Why WordPress needs shared storage

👉 Outcome:

A central storage system accessible from multiple pods
```
**create PersistentVolume** 
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: efs-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteMany
  nfs:
    path: /
    server: fs-xxxxxx.efs.ap-south-1.amazonaws.com
```
<img width="1147" height="782" alt="image" src="https://github.com/user-attachments/assets/9e3afe6c-ff07-4695-aa3e-f9325416a75b" />

# 5. Set up the NFS client side
```
What is expected:

Configure Kubernetes nodes (or pods) to:
Connect to NFS server
Mount the shared storage
Understand:
Mounting concept
Network connectivity (port 2049)

👉 Outcome:

Your pods can read/write to shared storage
```
# 6. Create and verify the PV
```
👉 What is expected:

Create a PersistentVolume (PV) that:
Points to your NFS storage
Create a PersistentVolumeClaim (PVC) that:
Requests storage
Bind PV ↔ PVC

👉 Outcome:

Kubernetes can manage storage independently of pods
```
# 7. Create a secret for MySQL deployments secret data
```
👉 What is expected:

Store sensitive info like:
MySQL root password
Database credentials
Use Secret object
Understand:
Base64 encoding
How pods consume secrets (env or volume)

👉 Outcome:

Secure handling of credentials (not hardcoded)
```
# 8. Create a configmap for WordPress deployment to store non-sensitive
```
👉 What is expected:

Store configuration like:
DB host
DB name
App settings
Use ConfigMap
Inject into pods:
Environment variables OR files

👉 Outcome:

Decoupled configuration from application
```



