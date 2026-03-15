# deployment controllers
- it is elder brother of replicaset
- ensures that minimum number of pods are always running
- comes with additional features
  - rolling update
  - rollback

## rolling update
easily manage newer version of application

## rollback
if we realise there is issue with newer version, we can easily rollback


## explanation of deployment
- when we create deployment, the replicaset will be created automatically.
- when new release is created, new version of same deployment is used
- older pods will be removed. means old replicaset will be deleted.
- users will be redirected to newer version of application.
- at the time of rollback, new replicaset with older config willbe creted, traffic will be lmvoed to nthis verison. 

### example: copy code from rs.yml and modify as below
#### version1-app.yml
```
apiVersion: apps/v1             # api version depend on kind
kind: Deployment
metadata:
  name: mydep                   # name of deployment
spec:
  replicas: 2                   # we want 2 replica pods
  selector:
    matchLabels:
      name: deployment          # replica pods will be created from the template with label 'deployment'
  template:                     # here onwards is the template
    name: testpod               # optional. creating a template with name testpod 
    metadata:
      labels:                   # with label name as deployment
        name: deployment        # pick template with label company: test 
    spec:
      containers:
        - name: c01
          image: ubuntu
          command: ["/bin/bash", "-c", "while true; do echo hello world; sleep 5; done"]   # creating an infinite loop till the time container is running. this is because ubuntu image doesn't have anything to run by default.

```

kubectl apply -f version1-app.yml
kubectl get deploy
kubectl delete pods --all
#### see deployment
kubectl get deploy

#### see replicaset
kubectl get rs

#### note down pod IDs, this is v1
kubectl get pods 

#### see the logs
kubectl logs <podid>
#### launch new version of application, version2-app.yml, only echo command updated, rest all same

```
apiVersion: apps/v1             # api version depend on kind
kind: Deployment
metadata:
  name: mydep                   # name of deployment
spec:
  replicas: 2                   # we want 2 replica pods
  selector:
    matchLabels:
      name: deployment          # replica pods will be created from the template with label 'deployment'
  template:                     # here onwards is the template
    name: testpod               # optional. creating a template with name testpod 
    metadata:
      labels:                   # with label name as deployment
        name: deployment        # pick template with label company: test 
    spec:
      containers:
        - name: c01
          image: ubuntu
          command: ["/bin/bash", "-c", "while true; do echo I am learning deployment; sleep 5; done"]   # creating an infinite loop till the time container is running. this is because ubuntu image doesn't have anything to run by default.

```
#### apply second version of deployment
```
kubectl apply -f version2-app.yml
```

#### see deployment name again, it will remain same
```
kubectl get deploy
```

#### check rs. old rs as desired as 0, new rs desired as 2
```
kubectl get rs
```

#### see pods again and check the logs
```
kubectl get pods
kubectl logs -f <podid>
```

#### rollback to previous version
```
kubectl rollout undo deploy/mydep 
```

#### newer rs will have desired state 0, older version desired state 2
```
kubectl get rs
```

#### check the logs again
```
kubectl get pods
kubectl logs -f <podid>
```
