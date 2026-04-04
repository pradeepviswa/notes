### create lab first - follow stesp here and create the  lab
https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh

# Volume
- EmptryDir
- Persistent volume and Persistent volume claim

  
## why do we need volume
- containers are temporary
- if a container restarts, data is deleted
- example:
  -  install MySQL iha pod
  -  store data in it
  - when pod restarts or recreated, data is gone
- solution is use volume
- data stays event if the container restarts or recreated


## different types of kubernetes volume
- Empty Dir
- Persistent Volume and Persistent Volume Claim

### Empty Dir
- Volume is created inside the pod, not inside node
- it will be deleted when pod is removed
- but if container is restarted, data is not lost, it is safe
- temporary drive which is mapped with our container
- <img width="313" height="245" alt="image" src="https://github.com/user-attachments/assets/d900d906-4399-4f81-907c-1d0fba799c4c" />
#### emptydir.yml
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: emptydir-demo
spec:
  containers:
    - name: c01
      image: busybox
      command: ["/bin/sh","-c","while true; do echo 'Hello from c01' >> /data/file1.txt; sleep 5; done"]
      volumeMounts:
        - name: shared-volume
          mountPath: /data

    - name: c02
      image: busybox
      command: ["/bin/sh","-c","while true; do cat /data/file1.txt; sleep 5; done"]
      volumeMounts:
        - name: shared-volume
          mountPath: /data

  volumes:
    - name: shared-volume
      emptyDir: {}     
```
#### see all pods
kubectl get pods


#### enter the container and check the logs
```bash
kubectl exec -it empty-dir -c c01 -- sh
cat /data/file1.txt
```
#### now since we have mapped data with shared-volume then, from c02 also we should be able to see /data/file1.txt
```bash
kubectl exec -it empty-dir -c c01 -- sh
```

#### check c02 container logs
```bash
kubectl logs emptydir-demo -c c02
```
#### if pod is restarted, data is gone.
<img width="961" height="385" alt="image" src="https://github.com/user-attachments/assets/39cb3488-4bb5-4478-a0b6-2340e8709c74" />



