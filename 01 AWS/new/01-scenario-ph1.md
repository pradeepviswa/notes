# Scenario Phase 1: CloudPay E-Commerce Platform (EC2 Architecture)

## Overview
In Phase 1, you will design and build the cloud infrastructure for **CloudPay** using traditional Virtual Machines (AWS EC2). Users upload payment invoices (PDFs/Images), which are processed by application services hosted on private EC2 instances, with data stored in a relational database.

---

## High-Level Architecture Flow (EC2 Phase)
<img width="1026" height="697" alt="image" src="https://github.com/user-attachments/assets/17101c96-8e33-4b8b-b50e-fb6bbd4bf6d5" />



## Network & Subnet Topology

| Layer | Subnet Name | CIDR Block | Availability Zone | Associated Gateway / Route | Target Workloads |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Public / Edge** | `Public-Subnet-1a` | `10.0.1.0/24` | `ap-south-1a` | Internet Gateway (`IGW`) | Application Load Balancer, NAT Gateway 1a |
| **Public / Edge** | `Public-Subnet-2b` | `10.0.11.0/24` | `ap-south-1b` | Internet Gateway (`IGW`) | Application Load Balancer Standby Endpoint |
| **Application** | `Private-App-Subnet-1a` | `10.0.2.0/24` | `ap-south-1a` | NAT Gateway (`NAT-GW-1a`) | Primary EC2 Application Nodes |
| **Application** | `Private-App-Subnet-2b` | `10.0.12.0/24` | `ap-south-1b` | NAT Gateway (`NAT-GW-1a`) | Auto Scaling EC2 Application Nodes |
| **Database** | `Private-DB-Subnet-1a` | `10.0.3.0/24` | `ap-south-1a` | Local VPC Route Only | Amazon RDS PostgreSQL Primary |
| **Database** | `Private-DB-Subnet-2b` | `10.0.13.0/24` | `ap-south-1b` | Local VPC Route Only | Amazon RDS PostgreSQL Standby |

---

## Detailed Component Workflow (EC2 Phase)

### 1. External Inbound Web Traffic
* **Entry Point:** Users make HTTPS requests via **Route 53 DNS** or **CloudFront CDN**.
* **Load Balancing:** Traffic hits an **Application Load Balancer (ALB)** deployed across `Public-Subnet-1a` and `Public-Subnet-2b`.
* **Target Group Forwarding:** The ALB forwards traffic to an **EC2 Target Group** using `instance` targets on standard HTTP/HTTPS application ports (e.g., port `80` or `8080`).

### 2. Private Compute Layer
* **Deployment:** EC2 instances run inside `Private-App-Subnet-1a` and `Private-App-Subnet-2b`.
* **Security & Access Control:** 
  * Private instances have **no public IP addresses**.
  * Security Groups accept inbound connections **only** from the Application Load Balancer Security Group.
* **High Availability & Auto Scaling:** An **Auto Scaling Group (ASG)** monitors CPU/memory utilization across both AZs and provisions/terminates instances using a pre-configured **Custom AMI**.

### 3. Outbound Internet Access
* EC2 instances require internet access for OS security updates, package manager downloads (`yum`/`apt`), and API integrations.
* Traffic is routed outbound via the **NAT Gateway** in `Public-Subnet-1a` using an Elastic IP, preventing external hosts from initiating direct inbound connections to the EC2 nodes.

### 4. Relational Database Layer
* **Engine:** Amazon RDS for PostgreSQL configured in Multi-AZ mode.
* **Placement:** Isolated in `Private-DB-Subnet-1a` (Primary) and `Private-DB-Subnet-2b` (Standby Replica).
* **Access Control:** Accepts inbound traffic exclusively from the **EC2 Application Security Group** on port `5432`.

### 5. Document Storage & Static Asset Caching
* **Invoice Uploads:** Invoices uploaded by users are securely stored in an encrypted **Amazon S3 Bucket**.
* **Edge Caching:** Static assets (UI HTML/CSS/JS) and media files are cached globally using **Amazon CloudFront CDN** with **Origin Access Control (OAC)** protecting S3.

---

## Phase 1 Implementation Roadmap

1. **Module 2:** Deploy Multi-AZ Custom VPC, Subnets, IGW, NAT Gateway, and Route Tables.
2. **Module 3:** Create EC2 Security Groups, launch private application instances, install dependencies, and create a **Custom AMI**.
3. **Module 4:** Configure the Application Load Balancer (ALB), Target Group (`instance` type), and set up the **Auto Scaling Group (ASG)**.
4. **Module 5:** Provision Amazon RDS PostgreSQL Multi-AZ instance and verify database connectivity from EC2 nodes.
5. **Module 6:** Integrate Amazon S3 for invoice file uploads and CloudFront CDN for edge distribution.
