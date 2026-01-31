# Install ansible in AWS EC23 machines
1. create 3 VMs
   ansible-server, prod-machine1, prod-machine2
2. ssh to all 3 servers
   ssh -i key.pem ubuntu@ip

# on ansible-server vm install ansible
```

ansibole -version
```
## define the host
This list will contain prod-machine1 and prod-machine2 VM IPs
```
cat /etc/ansible/hosts
```



 
