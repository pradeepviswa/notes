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
1. Create kubernetes environment
2. Get started with pods, services, and deployments
3. Create and verify the service
4. Create a token and work on a dashboard
5. Configure the NFS-server for MySQL and WordPress deployment
6. Set up the NFS client side
7. Create and verify the PV
8. Create a secret for MySQL deployments secret data
9. Create a configmap for WordPress deployment to store non-sensitive information

---

# 1. Create kubernetes environment
  #### Create 3 ec2 instances in AWS
  <img width="556" height="127" alt="image" src="https://github.com/user-attachments/assets/2446015e-7253-4184-a00d-49300c6782e3" />
  
  #### install kubernetes on ec2 instances and create cluster
  - Install commands for master and node to configure k8s cluster: https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh
  - **run below cluster join command on node1 and node2.**
    > This unique command is generated as part of cluster installation commnd which was executed on master n ode
     ```bash
     sudo kubeadm join 172.31.32.15:6443 --token b7cz8o.3zodxe3yu6lmov0u  --discovery-token-ca-cert-hash sha256:53412b32bb5e817895da9b3d561772ad4a6518402aea8736450fa32a5f1b347a
     ```
     <img width="1342" height="368" alt="image" src="https://github.com/user-attachments/assets/245c1c40-6475-4af3-8503-62541486eeca" />

    #### check cluster status
     ```bash
     kubectl get nodes
     ```
     <img width="772" height="130" alt="image" src="https://github.com/user-attachments/assets/be0b5c4c-1431-496f-b8db-4dc3d94af69d" />

---

# 2. Get started with pods, services, and deployments
#### Deploy basic httpd service and access it 
```
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: mydep
spec:
  replicas: 5
  selector:
    matchLabels:
      app: httpd
  template:
    metadata:
      labels:
        app: httpd
    spec:
      containers:
        - name: c01
          image: httpd
          ports:
            - containerPort: 80
---
kind: Service
apiVersion: v1
metadata:
  name: myservice
spec:
  selector:
    app: httpd
  type: NodePort
  ports:
    - protocol: TCP
      port: 8080
      targetPort: 80
```
#### command line output
<img width="822" height="655" alt="image" src="https://github.com/user-attachments/assets/5d51a0e2-f76e-46b3-af54-5ae448a48057" />

#### test from browse
<img width="442" height="177" alt="image" src="https://github.com/user-attachments/assets/4e2d0f84-b8e1-4ce9-9cd2-f6f1633cff04" />


# 3. Create a token and work on a dashboard
#### 1: Deploy Kubernetes Dashboard
```
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```
<img width="1208" height="288" alt="image" src="https://github.com/user-attachments/assets/82c4f803-4990-4c23-984f-b737971d9036" />


#### 2: Create Service Account
**service-account.yaml**
```yaml

apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```
**apply**
```bash
kubectl apply -f service-account.yaml
```
<img width="593" height="83" alt="image" src="https://github.com/user-attachments/assets/d892c498-9076-4dfd-a4e0-df45e5de1774" />

---

#### 3: Create ClusterRoleBinding (Admin Access)
**cluster-role-binding.yaml**
```
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
```

---

**Apply**
```
kubectl apply -f cluster-role-binding.yaml
```
<img width="639" height="87" alt="image" src="https://github.com/user-attachments/assets/2b7fe5d2-2466-4e87-bf29-f4d94d4bba38" />

---

#### 4: Generate Token
```bash
kubectl -n kubernetes-dashboard create token admin-user
```
> This will give you a Bearer Token. Copy it.
<img width="777" height="120" alt="image" src="https://github.com/user-attachments/assets/2ae69e5f-c766-4e3f-b5ac-2411f2532d22" />

---

#### 5: Access Dashboard
**Start proxy:**
```bash
kubectl proxy --address='0.0.0.0' --accept-hosts='.*'
```
**Open in browser:**
```
# due to security reason this will not work. HTTPS will work this way.
# http://3.81.80.19:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

```
---
#### in laptop cun this command using ec2 master node public ip
```
 ssh -i .\Downloads\key.pem -L 8001:127.0.0.1:8001 ubuntu@3.81.80.19
```
#### then browse below URL
```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

---

#### 6: Login
```
Choose Token
Paste the token you generated
Click Sign In
```
<img width="1867" height="719" alt="image" src="https://github.com/user-attachments/assets/172d97da-b620-4b61-bcd4-d39e0b38b59c" />

---

#### view dashboard
<img width="1908" height="946" alt="image" src="https://github.com/user-attachments/assets/075f1408-8189-4b4f-9c19-fd28a98bf788" />

---

# 5. Configure the NFS-server for MySQL and WordPress deployment
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
#### dasbboard summary
<img width="1908" height="946" alt="image" src="https://github.com/user-attachments/assets/bddc23c5-a636-45bf-b1f5-61411e80f79f" />

***

# 6. Set up the NFS client side
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
# 7. Create and verify the PV
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
# 8. Create a secret for MySQL deployments secret data
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
# 9. Create a configmap for WordPress deployment to store non-sensitive
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



