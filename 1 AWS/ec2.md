# Create EC2

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
  


## Create custome AMI image
- Instances > select web1
- Actions > image and templates -> create image
- Image name: img1
- create imaage
- Image appear here: EC2 --> Images --> AMIs (this takes approx 5 mins)
- <img width="719" height="108" alt="image" src="https://github.com/user-attachments/assets/4062d258-c86d-4cc4-a418-8018358e04eb" />

## Create Application Load Balancer
### Create Target Group
- EC2 > Target groups
- Create Target Group
- Target group name: tg1
- VPC: vpc1
- Next
- Select all Instances and click on "Include as pending Below"
- Next
- Create Target Group
### Create Load Balancer
- EC2 > Load balancers
- Create Load Balancer
- Application Load balancer > Create
- Load balancer name: AppLB
- VPC: vpc1
- Availability Zones and subnets: select subnet1 and subnet2
- Security groups: sg1
- Target group: tg1
- Create Load Balancer (takes 5 mins approx)
- Copy DNS name and browse website, example AppLB-287680765.us-east-1.elb.amazonaws.com
- <img width="1321" height="540" alt="image" src="https://github.com/user-attachments/assets/0d4ed41a-b6eb-4e7d-ae2d-cc3492448857" />
- Target group "tg1"  should be healthy
- <img width="839" height="291" alt="image" src="https://github.com/user-attachments/assets/4498ee8b-2a66-4342-a21c-d917a9e7304b" />
- now it is safe to browse the DNS name copied above.



## Copy AMI to different region and create an EC2 instance
- EC2 --> Images --> AMIs
- selct img1 -> actions -> Copy AMI
- Destination Region: Unites States (Ohio)
- Copy AMNI 



## Enable communication between 2 regions
