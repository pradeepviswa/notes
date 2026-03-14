
# why kubernetes
- docker has swarm, it is fase.
- difficult to manage multiple containers.
- solution is 'use kubernetes'
- k8s can talk to containers
- it can do load balancing
- it is introduced by google.
- there were many b2b and b2c apps in google, like gmap, gmail, etc.
- cost of admin team was huge.
- google started thinking reduce the administrators.
- they created a software fcalled BORG. it can take care of all issues automatically.
- they later udpated it and renamed it as omega
- soem employees of google joined another company and crated docker. In 2016 docker launched dokcer swarm.
- google donated omega to cncf
- cncf renamed it as kubernetes
- kubernetes is written in google language, GO Lang


# are docker and k8s same?
- no
- docker creates containers. kubernetes manages those containers
- k8s talk to containerization tools to create containers
- k8s should be used with simple and complex architecture 

# k8s architecture
- kubectl(ceo) gives instruction to create 2 pods (resources).
- request goes to apiserver(senior mgmt.).
- scheduler (hr) decides which node (team name) pod has to be created in. Example node1
- api server instructs kubelet (team lead) in node 1 to create 2 pods
- container runtime (sme) cretes the resources
- kubelet sends regular information to apiserver which is stored in etcd (account), which stores resources specifications like cpu ram, etc.
- controller manager (client) makes sure desired state is available. if any resource goes down, controller manager instructs api server to create one more pod
  
