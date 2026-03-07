# Docker network

#### type os networks
- bridge network
- host network
- overley network
- none network

#### list all  networks
```
docker network ls
```
<img width="495" height="106" alt="image" src="https://github.com/user-attachments/assets/027e4ea5-8d51-4753-80c6-75cb65a9680e" />

- By default container gets created in default network.
- Default is bridge network. all Container uses this network to communicate with each other.

#### spin a docker
```
docker run -dt --name c01 ubuntu
```

#### docker brindge manifest
```
docker inspect bridge
```
<img width="836" height="195" alt="image" src="https://github.com/user-attachments/assets/5c136b1f-2f2b-4b36-a77e-38c6513166e8" />

#### check docker manifest
```
docker inspect c01
```

<img width="918" height="644" alt="image" src="https://github.com/user-attachments/assets/5cc94e03-8f11-4960-b4ff-5f00c3e7eb80" />

#### host network 
- container directlly uses host network without isolation
- Port mapping: in container, exposed port is accessed via host network.
- here in below container, via host network, port 1234 is accessed inside container

  ```
  docker run -dt -p 1234:80 nginx:latest
  ```
#### overlay network
- this is used in docker swarm
- 
