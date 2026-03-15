
### replicaSet
- it maintains the number of pods.
- if due to any reason if a pod is deleted, the replicase will create a new pod immediately.

= new imsges created from template.
= I will create a template, this will be stored in etcd.
= template is a readonly blueprint of pod from which replica pods are created.

#### how it works
- we will label the template
  ex. env=prod
- create a pod from the template
  with label env=prod

#### how to write a script
vi rs.yml
```
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: myreplica               # name of replica set
spec:
  replicas: 5                   # we want 5 replica pods
  selector:
    matchLabels:
      company: test             # replica pods will be created from the template with label company:test
  template:                     # here onwards is the template
    metadata:
      labels:
        company: test          # pick template with label company: test 
    spec:
      containers:
        - name: c0q
          image: httpd
          ports:
            - containerPort: 80
```
#### apply
```
kubectl apply -f rs.yml
```
#### see pods
```
kubectl get pods
```
#### delete all pods
```
kubectl delete pods --all
```

#### new pods will automatically be created. see pods gain
```
kubectl get pods
```

#### see replicaset. rs or replicaset, both works
```
kubectl get rs 
```

#### scale repliset
```
kubectl scale --replicas=10 -f rs.yml
```
