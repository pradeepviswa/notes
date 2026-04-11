### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# secret

vi secret.yml
```
apiVersion: v1
kind: Secret
metadata:
  name: dev-secret
stringData:
  index.html: |
    <H1> Hello secret </H1>
```
urn below commands
```
kubectl apply -f secret.yml

kubectl get secret

kubectl describe secret dev-secret
```

vi cpod.yml
```
apiVersion: v1
kind: Pod
metadata:
  name: cm-pod
spec:
  containers:
    - name: con1
      image: nginx
      ports:
        - containerPort: 80
      volumeMounts:
        - name: html-from-secret
          mountPath: /usr/share/nginx/html/
          readOnly: true

  volumes:
    - name: html-from-secret
      secret:
        secretName: dev-secret
```
check the data
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


## other example of secret
**secret** accepts **base64** secure-string only. This is how we can encode and decode a plain-text.
```bash
echo example-user | base64
echo ZXhhbXBsZS11c2Vy | base64 --decode

```

```
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque
data:
  username: ZXhhbXBsZS11c2Vy
  password: ZXhhbXBsZS1wYXNzd29yZA==

---

apiVersion: v1
kind: Pod
metadata:
  name: secret-ex1-pod
spec:
  containers:
  - name: mycontainer
    image: redis
    volumeMounts:             #We mount our volume
    - name: myvol
      mountPath: "/apps/secrets"
      readOnly: true
  volumes:                    #We use the volume and defined our secret
  - name: myvol
    secret:
      secretName: mysecret

```
