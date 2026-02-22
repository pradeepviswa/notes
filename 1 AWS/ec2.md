# Create EC2 and host website

## Create EC2 Instance
### crate key pair
- EC2 --> Network & Security --> Key Pairs
- Create Key Pair
- Name: key1
- Create key parir 
### create security group
- EC2 --> Network & Security --> Security Groups
- Create Security Group
- Security group name: sg1
- Description: sg1
- Inbound Rules
  - Add rule: allow port 22, 80 and ICMP
  - <img width="747" height="264" alt="image" src="https://github.com/user-attachments/assets/1696a62d-e0de-41f8-91bb-af6117ed90f4" />
  - Create Security Group
### create instance
- EC2 --> Instances --> Instances
- Launch Instance
- Name: web1
- OS Image: ubuntu
- instance type: t3.micro
- key pair: key1
- Network Settings:
  - VPC: vpc1
  - subnet: subnet1
  - Auto assign public IP: Enable
  - Firewall (seciruty group)
    - select existing security group
    - Common security groups: sg1
- Launch instance
- Create one more instance called "web2" with - subnet: subnet2
- <img width="1031" height="171" alt="image" src="https://github.com/user-attachments/assets/7ef46ad6-ac7c-4afd-90f1-5cc704d52d6f" />

### Configure Web Site
- run below code on web1 and web2 servers. Update echo statemetn on web2
```
sudo apt update -y
sudo apt install apache2  -y
sudo rm /var/www/html/index.html
echo "<h1> this is web 1 </h1>" | sudo tee /var/www/html/index.html  # make it web2 for secode server
sudo service apache2 restart
```
  
