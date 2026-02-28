# docker

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

#### run a container
- run: run the container
- it: run in iteractive mode
- c01: name of container. no capital letter
- ubuntu: is base image
- /bin/bash: run bash terminal when container runs

```
docker run -it -name c01 ubuntu /bin/bash
```
#### or
```
docker run -dt -name c01 ubuntu
```
- dt: run in detached mode
