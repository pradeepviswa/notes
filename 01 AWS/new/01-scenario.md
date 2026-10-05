# Real-World Scenario: CloudPay E-Commerce Platform

## Scenario Overview
You are tasked with designing and building the cloud infrastructure for **CloudPay**, a multi-tier financial technology application. Users upload payment invoices (PDFs/Images), process them via backend application services, and persist transaction records in a database.

---

## Architectural Requirements & Specifications

### 1. High-Level Architecture Flow


---

## Network & Subnet Topology

| Layer | Subnet Type | CIDR Block | Availability Zone | Associated Gateway / Route | Target Workloads |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Edge / Public** | Public Subnet 1 | `10.0.1.0/24` | `ap-south-1a` | Internet Gateway (`IGW`) | Application Load Balancer (ALB), NAT Gateway |
| **Edge / Public** | Public Subnet 2 | `10.0.11.0/24` | `ap-south-1b` | Internet Gateway (`IGW`) | Secondary Load Balancer Endpoint |
| **Application** | Private Subnet 1 | `10.0.2.0/24` | `ap-south-1a` | NAT Gateway (`NAT-GW`) | EC2 Application Nodes / ECS Fargate Tasks |
| **Application** | Private Subnet 2 | `10.0.12.0/24` | `ap-south-1b` | NAT Gateway (`NAT-GW`) | Secondary App Microservices |
| **Database** | Private Subnet 1 | `10.0.3.0/24` | `ap-south-1a` | Local VPC Route Only | Amazon RDS PostgreSQL Primary |
| **Database** | Private Subnet 2 | `10.0.13.0/24` | `ap-south-1b` | Local VPC Route Only | Amazon RDS PostgreSQL Standby |

---

## Module-by-Module Progression Plan

### Phase 1: Virtual Private Cloud (VPC) & Networking Setup
- Provision `10.0.0.0/16` custom VPC across 2 Availability Zones (`ap-south-1a` and `ap-south-1b`).
- Set up **Internet Gateway** for public subnets and **NAT Gateway** with an Elastic IP for egress traffic from private subnets.
- Define **Route Tables** for Public, Private App, and Isolated Database subnet groups.

### Phase 2: EC2 Compute Deployment
- Launch EC2 web/app nodes in private application subnets.
- Implement Security Groups with least-privilege inbound rules (allowing traffic only from ALB).
- Configure continuous app updates without exposing servers directly to the public internet.

### Phase 3: High Availability & Load Balancing
- Deploy an **Application Load Balancer (ALB)** in public subnets to distribute user requests.
- Configure target groups and health check thresholds.
- Set up an **Auto Scaling Group (ASG)** using Custom AMIs to scale application nodes dynamically.

### Phase 4: Database Provisioning
- Create an Amazon RDS PostgreSQL instance deployed in Multi-AZ configuration using DB Subnet Groups across private database subnets.
- Restrict inbound traffic to accept requests only from the application security group.

### Phase 5: Containerized Re-architecture (ECS & ECR)
- Build Docker container images for the CloudPay application.
- Push images to **Amazon ECR (Elastic Container Registry)**.
- Migrate from EC2 instances to **AWS ECS Fargate** serverless container deployment.

### Phase 6: Storage & Static Asset Caching
- Provision an **Amazon S3 Bucket** for encrypted invoice document uploads with lifecycle management policies.
- Attach an **Amazon CloudFront CDN** distribution with Origin Access Control (OAC) for secure content caching.

### Phase 7: Infrastructure as Code & DevOps Automation
- Codify the entire infrastructure using **AWS CloudFormation** and **Terraform**.
- Implement CI/CD automation pipelines using **AWS CodePipeline** / GitHub Actions.
