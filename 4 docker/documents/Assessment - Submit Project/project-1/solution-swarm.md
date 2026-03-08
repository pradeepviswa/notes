# Project submission

## Objective
```
To deploy a scalable, multi-service voting application on a manager node,
ensuring efficient orchestration, fault tolerance, and seamless monitoring
through Docker visualizer
```
## Problem Statement and Motivation
```
John, a DevOps engineer, is tasked with deploying a voting application
through multiple microservices. By creating a Docker compose file and
deploying it on a manager node in a distributed system, they ensure that
each service is efficiently orchestrated and fault-tolerant.

To monitor the deployment, John integrates Docker visualizer as a
microservice, providing real-time insights. This setup simplifies the
deployment process, enhances scalability, and ensures the application runs
smoothly in a production environment.
```
## Create EC2 instances
|node|public-ip|private-ip|
|----|---------|----------|
|master|100.54.98.51|172.31.70.132|
|ndoe1|3.238.241.115|172.31.72.215|
|node2|3.237.27.49|172.31.75.77|
<img width="1633" height="264" alt="image" src="https://github.com/user-attachments/assets/c27afc2d-2fe9-4ff3-ac72-ad3aaabbe931" />

## Install docker on all 3 instances
```
sudo su
apt update -y
apt install docker.io -y
```
## Install docker swarm on master node
```
# master: 100.54.98.51
docker swarm init --advertise-addr 172.31.70.132
```
- node join command
  ```
  docker swarm join --token SWMTKN-1-1s3jiuk6saa2ps6h5602zdz2gko6sfgusm2nx7n2d4jq9aftt6-0zjceti04fntt7j3dwft5pmzx 172.31.70.132:2377
  ```
<img width="1465" height="218" alt="image" src="https://github.com/user-attachments/assets/afbe8469-47f1-49b5-987b-8fd6bee0cd6a" />


## join  node1 and node2 in swarm cluster
- run below command on both nodes, node1 and node2
  ```
  docker swarm join --token SWMTKN-1-1s3jiuk6saa2ps6h5602zdz2gko6sfgusm2nx7n2d4jq9aftt6-0zjceti04fntt7j3dwft5pmzx 172.31.70.132:2377
  ```
  <img width="1471" height="96" alt="image" src="https://github.com/user-attachments/assets/f72eeb2d-8e8d-4c82-ab33-e6d382314d08" />

## On manager node create images
