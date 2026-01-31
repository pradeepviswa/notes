# Install ansible in AWS EC2 machines
1. create 3 VMs
   ansible-server, prod1, prod2
2. ssh to all 3 servers
   ssh -i key.pem ubuntu@ip

# on ansible-server vm install ansible
```
sudo su 
apt update -y
apt-get install -y software-properties-common
apt-add-repository ppa:ansible/ansible
apt-get update
apt-get install -y ansible
ansibole --version
```
## define the host
This list will contain prod-machine1 and prod-machine2 VM IPs
this contans host groups. modify below file 
```
vi /etc/ansible/hosts
```
and add node IPs
```
[dev]
172.16.32.1
172.16.32.2
```

# create common user in Ansible-Server, PROD1 and PROD2 VMs. Keep same password
```
sudo su
adduser devops
# enter password
```



 
