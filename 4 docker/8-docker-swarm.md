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
  docker swarm init --advertise-addr <manager-ip>
  # this will show join command
  # run docker swarm join command on worker nodes
  ```
- if you miss docker swarm join command, get it from 
  ```
  docker swarm join-token worker
  ```
