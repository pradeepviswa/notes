# real world scenario

## 🎯 Your Goal
```
http://mycompany.com
```

## 🏢 Final Architecture (Real World)
```
User → Route53 (mycompany.com)
     ↓
AWS Load Balancer (ALB / NLB)
     ↓
Ingress Controller (Nginx)
     ↓
Service (ClusterIP)
     ↓
Pods (httpd)
```

# ✅ Step-by-Step Implementation

## 🔹 Step 1: Create Deployment
```yaml
kind: Deployment
apiVersion: apps/v1
metadata:
  name: mydeployment
spec:
  replicas: 2
  selector:
    matchLabels:
      name: deployment1
  template:
    metadata:
      labels:
        name: deployment1
    spec:
      containers:
        - name: c00
          image: httpd
          ports:
            - containerPort: 80
```
## 🔹 Step 2: Fix Service (IMPORTANT ⚠️)
👉 In real-world, Service should be ClusterIP on port 80
```yaml
apiVersion: v1
kind: Service
metadata:
  name: myservice
spec:
  selector:
    name: deployment1
  ports:
    - port: 80
      targetPort: 80
  type: ClusterIP
```

## 🔹 Step 3: Install Nginx Ingress Controller
Run:
```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```
## 🔹 Step 4: Check External IP
```bash
kubectl get svc -n ingress-nginx
```
> ⚠️ Note: It may take 2–5 minutes for the LoadBalancer external IP/DNS to be assigned.

You’ll see:
```
ingress-nginx-controller   LoadBalancer   <EXTERNAL-IP>
```
👉 Example:
```
a1b2c3d4.elb.amazonaws.com
```

## 🔹 Step 5: Create Ingress YAML
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress
spec:
  ingressClassName: nginx
  rules:
    - host: mycompany.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myservice
                port:
                  number: 80
```
## 🔹 Step 6: Configure Route 53 (VERY IMPORTANT)

In AWS Route 53:

- Go to **Hosted Zone → mycompany.com**
- Click **Create record**

### Record Details

| Field | Value                 |
|-------|-----------------------|
| Type  | A                     |
| Name  | mycompany.com         |
| Value | ALB DNS (from Step 4) |

> 💡 Tip: If available, enable **Alias = Yes** and select the Load Balancer directly.

## 7. Optional (Nice improvement)
```bash
kubectl get ingress
```

## 🔥 FINAL RESULT
After DNS propagation:
```
http://mycompany.com
```

- ✅ No port
- ✅ Clean URL
- ✅ Production ready

## 🔐 (Optional but Real World MUST) Add HTTPS
Install cert-manager and use Let's Encrypt:
```yaml
tls:
  - hosts:
      - mycompany.com
    secretName: my-tls
```
👉 Then access:
```
https://mycompany.com
```

# 💡 Key Learnings
| Component           | Role            |
| ------------------- | --------------- |
| Deployment          | Runs app        |
| Service (ClusterIP) | Internal access |
| Ingress             | Routing         |
| LoadBalancer        | Public entry    |
| Route53             | DNS             |



- 👉 You should use:
  - Domain (mycompany.com) ✅
  - Ingress ✅
  - LoadBalancer ✅