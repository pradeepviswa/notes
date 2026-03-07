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

