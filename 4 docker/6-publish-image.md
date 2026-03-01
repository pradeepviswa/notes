# publish image
- create a custom image
- publish it to public/private registry


# steps
- login to hub.docker.com with docker credentials
- in unix run command and complet login process on VM
```
docker login
```
- tag (rename) the image as dockerhub 'username/imagename' format
```
docker tag img1 pradeepviswa/1marchimg:v1
```
- push the image to registry
```
docker push pradeepviswa/1marchimg:v1
```

