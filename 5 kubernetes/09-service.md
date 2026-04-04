### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# services
  - ClusterIP
  - NodePort


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
vi service.yml
```
apiVersion: v1
kind: Service
metadata:
  name: myservice
spec:
  selector:
    name: deployment1
  ports:
    - port: 8080                # Service port (inside cluster / NodePort mapping base)
      targetPort: 80            # Pod container port
  type: ClusterIP
```

#### apply script
```
kubectl apply -f deploy.yml
kubectl apply -f service.yml
```
#### see the pods
```
kubectl get pods -o wide
```
#### access app using pod IP
later delete the pod and and try usign same IP, it will not work
```
curl  192.168.42.1:80
```
#### see the service
```
kubectl get service
#or
kubectl get svc
```
#### access app using service IP
```
curl curl 10.97.17.190:8080
```
#### delete all pods and retry accessing app using service IP, this time it will work
```
kubectl delete pods --all
```
#### create nodeport service file

vi service-nodeport.yml
```
apiVersion: v1
kind: Service
metadata:
  name: myservice
spec:
  selector:
    name: deployment1
  ports:
    - port: 8080
      targetPort: 80
  type: NodePort
```
#### apply nodeport service file
```
kubectl apply -f service-nodeport.yml
```
#### see all services
```
kubectl get svc
```
- This will create a random port number which can be used to access applicaiton via internet.
- example: http://44.202.24.232:30352/
  <img width="911" height="95" alt="image" src="https://github.com/user-attachments/assets/f3c75e70-0061-4905-9cdd-6e3479ed8385" />

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


