# Scenario Phase 2: CloudPay E-Commerce Platform (ECS Containerized Architecture)

## Overview
In this lab scenario, you will build the containerized microservices infrastructure for the **CloudPay** platform from scratch using **Amazon Elastic Container Service (ECS)** on **AWS Fargate**. The application is packaged into Docker containers, pushed to **Amazon ECR**, and deployed serverlessly across multiple Availability Zones with complete network isolation.

---

## High-Level Architecture Flow (Pure ECS Lab)

<img width="1023" height="540" alt="image" src="https://github.com/user-attachments/assets/4f1bb55b-2ef8-4398-a22b-b596ac94ff14" />


## Network & Subnet Topology

| Layer | Subnet Name | CIDR Block | Availability Zone | Associated Gateway / Route | Target Workloads |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Public / Edge** | `Public-Subnet-1a` | `10.0.1.0/24` | `ap-south-1a` | Internet Gateway (`IGW`) | Application Load Balancer, NAT Gateway 1a |
| **Public / Edge** | `Public-Subnet-2b` | `10.0.11.0/24` | `ap-south-1b` | Internet Gateway (`IGW`) | Application Load Balancer Standby Endpoint |
| **Application** | `Private-App-Subnet-1a` | `10.0.2.0/24` | `ap-south-1a` | NAT Gateway (`NAT-GW-1a`) | Amazon ECS Fargate Tasks (Primary AZ) |
| **Application** | `Private-App-Subnet-2b` | `10.0.12.0/24` | `ap-south-1b` | NAT Gateway (`NAT-GW-1a`) | Amazon ECS Fargate Tasks (Secondary AZ) |
| **Database** | `Private-DB-Subnet-1a` | `10.0.3.0/24` | `ap-south-1a` | Local VPC Route Only | Amazon RDS PostgreSQL Primary |
| **Database** | `Private-DB-Subnet-2b` | `10.0.13.0/24` | `ap-south-1b` | Local VPC Route Only | Amazon RDS PostgreSQL Standby |

---

## Detailed Component Workflow (Pure ECS Lab)

### 1. Container Image Lifecycle
* **Build & Push:** Build the application Docker container image and push it to **Amazon Elastic Container Registry (ECR)**.
* **Task Image Pull:** ECS Fargate tasks pull container images from ECR outbound through the **NAT Gateway**.

### 2. External Inbound Web Traffic
* **Entry Point:** Inbound requests pass through **Route 53 DNS** and **CloudFront CDN** to the **Application Load Balancer (ALB)** in the Public Subnets.
* **IP Target Group:** The ALB forwards traffic directly to the private ENI IP address of active **ECS Fargate Tasks** on container port `8080`.

### 3. Serverless Compute Layer (AWS Fargate)
* **Cluster & Tasks:** Deployed inside an **ECS Cluster** across `Private-App-Subnet-1a` and `Private-App-Subnet-2b`.
* **Networking (`awsvpc` mode):** Each task gets a dedicated Elastic Network Interface (ENI) and private IP inside the private application subnets.

### 4. Database Layer & Document Storage
* **Relational Database:** ECS Fargate tasks connect directly to **Amazon RDS PostgreSQL Multi-AZ** in isolated database subnets on port `5432`.
* **Invoice Storage:** Invoice uploads are written directly to an encrypted **Amazon S3 Bucket** via IAM Task Roles.
