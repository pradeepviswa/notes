# docker

### docker images available here
https://hub.docker.com/

## install docker
```
# install docker in ubuntu machine
sudo su
apt update
apt install docker.io -y
```

#### list all images
```
docker images
or
docker image ls
```

#### run a container in interactive mode
- run: run the container
- it: run in iteractive mode
- c01: name of container. no capital letter
- ubuntu: is base image
- /bin/bash: run bash terminal when container runs

```
docker run -it -name c01 ubuntu /bin/bash
```
#### run a container in detached mode
```
docker run -dt -name c01 ubuntu
```
- dt: run in detached mode

#### come out of container
```
ctrl + pq
p: save the process
q: quit the process
```

#### show running containers
```
# ps means process
docker ps
```

#### stop a running container
```
docker stop c01
```

#### start a container
```
docker start c01
```

#### enter running container
```
docker exec -it c01 /bin/bash
```

#### stop a running container
````
docker stop c01
````

#### remove a stopped container
docker rm c01

#### remove image
```
docker rmi ubuntu
```
#### force deletre all container with force parameter
```
docker rm $(docker ps -a -q ) -f
```
####

