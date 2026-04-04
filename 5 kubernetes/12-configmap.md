### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# config maps and secrets

#config maps and secrets
- these are not volumes
- they are used to store the data outside the container
- rather than hardcoding values in code, we fetch it from outside resource
- it is key value mapping in k8s which is used to keep the configuration data separate from our application code.
- example we have 3 envs
  - prod: app is same but DB url is different
  - testing - my DB URL is different
  - development - DB url is different
- store the config outside
- 

## Problem statement:
- crate Dockerfile and build an image
- db = testdb
- we will have to create 3 images for 3 different envs
- this is not easy

## solution:
- create custom image
= database connection value let it come from config map
- write k8s script, use config map
- define:
  - db_prod = prod-db-path
  - db_test = test-db-path
- now app will auto connect to respective DB

#### vi configmap.yml
```
apiVersion: v1
kind: ConfigMap
metadata:
  name: dev-html
data:
  index.html: |
    <H1> Hello kubernetes </H1>
```
#### run below commands
```
kubectl apply -f configmap.yml

kubectl get configmap

kubectl describe configmap dev-html
```

#### vi cpod.yml
```
kind: Pod
apiVersion: v1
metadata:
  name: cm-pod
spec:
  containers:
    - name: con1
      image: nginx
      ports:
        - containerPort: 80
      volumeMounts:
        - name: html-from-cm
          mountPath: /usr/share/nginx/html/
          readOnly: true
  volumes:
      - name: html-from-cm
        configMap:
          name: dev-html
```
#### check the data
```
kubectl apply -f cpod.yml

kubectl get pods

kubectl get pods -o wide

curl <ip address of pod>

kubectl exec -it cm-pod -- /bin/bash

   ls

   cd /usr/share/nginx/html/
   cat index.html 

```

