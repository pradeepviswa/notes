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
