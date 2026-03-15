# DaemonSet
- in deployment we created 2 pos. it is not necessary that they will always be created in separate node.
- they can be created in one node also.
- here in daemonset, no need to specify replicaset, one pod will be created in each node

#### requirement is
always pod should be created in both nodes.

#### number of pods vs number of nodes
deamon set ensures that one pod should always be running in every node automatically.

#### how it works

vi ds.yml
```
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: nginx-daemonset
spec:
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx
       
```
