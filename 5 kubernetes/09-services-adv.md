# real world scenario

## Your goal:
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

## ✅ Step-by-Step Implementation
```
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
```
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
kubectl get svc -n ingress-nginx
```
kubectl get svc -n ingress-nginx
```

You’ll see:
```
ingress-nginx-controller   LoadBalancer   <EXTERNAL-IP>
```
👉 Example:
```
a1b2c3d4.elb.amazonaws.com
```

## 🔹 Step 5: Create Ingress YAML
```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress
spec:
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
- Go to Hosted Zone → mycompany.com
- Create record:
| Field | Value                 |
| ----- | --------------------- |
| Type  | A                     |
| Name  | mycompany.com         |
| Value | ALB DNS (from step 4) |

👉 Use Alias = YES if available

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
```YAML
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