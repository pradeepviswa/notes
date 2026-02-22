

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




