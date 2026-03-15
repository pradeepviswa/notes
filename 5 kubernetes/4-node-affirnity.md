# 
- scheduler decides whether nodes1 or node2 to be used.
- Now I want to create the pod in production node only. Here the concept of node affinity comes up.
- node affinity is a kubernetes scheduling feature that tells the scheduler which node a pod should run based on node label.
- we will have to label the node.
  - node1: label is --> env: prod
  - node2: label is --> env: test
  - master: node affinity: create the node in the node with env: prod

### example
#### create a pod to be created in specific node
```
root@ip-172-31-1-248:/home/ubuntu# kubectl get nodes
NAME              STATUS   ROLES           AGE    VERSION
ip-172-31-1-248   Ready    control-plane   104s   v1.29.15
ip-172-31-5-213   Ready    <none>          12s    v1.29.15
ip-172-31-6-244   Ready    <none>          27s    v1.29.15

```
#### label the node
```
kubectl label node ip-172-31-1-248 env=prod
```
#### show the label 
```
kubectl get nodes --show-labels
```
#### output
```
root@ip-172-31-1-248:/home/ubuntu# kubectl get nodes --show-labels
NAME              STATUS   ROLES           AGE   VERSION    LABELS
ip-172-31-1-248   Ready    control-plane   38m   v1.29.15   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=ip-172-31-1-248,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node.kubernetes.io/exclude-from-external-load-balancers=
ip-172-31-5-213   Ready    <none>          36m   v1.29.15   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,env=prod,kubernetes.io/arch=amd64,kubernetes.io/hostname=ip-172-31-5-213,kubernetes.io/os=linux
ip-172-31-6-244   Ready    <none>          37m   v1.29.15   beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=ip-172-31-6-244,kubernetes.io/os=linux

```

#### now write a script in the node with label 'env=prod'

vi node-affinity.yml

```
apiVersion: v1
kind: Pod
metadata:
  # creating a pod with name nginx-affinity
  name: nginx-affinity
spec:
  # we are using pod scheudling rule in node-affinity. 
  # we are preparing a scheduling. 
  # we are saying we are in node affinity group. 
  # we want to create in a specific node
  affinity:
    nodeAffinity:
     # we are creating a  pod scheduling rule. when creating pod, that time check the label of node. later if node label is changed, it doesn't matter.
      requiredDuringSchedulingIngoreDuringExecution:
       # if node label matches 'env=prod'.
        nodeSelectorTerms:
          - matchExpressions:
            - key: env
              operator: In
              value:
              - prod
  # just under affinity
  containers:
     - name: nginx
       image: nginx

```

#### cleaner version
```
apiVersion: v1
kind: Pod
metadata:
  name: nginx-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: env
            operator: In
            values:
            - prod
  containers:
    - name: nginx
      image: nginx

```

#### apply
```
kubectl apply -f node-affinity.yml
```




