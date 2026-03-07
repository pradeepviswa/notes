# docker swarm
- docker swarm is a Docker container orchestration (managemetn) tool used to manage and run containers on lultiple machines (nodes) as a cluster.
- Scenario
  - there are multiple instances
  - multiple containers running insdie each instance
  - we will create docker swarm manager and connect all instances and conenct them as a cluster
  - container wil lbe distributed, they are created in docker manager also, this is also a reason swarm failed
  - instead of running container on one server, docker swarm allows us to run and manage them across many servers automatically
    <img width="1015" height="411" alt="image" src="https://github.com/user-attachments/assets/be19f65d-bee2-49cc-888f-4d6e9dbf4fa2" />

- It only works with docker containers only. 
- rocker and container-d these are competitors of docker. 


### lab
- create 3 ec2 instances, ubuntu, t3.medium
- scenario
  ```
  docker manager: 3.218.72.233
  docker node1: 13.216.1.228
  docker node2: 100.54.104.255
  ```
- commands on docker manager
  ```
  # install docker
  apt update -y
  apt install docker.io -y
  # docker swarm initialize
  docker swarm init --advertise-addr <manager-private-ip>
  # this will show join command
  # run docker swarm join command on worker nodes
  ```
  <img width="1215" height="122" alt="image" src="https://github.com/user-attachments/assets/500ea9f5-448b-4afd-b289-f772bd97ae6e" />

- if you miss docker swarm join command, get it from 
  ```
  docker swarm join-token worker
  ```
  <img width="1214" height="89" alt="image" src="https://github.com/user-attachments/assets/214d5c35-3818-4967-b392-b3ffa590d10d" />


- run docker swarm join command in node1 and node2
  <img width="1431" height="66" alt="image" src="https://github.com/user-attachments/assets/ab1cb8c0-21af-40e6-9fac-119061ca159e" />

### commands
- show all nodes in cluster
  ```
  docker node ls
  ```
  <img width="983" height="101" alt="image" src="https://github.com/user-attachments/assets/9cdf21c0-5ae2-412d-beaa-b030ce6953b2" />


### docker swarm service
- In docker swarm, service is a way to run and manage containers ina cluster
- command to create service
  - which container to run
  - how many containrs to run
  - where to run them in the cluster
- docker swarm then automatically creates and manages the containers
- run below command on leader node
  ```
  docker service create --name web -p 8080:80 nginx
  ```
- see the containers
  ```
  docker service ps web
  ```
  <img width="1073" height="158" alt="image" src="https://github.com/user-attachments/assets/0e248c9d-88e8-4aa7-8d92-8771e8fef870" />

#### scaling
- scale service
  ```
  docker service scale myweb=10
  ```
- to see exposed port number and list of all services created
  ```
  docker service ls
  ```    
- to access the website
  ```
  HTTP://<public_ip_of_any_node>:1234
  ```
  <img width="971" height="159" alt="image" src="https://github.com/user-attachments/assets/38c6f2e7-e1a4-4551-a441-b06679f65142" />

#### replicas
- replica is container only
- scale increse same number of containers
- inside service we are creating containers using replicas
- service will have similar (replica) containers
- create another service
  ```
  docker service create --name service01 --replicas 1 -p 8080:80 nginx
  docker service ps # show containers
  docker service ls # show service itself
  docker service scale 
  ```

#### global service
- in docker swarm, global service is a service that runs one container on every node in the cluster
- leader machine, node1, node2, global service  will create container in each node
- command
  ```
  docker service create --name globalexample --mode global -dt ubuntu
  docker service create --name globalex --mode global -p 9090:80 nginx
  ```
