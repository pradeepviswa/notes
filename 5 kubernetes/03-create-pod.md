### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# create a pod and use apache to host a website
#### myfirstpod.yml
```
apiVersion: v1
kind: Pod
metadata:
   name: myfirstpod
spec:
   containers:
     - name: apachecontainer
       image: httpd
       ports:
         - containerPort: 80
```

## description
- apiVersion depend on the kind
kind: wjat are we creating
medatada: details about the pod like name
spec: 
  - what is the specification of the pod.
  - we will have containers in the pod
  - name of container is apachepod
  - image is httpd (httpd:latest)


# run command
```

#create pod
kubectl apply -f myfirstpod.yml

#show pods
kubectl get pods

#show ip address of pod and on which node it is crated
kubectl get pods -o wide

```
