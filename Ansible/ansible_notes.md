# Reference: 
https://docs.google.com/document/d/1wcPTNRWPOloVWZtamJZZXWiTDrUgeZB6/edit

# Install ansible in AWS EC2 machines
1. create 3 VMs
   ansible-server, prod1, prod2
2. ssh to all 3 servers
   ssh -i key.pem ubuntu@ip

# on ansible-server vm install ansible
Refer: https://github.com/pradeepviswa/deployment-scripts/blob/main/install_ansible.sh
```
# sudo su 
export DEBIAN_FRONTEND=noninteractive
apt update -y
apt install -y software-properties-common
apt-add-repository -y ppa:ansible/ansible
apt update -y
apt install -y ansible
ansible --version
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
- On line 42 change to PermitRootlogin yes and remove #
- Remove # from line 47
- On line 66 enable PasswordAuthentication as yes by removing #

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
- Scroll down to user priviledge specification and add below line 
- devops ALL=(ALL:ALL) NOPASSWD: ALL
```
visudo 
```

# From  Ansible server we will generate the trust relationship with the nodes
- we will generate a key in the master and paste it in the ansible nodes to establish the ssh connection w/o putting password
- In Ansible-server (master machine):
```
su – devops
ssh-keygen 
# (above command generate the key in master machine) 
# (press enter three times)
```
<img width="701" height="480" alt="image" src="https://github.com/user-attachments/assets/35bd69d9-4fd3-4bcf-b1ee-52829e60b5c0" />


# Now we need to copy the keypair in the node 1 and node2 
Go to Ansible-server(master) 
```
su - devops
ls -a
cd .ssh
ssh-copy-id devops@privateipofnode1
#ssh-copy-id devops@172.31.17.124
#ssh-copy-id devops@172.31.20.227
#In the password put the password which we set while creating the user devops
```
Similarly copy to the node2 as well
<img width="1091" height="312" alt="image" src="https://github.com/user-attachments/assets/2221338e-3041-4a11-8963-db5d85c8f65b" />



# Lets now check if we are able to see the create files in the nodes via ansible 

```
ansible all -m command -a "ls"
```
<img width="477" height="196" alt="image" src="https://github.com/user-attachments/assets/93bb5fab-9407-49d9-9514-dd107b7884ad" />

 

# adhoc commnad
- single line command which using ansible library to perform a task
- You can refer ansible official document for reference.
- Example: create a file, refer https://docs.ansible.com/projects/ansible/latest/collections/ansible/builtin/file_module.html
- reference yaml block, let's create adhoc command using this block
```
- name: Touch a file, using symbolic modes to set the permissions (equivalent to 0644)
  ansible.builtin.file:
    path: /etc/foo.conf
    state: touch
    mode: u=rw,g=r,o=r
```
#### definition:
all = in all machines mentioned in hosts file
-b = become, run this command with root permission
-m = module, here we are using file module
-a = argument for module
```
#create file
ansible all -b -m file -a "path=/home/devops/test.txt state=touch"

# run ls command
ansible all -b -m command -a "ls"

#  update apt
ansible all -b -m command -a "apt update -y"
# install apache
ansible all -b -m package -a "name=apache2 state=present"
```


# some usefule command sets
- install apache2 on ubuntu
- ```
  ansible all -b -m package -a "update_cache=yes"
ansible all -b -m package -a "name=apache2 state=present"
ansible all -b -m service -a "name=apache2 state=started enabled=yes"
  ```
