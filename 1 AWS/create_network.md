# Create Network Infrastructure

## Configure Networking
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

