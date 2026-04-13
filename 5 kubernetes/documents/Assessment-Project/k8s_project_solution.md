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
**Terminal 1 (SSH Tunnel — on your laptop)**
```bash
ssh -i key.pem -L 8001:127.0.0.1:8001 ubuntu@50.17.51.12
```
> 👉 This creates the tunnel
> 👉 Keep this OPEN (don’t run anything else here)

**Terminal 2 (Run proxy — inside EC2)**
```bash
ssh -i key.pem ubuntu@50.17.51.12
```
then run
```
kubectl proxy
```
now browse this URL
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

# 5. create persistent volume
```
# create PersistentVolume for mysql
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: manual-pv-mysql
spec:
  capacity:
    storage: 30Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data/mysql
    type: DirectoryOrCreate
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual

---
# create PersistentVolume for wordpress
**01-pv.yml**
---
apiVersion: v1
kind: PersistentVolume
metadata:
  name: manual-pv-wordpress
spec:
  capacity:
    storage: 40Gi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /mnt/data/wordpress
    type: DirectoryOrCreate
  persistentVolumeReclaimPolicy: Retain
  storageClassName: manual

```
<img width="1677" height="197" alt="image" src="https://github.com/user-attachments/assets/de811516-d3da-442a-a1b6-6af1052d3dfe" />

# create secret for mysql
**02-mysql-secret.yml**
```---
# create secret for mysql. create secure script using command: echo -n 'mysecretpassword' | base64
# create secret option can be skipped if created manually: kubectl create secret generic mysql-pass --from-literal=password=mysecretpassword

---
kind: Secret
apiVersion: v1
metadata:
  name: mysql-pass
type: Opaque
data:
  password: bXlzZWNyZXRwYXNzd29yZA==

```
<img width="1067" height="153" alt="image" src="https://github.com/user-attachments/assets/6eb2716f-d23e-4d86-a859-c3ecd2f79225" />


# create persistent volume claim for mysql
**03-mysql-pvc.yml**
```
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: mysql-pv-claim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: manual
  volumeName: manual-pv-mysql
  resources:
    requests:
      storage: 20Gi
```
<img width="1370" height="142" alt="image" src="https://github.com/user-attachments/assets/5860da11-ab2f-44ca-897e-8b1d1fffac41" />

# deploy mysql
**04-deploy-mysql.yml**
```
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: mysql
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mysql     # this should match
  template:
    metadata:
      labels:
        app: mysql    # this should match
    spec:
      containers:
        - name: mysql
          image: mysql:5.7
          env:
            - name: MYSQL_USER
              value: wordpress
            - name: MYSQL_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-pass
                  key: password
            - name: MYSQL_DATABASE
              value: wordpress
          ports:
            - containerPort: 3306
          volumeMounts:
            - name: mysql-persistent-storage
              mountPath: /var/lib/mysql
      volumes:
        - name: mysql-persistent-storage
          persistentVolumeClaim:
            claimName: mysql-pv-claim

---
kind: Service
apiVersion: v1
metadata:
  name: mysql
spec:
  selector:
    app: mysql
  ports:
    - port: 3306
```
<img width="1107" height="336" alt="image" src="https://github.com/user-attachments/assets/10f3eb7c-895a-406d-bb56-0cd48b702cf8" />

# create configmap for wordpress
**05-configmap-wp.yml**
```
# deploy wordpress
---
# create a ConfigMap YAML file
kind: ConfigMap
apiVersion: v1
metadata:
  name: wordpress-config
data:
  WORDPRESS_CONFIG_EXTRA: |
    define('WP_DEBUG', true);
    define('WP_POST_REVISIONS', 5);
  WORDPRESS_SITE_TITLE: "My Demo Wordpress Site"
  WORDPRESS_ADMIN_EMAIL: "pradeep.viswa@gmail.com"
  WORDPRESS_DATABASE_HOST: "mysql"
  WORDPRESS_DATABASE_NAME: "wordpress"
  WORDPRESS_DATABASE_USER: "wordpress"
```
<img width="1078" height="167" alt="image" src="https://github.com/user-attachments/assets/ca78f224-b76d-401d-81b8-f08f5df7aaac" />

# create persistent volume claim for wordpress
**06-wp-pvc.yml**
```
---
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: wp-pv-claim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: manual
  volumeName: manual-pv-wordpress
  resources:
    requests:
      storage: 20Gi
```
<img width="1462" height="175" alt="image" src="https://github.com/user-attachments/assets/9df98b00-c825-46bd-b8bf-54710e05b187" />

# deploy wordpress
**07-deploy-wp.yml**
```
---
kind: Deployment
apiVersion: apps/v1
metadata:
  name: wordpress
spec:
  replicas: 1
  selector:
    matchLabels:
      app: wordpress
  template:
    metadata:
      labels:
        app: wordpress
    spec:
      containers:
        - name: wordpress
          image: bitnami/wordpress:latest     # wordpress:latest alsowe can use
          env:
            - name: WORDPRESS_CONFIG_EXTRA
              valueFrom:
                configMapKeyRef:
                  name: wordpress-config
                  key: WORDPRESS_CONFIG_EXTRA
            - name: WORDPRESS_SITE_TITLE
              valueFrom:
                configMapKeyRef:
                  name: wordpress-config
                  key: WORDPRESS_SITE_TITLE
            - name: WORDPRESS_ADMIN_EMAIL
              valueFrom:
                configMapKeyRef:
                  name: wordpress-config
                  key: WORDPRESS_ADMIN_EMAIL

            - name: WORDPRESS_DATABASE_HOST
              valueFrom:
                configMapKeyRef:
                  name: wordpress-config
                  key: WORDPRESS_DATABASE_HOST
            - name: WORDPRESS_DATABASE_NAME
              valueFrom:
                configMapKeyRef:
                  name: wordpress-config
                  key: WORDPRESS_DATABASE_NAME
            - name: WORDPRESS_DATABASE_USER
              valueFrom:
                configMapKeyRef:
                  name: wordpress-config
                  key: WORDPRESS_DATABASE_USER

            - name: WORDPRESS_DATABASE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-pass
                  key: password
          ports:
            - containerPort: 8080
          volumeMounts:
            - name: wp-persistent-storage
              mountPath: /var/www/html
      volumes:
        - name: wp-persistent-storage
          persistentVolumeClaim:
            claimName: wp-pv-claim

---
# Service to expose wordpress
kind: Service
apiVersion: v1
metadata:
  name: wordpress
spec:
  type: NodePort
  selector:
    app: wordpress
  ports:
    - port: 8080
      targetPort: 8080
      nodePort: 30007
```
<img width="1057" height="407" alt="image" src="https://github.com/user-attachments/assets/5369d763-c3e6-4e23-8d79-0e5e1a6c99b0" />


> success log of wordpress container
<img width="1906" height="961" alt="image" src="https://github.com/user-attachments/assets/631aeff6-5d8f-435c-9e6f-ffa704a472a6" />

> login to wordpress website
<img width="1893" height="970" alt="image" src="https://github.com/user-attachments/assets/b2506ba3-8a1c-4b40-bcf9-bac0938d3299" />


>posted some commemnt
<img width="1693" height="957" alt="image" src="https://github.com/user-attachments/assets/3d987a0c-46fa-4b3a-b4ee-9492d5304ee9" />


