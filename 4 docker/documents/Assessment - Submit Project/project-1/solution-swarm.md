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



```
