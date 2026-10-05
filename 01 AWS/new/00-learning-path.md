# AWS Certified Solutions Architect / DevOps Learning Path

## Module 1: Cloud Fundamentals & Architecture Design
- [ ] **Cloud Computing Concepts & Global Infrastructure**
  - IaaS, PaaS, SaaS Models
  - Regions, Availability Zones (AZs), & Edge Locations
  - AWS Shared Responsibility Model Matrix
- [ ] **Core Architectural Planning**
  - Multi-AZ High Availability & Fault Tolerance Design
  - IP Addressing & Subnet CIDR Sizing Strategy

---

## Module 2: Core Network Infrastructure (Custom VPC)
- [ ] **AWS VPC, Subnets, & Network Routing**
  - Custom VPC Setup (`/16` CIDR)
  - Public Subnets (Web/ALB Layer) vs. Private Subnets (App/DB Layer)
  - Internet Gateways (IGW) & Route Tables
- [ ] **Private Network Internet Access & Egress Traffic**
  - NAT Gateway Configuration (Placement & Elastic IPs)
  - Private Subnet Route Table Associations
- [ ] **VPC Security Controls**
  - Network Access Control Lists (NACLs) vs. Security Groups
  - VPC Flow Logs for Traffic Audit

---

## Module 3: Compute & Database Infrastructure
- [ ] **EC2 Instances, Storage, & Security Groups**
  - Launching EC2 Instances (Instance Types, Key Pairs)
  - EBS Volumes (gp3, io2) & EBS Snapshots
  - Security Group Rules (Inbound/Outbound Least Privilege)
- [ ] **Relational & NoSQL Database Services**
  - Amazon RDS (PostgreSQL/MySQL) Multi-AZ Provisioning
  - DB Subnet Groups, Security Groups, & Private Isolation
  - Amazon DynamoDB (Partition/Sort Keys & Provisioned vs. On-Demand)
- [ ] **AMI Creation, Copying, & High Availability**
  - Custom AMI Image Creation & Cross-Region Copying
  - Launch Templates & Auto Scaling Groups (ASG)

---

## Module 4: High Availability, Load Balancing & Content Delivery
- [ ] **Elastic Load Balancing (ELB)**
  - Application Load Balancers (ALB) vs. Network Load Balancers (NLB)
  - Target Groups, Listener Rules, & Health Checks
- [ ] **Content Delivery & DNS Management**
  - Amazon CloudFront CDN (Origins, Edge Caching, & OAC/OAI Security)
  - Amazon Route 53 (Hosted Zones, Records, & Routing Policies: Weighted, Latency, Failover)

---

## Module 5: Storage & Asset Management
- [ ] **Amazon S3 Object Storage**
  - Bucket Policies, Block Public Access, & IAM Integration
  - S3 Storage Classes, Versioning, & Lifecycle Management Rules
  - Cross-Region Replication (CRR) & Event Notifications
- [ ] **Shared Network Storage**
  - Amazon EFS (Elastic File System) for Multi-EC2 Shared Access

---

## Module 6: Security, Identity & Compliance
- [ ] **IAM Roles, Policies, Users, & Groups**
  - Least Privilege Access & IAM JSON Policy Structure
  - Assigning IAM Roles to EC2 Instances & AWS Services (EC2 Instance Profiles)
- [ ] **Data Protection & Secret Management**
  - AWS Key Management Service (KMS) for Encryption at Rest
  - AWS Secrets Manager & SSM Parameter Store for Rotating DB Credentials

---

## Module 7: Containerization & Serverless Architectures
- [ ] **Container Services (ECR & ECS)**
  - Elastic Container Registry (ECR) for Storing Docker Images
  - Elastic Container Service (ECS) Task Definitions, Services, & Fargate Launch Type
- [ ] **Serverless Compute & APIs**
  - AWS Lambda Functions & Trigger Integrations (S3, API Gateway)
  - Amazon API Gateway (REST APIs, CORS, & Authorizers)

---

## Module 8: Infrastructure as Code (IaC) & Automation
- [ ] **AWS CloudFormation**
  - Stacks, Parameters, Resources, & Outputs (YAML/JSON Templates)
- [ ] **Terraform & Automation**
  - Terraform State Management, Modules, & AWS Provider Setup
  - AWS CLI & Boto3 Python Automation Scripts

---

## Module 9: Observability, Monitoring & CI/CD
- [ ] **Monitoring & Logging**
  - Amazon CloudWatch (Metrics, Alarms, Logs, & Dashboards)
  - AWS CloudTrail for API Activity Auditing
- [ ] **CI/CD Pipelines on AWS**
  - AWS CodePipeline, CodeBuild, & Deployment Strategies (Rolling, Blue/Green)
