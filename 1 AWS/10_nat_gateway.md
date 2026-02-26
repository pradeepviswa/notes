# NAT Gateway
## provide internet access to private subnet via NAT
Network Address Translation
1. NAT always sit in public subnet,
   but it will work for private subnet
2. An Elastic IP is required 
   while we are creating NAT
 
## Lab Scenario
```
VPC Name: VPC1
IPv4 CIDR: 10.0.0.0/24
Subnet: subnet1 (with public access)
IPv4 subnet CIDR block: 10.0.0.0/28
Subnet: subnet2 (private access only)
IPv4 subnet CIDR block: 10.0.0.16/28
Internet Gateway: ig1 > vpc1
Route Table:
rt1 > vpc1 > subnet1 association > edit route add internet gateway ig1
rt2 > vpc1 > subnet2 association

ec2 > security group > sg1 with port 22 and 80 added in inboud rules
vm1 > ubuntu > t3.micro > vpc1 > subnet1 > public IP enabled > security group sg1
vm1 > ubuntu > t3.micro > vpc1 > subnet2 > public IP disabled > security group sg1
```

## Practical - NAT Implementation
```
VPC --> NAT Gateway
create nat gateway -> 
Name: My-NAT
VPC: vpc1
Availability Mode: Zonal
Subnet: Public-Subnet (Nat always sits in public subject)
Connectivity Type: Public
Elastic IP Allocation: click on allocate or choose IP

Click on CREATE NAT
This will take approx. 4 mins to create
```

## VPC --> route table
```
  private Route table rt2 --> edit
  Edit route table
  0.0.0.0/0  -> select NAT Gateway --> select My-NAT
```






