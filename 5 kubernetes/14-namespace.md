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
spec:
   containers:
     - name: apachecontainer
       image: httpd
       ports:
         - containerPort: 80

```
#### run the script
```bash
kubectl apply -f pod.yml -n production
kubectl get pods -n produciton
kubectl get pods 

kubectl get pods -n production

kubectl get deploy -n production

kubectl config get-contexts

kubectl config set-context --current --namespace=production


kubectl config get-contexts

kubectl get pods --all-namespaces

kubectl get pods   #now the default command will change for namespace production

##creating namespace by cli

kubectl create namespace development 

kubectl get ns

```




