
# docker swarm service
- In docker swarm, service is a way to run and manage containers ina cluster
- Docker service manages:
  - which container to run
  - how many containrs to run
  - where to run them in the cluster
- docker swarm then automatically creates and manages the containers
- run below command from leader node to create a service
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
- summary
  <img width="1301" height="460" alt="image" src="https://github.com/user-attachments/assets/ba1d8565-f699-4f08-8f7a-23e84e85db77" />

#### drain node
- drain a node, it means it is now safe to remove that node from cluster
- this is useful during maintenance. change the state to "drain" later switch it back to "active".
```
docker node update --availability drain <nodeID>
docker node ls
#containers will automatically move on to next available nodes. check container status using below command
docker service ps web1
#activae
docker node update --availability active <nodeID>
```
<img width="978" height="119" alt="image" src="https://github.com/user-attachments/assets/ce5e91d2-47bd-4bcf-8aa4-a17b2a729db4" />





