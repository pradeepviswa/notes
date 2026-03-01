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
- create a token in hub.docker.com
  - profile icon > Account Setting > Personal access tokens > Generate new token
  - permission: read, write, delete
  - use below command to allow login and access our image, use token to login (not password)
    ```
    docker login -u pradeepviswa
    ```
    <img width="626" height="397" alt="image" src="https://github.com/user-attachments/assets/bb864d7e-8512-4f15-9752-d847a1a3b999" />



- pull new image on new ec2 instance
```
docker pull pradeepviswa/1marchimg:v1
docker run -d -p 8080:80 pradeepviswa/1marchimg:v1
```


