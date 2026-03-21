### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# agenda
- services
- Taints and tolerations
- Volumes

# service
- pod is accessed via ip address
- if pod is deleted and recreted, new ip is assigned
- we cannot keep changing endpoint ip
- we need a system which takes care of this new pod
- for this we have 'service' component
- service provides a fixed ip address to my pods
- kubeproxy provides fixed ip to service instance
- <img width="1137" height="675" alt="image" src="https://github.com/user-attachments/assets/810a6bb1-6a7f-484f-ba10-3348a3730461" />

vi deploy.yml
```
apiVersion: apps/v1
kind: Deployment
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
vi service.yml
```
apiVersion: v1
kind: Service
metadata:
  name: demoservices
spec:
  selector:
    name: deployment1
  ports:
    - port: 8080
      targetPort: 80
  type: ClusterIP
```

## service types
#### cluster IP (Default service)
- cluster IP provide fixed IP address which is accessible inside cluster. 
- it will not be accessible from internet
- it is used for internal communication only.
#### Node Port
- it will expose application on a port of each node
- you can access application from internet
#### Load balancer
- it will crate a cloud a load balancer
- like in aks
- we can access the application running inside the pod via load balancer
#### External name
- it will map a service to an external domain
- example 
  - Pradeep.com
  - map with Pradeep.com/products
