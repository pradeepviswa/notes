#### create lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# 📦 Persistent Volume (PV) and Persistent Volume Claim (PVC)

## 🧠 Concept (Easy Analogy)
- **PV (Persistent Volume)** → Room in a hostel  
- **PVC (Persistent Volume Claim)** → Student requesting a room  
- **Kubernetes (k8s)** → Warden assigning the room  

---

## 📌 Key Points
- **PV** = Actual storage in the cluster  
  (e.g., Elastic Block Storage, NFS, hostPath, etc.)

- **PVC** = Request for storage by a user or pod  

### Example
- Admin creates **5Gi storage (PV)**
- User requests:
  - 500Mi → small app  
  - 2Gi → production app  

---

## 🔄 How PV and PVC Work Together
1. Admin creates a **PV (5Gi)**
2. User/DevOps creates a **PVC (2Gi)**
3. Kubernetes **binds PVC → PV**
4. Pod uses the **PVC**

---

# 📁 Persistent Volume (pv.yml)

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-pv
spec:
  storageClassName: standard                # it tell k8s what type is storage you want. standard, premium, fast ssd.  no cost associated, use any. Different classes = different speed, cost, backend
  persistentVolumeReclaimPolicy: Recycle
  capacity:
    storage: 1000Mi                        # Mebibype = 1024 KB, Gi = Gibibyte = 1024 Mi
  accessModes:
    - ReadWriteOnce
  hostPath:
    path: /tmp/pvdata                     # data will be visible in this location in container.
```
## storageClassName

### ✅ storageClassName: standard

Defines the **type of storage** to be used.

> 👉 This **DOES matter** in real world  
> 👉 Different classes = different **speed, cost, and backend**

### 📌 Examples

- **standard** → normal disk  
- **gp2 / gp3** → AWS EBS  
- **premium** → SSD

✅ capacity
```yaml
storage: 1000Mi
```
- Total size of this volume = **1 GB**

## ♻️ Reclaim Policy

Defines what happens when PVC is deleted:

- **Retain**
  - Data remains intact
  - Manual cleanup required

- **Delete**
  - PV and data are deleted automatically

- **Recycle** *(deprecated in newer Kubernetes versions)*
  - Data is cleaned
  - PV reused

---

## 🔐 Access Modes

Defines how a volume can be used by nodes/pods

### Modes:

- **ReadWriteOnce (RWO)**
  - Only one node can read/write
  - Multiple pods on the same node allowed

- **ReadOnlyMany (ROX)**
  - Multiple nodes can read
  - No writing allowed

- **ReadWriteMany (RWX)**
  - Multiple nodes can read/write

---

## ▶️ Apply PV

```bash
kubectl apply -f pv.yml
```

## 🔍 Check PV

```bash
kubectl get pv
```

---

# 📁 Persistent Volume Claim (pvc.yml)

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-pvc
spec:
  storageClassName: standard
  accessModes:                   # below is the find conditions. we are saying search pv PV which is of type standard, access mode is ReadWriteOnce and size is more than 500 Mi
    - ReadWriteOnce             # that means if we have more than one PV with same size, any one will be picked by PVC.
  resources:  
    requests:
      storage: 500Mi
```

---

## ▶️ Apply PVC

```bash
kubectl apply -f pvc.yml
```

## 🔍 Check PVC

```bash
kubectl get pvc
```

---

# 🔗 Use PVC in a Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pvc-pod
spec:
  containers:
    - name: myvolume-container
      image: tomcat:8.5
      volumeMounts:
        - name: pv-storage
          mountPath: /usr/local/tomcat/logs
  volumes:
    - name: pv-storage
      persistentVolumeClaim:
        claimName: my-pvc
```

---

## ▶️ Apply Pod

```bash
kubectl apply -f pod1.yml
kubectl get pods
```

---

## 🔧 Test Data Persistence

```bash
kubectl exec -it pvc-pod -c myvolume-container -- /bin/bash
cd /usr/local/tomcat/logs
touch file1 file2
exit
```

---

## 🗑️ Delete Pod

```bash
kubectl delete pod pvc-pod
```

---

## 🔍 Verify Data Persistence on Node

```bash
cd /tmp/pvdata
ls
```
