# Reference: 
https://docs.google.com/document/d/1wcPTNRWPOloVWZtamJZZXWiTDrUgeZB6/edit

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

# configure sshd configuration in master and node machines. Perform below steps on all 3 VMs
On line 42 change to PermitRootlogin yes and remove #
Remove # from line 47
On line 66 enable PasswordAuthentication as yes by removing #

```
vi /etc/ssh/sshd_config
```
# with latest ubuntu these steps need to be added up in master and nodes (all VMs)
Change password authentication to yes
```
vi /etc/ssh/sshd_config.d/60-cloudimg-settings.conf
```

# restart sshd service
```
service ssh restart
```

# We will now give sudo permission to the “devops” user in ansible and the nodes
Scroll down to user priviledge specification and add below line 
devops ALL=(ALL:ALL) NOPASSWD: ALL
```
visudo 
```

# From  Ansible server we will generate the trust relationship with the nodes
we will generate a key in the master and paste it in the ansible nodes to establish the ssh connection w/o putting password
In Ansible-server (master machine):
```
su – devops
ssh-keygen 
# (above command generate the key in master machine) 
# (press enter three times)
```







 

