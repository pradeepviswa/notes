# Peer vpc1 in us-east-1 region with vpc2 in us-east-2 region
After followign below steps, ec2 instances created in us-east-1 (vpc1) and us-east2 (vpc2) will communicate with each other


## create a new vpc in us-east-2 region
- name: vpc2
- IPv4 CIDR: 192.168.0.0/24

## Create subnet
- name: subnet1
- IPv4 subnet CIDR block: 192.168.0.0/28

Refer below page and crate Internet Gateway, route table and subnet association
https://github.com/pradeepviswa/notes/blob/12654e0c5af9e5f754bf3ea7028a62f18b660edf/1%20AWS/1_create_network.md

## from us-east-1
### Raise peerign request
- VPC > Peering connections
- Create peering connection
- Name: peer-us1-to-us2
- VPC ID (Requester): vpc1
- Region: Another Region
- select: us-east-2 (Ohio)
- VPC ID (us-east-2 Accepter), example vpc-00f1c3d2a2fd6adbf
- Create peering Connection
### Updater Route Table
- VPC > Route tables
- route tabel: rt1 > edit route
- Add Route:
  - Destination: 192.168.0.0/24
  - Target: Peering Connection > <peer name>
  - <img width="654" height="60" alt="image" src="https://github.com/user-attachments/assets/57d3011e-1e95-4131-b1ad-115d60268c45" />



## from us-east-2
### Accept peering request
- VPC > Peering connections
- select request > Actions > Accept Request
- <img width="1904" height="262" alt="image" src="https://github.com/user-attachments/assets/4f442c1d-5534-4eb5-8314-b1b8e4c88305" />
### Update Route Table
- VPC > Route tables
- route tabel: rt1 > edit route
- Add Route:
  - Destination: 10.0.0.0/24
  - Target: Peering Connection > <peer name>
  - <img width="816" height="83" alt="image" src="https://github.com/user-attachments/assets/8889f381-81b1-4946-9491-ddbbd7acec76" />




 
 
