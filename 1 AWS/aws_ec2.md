# AWS Notes

## Table of contents

- [Contigure Networking](#contigure-networking)
- [Create EC2 Instance](#create-ec2-instance)
- [Create custome AMI image](#create-custome-ami-image)
- [Copy AMI to different region and create an EC2 instance](#copy-ami-to-different-region-and-create-an-ec2-instance)
- [Create Application Load Balancer](#create-application-load-balancer)
- [Enable communication between 2 regions](#enable-communication-between-2-regions)

## Contigure Networking
### Create VPC
- VPC --> Your VPC --> create VPC
- Name tag: vpc1
- IPv4 CIDR block: 10.0.0.0/24
- Create VPC
### Create Subnet
- VPC --> Subnets --> Create Subnet
- subnet 1
  - VPC ID: vpc1
  - subnet name: subnet1
  - Availability zone: us-east-1a
  - IPv2 subnet CIDR Block: 10.0.0.0/28
- Subnet 2
  - VPC ID: vpc1
  - subnet name: subnet2
  - Availability zone: us-east-1b
  - IPv2 subnet CIDR Block: 10.0.0.16/28
### Create Internet Gateways
- VPC --> Internet gateways
- Create Internet gateway
- Name: ig1
- Create Internet Gatway
- Action --> Attach to VPC
- Select VPC: vpc1
- Attach internet gateway
### Create Route Table
- VPC --> Route Tables --> Create Route Table
- Name: rt1
- VPC: vpc1
- Create Route Table
- Actions --> Edit Subnet Association
- Select both subnets
- <img width="244" height="178" alt="image" src="https://github.com/user-attachments/assets/a3c858c1-ddeb-4be2-8722-e958e67be1e4" />
- Save Association
- Under Routes --> Edit routes --> Add route
  - Destination: 0.0.0.0/0
  - Target: Internet Gaw=teway --> ig1
  - save changes
### VPC summary
- VPC --> Your VPCs --> vpc1
- <img width="1316" height="285" alt="image" src="https://github.com/user-attachments/assets/51b5e357-62ec-43ac-9d2a-42415675e2bf" />


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
    - select existing security group\
    - Common security groups: sg1
- Launch instance
  


## Create custome AMI image
- Detail here

## Copy AMI to different region and create an EC2 instance
- detail here

## Create Application Load Balancer
- Detail here

## Enable communication between 2 regions
