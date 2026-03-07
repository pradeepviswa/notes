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
- it is not widely used because of kubernetes.
- 2 container in 2 different EC2 instances, we need overlay network to establish communicaiton between c01 and c02 containers in below scenario.
  <img width="1085" height="392" alt="image" src="https://github.com/user-attachments/assets/5f6ddf1d-d8e6-4799-b2d9-35f53e1757e1" />

#### None network
- It is used where container is not ready to talk to any network.
- No IP address, no External communicaiton
- Container cannot access internet or other containers
- It is not widely used
- how to 
  ```
  docker run -it --name c02 --network none ubuntu  /bin/bash 
  ```

#### create a custom network

- this will show all networks
  ```
  docker network ls
  ```
- new network create
  ```
  docker network create mynetwork
  ```
- create a containe rwith new network
  ```
  docker run -dt --network mynetwork --name c03  ubuntu /bin/bash
  ```
- check ip range of newly created network
  ```
  docker inspect mynetwork
  ```

#### establish communicaiton between two networks
- connect c01 and try to ping ip of c02. it will ping
- connect c01 and try to ping c03, it will ping.
- from c03, neither c01 and c02 will conenct
- enable communicaiton between c03 and  c02. c03 is in "mynetwork"
  ```
  docker network connect mynetwork c02
  ```
- install ping
  ```
 apt install iputils-ping -y
  ```
- my scenario
  ```
  c01: 172.17.0.2
  c02: 172.17.0.3
  c03: 172.18.0.2
  ```
- how it works
- I connected c03, from here I am able to ping c02 using container name.
- Using IP address it doesn't work.
  ```
  <img width="581" height="237" alt="image" src="https://github.com/user-attachments/assets/b25784b3-8c99-4f34-9980-8d09d3d4ba20" />

  <img width="852" height="623" alt="image" src="https://github.com/user-attachments/assets/cde18e45-ac35-4dc0-adca-63621a2e02fc" />



