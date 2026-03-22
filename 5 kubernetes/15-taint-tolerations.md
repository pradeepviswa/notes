# Taint and Tolerataion

#### TAINT meaning
- taint means not talt to a node
- if i want to create a PROD pod, it should be created in PROD node only. Not in TEST node. 
- this means TEST nodes are tainted here

#### Toleration meaning
- talk to tainted node, means tolerate it
- it means create pods in tainted nodes only.

#### see all nodes
```
kubectl get nodes
```

#### you will get the list of the node. copy the node which you want to taint

#### run below command to taint a node. this is manual process. you can provide FQDN of server as well
```
kubectl taint node ip-172-31-82-97  env=prod:NoSchedule
```
vi pod1.yml
```
kind: Pod                              
apiVersion: v1                     
metadata:                           
  name: testpod2
  annotations:
   description: Our first testing pod                  
spec: 
  containers:                      
    - name: c00                     
      image: ubuntu              
      command: ["/bin/bash", "-c", "while true; do echo Test Message; sleep 5 ; done"]
```
#### run script
```
kubectl apply -f pod1.yml
```
#### you will see this pod is created in non tainted pod
```
kubectl get pods -o wide   
```

## tolerations
#### create a pod in tainted node
vi taintex.yml
```
kind: Pod                              
apiVersion: v1                     
metadata:                           
  name: testpod3
  annotations:
   description: Our first testing pod                  
spec:
  tolerations:
    - key: env
      operator: "Equal"
      value: "prod"
      effect: "NoSchedule"
  
  containers:                      
    - name: c00                     
      image: ubuntu              
      command: ["/bin/bash", "-c", "while true; do echo Test Message; sleep 5 ; done"]
```
#### run the script
```
kubectl apply -f taintex.yml
```

#### this time since we have use toleration in the manifest thats the reason why you will see the pod is created in the tained node
```
kubectl get pods -o wide
```
