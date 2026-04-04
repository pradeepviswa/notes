### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# Namespace

its a logical partition in a cluster.

#### see all namespaces
```
kubectl get ns
```
vi namespace.yml
```
kind: Namespace
apiVersion: v1
metadata:
  name: production
```
#### check detail
```
kubectl get pods -n kube-system
kubectl apply -f namespace.yml
kubectl get ns
```

#### create pod in this namespace
vi pod.yml
```
apiVersion: v1
kind: Pod
metadata:
   name: myfirstpod
   namespace: production
spec:
   containers:
     - name: apachecontainer
       image: httpd
       ports:
         - containerPort: 80

```
#### run the script
```bash
#if namespace NOT metnioned in metadata
kubectl apply -f pod.yml -n production

#if namespace mentioned in metadata
kubectl apply -f pod.yml

# see all pods in namespace
kubectl get pods -n produciton

# pods in default namespace
kubectl get pods 

# get deployments in namespace
kubectl get deploy -n production

# kubectl see contexts
kubectl config get-contexts

# kubectl set context
kubectl config set-context --current --namespace=production

# kubectl set context again
kubectl config get-contexts

# see pods of all namespaces
kubectl get pods --all-namespaces

#now the default command will change for namespace production
kubectl get pods   

##creating namespace by cli

# create namespace via cli
kubectl create namespace development 

# see new namesapce
kubectl get ns

```




