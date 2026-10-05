# AWS Certified Solutions Architect & DevOps Study Notes

---

## Module 1: Cloud Fundamentals & Core Infrastructure

### 1. Cloud Computing Concepts & Global Infrastructure
- **Cloud Computing Models:**
  - **IaaS (Infrastructure as Service):** AWS manages physical hardware; you manage OS, middleware, and applications (e.g., EC2).
  - **PaaS (Platform as Service):** AWS manages OS, runtime, and infrastructure; you manage application code (e.g., Elastic Beanstalk).
  - **SaaS (Software as Service):** Fully managed application (e.g., AWS WorkMail, Microsoft 365).
- **Global Infrastructure:**
  - **Regions:** Physical geographic locations containing multiple isolated Availability Zones (e.g., `ap-south-1` in Mumbai).
  - **Availability Zones (AZs):** One or more discrete data centers with redundant power, networking, and connectivity within a Region.
  - **Edge Locations:** Points of Presence (PoP) used by CloudFront CDN to cache content closer to end-users.
- **Shared Responsibility Model:**
  - **AWS Responsibility (Security OF the Cloud):** Physical data centers, hardware, host OS, virtualization layer, network infrastructure.
  - **Customer Responsibility (Security IN the Cloud):** Guest OS patches, IAM access management, network/firewall configurations (Security Groups), data encryption.

---

### 2. AWS VPC, Subnets, Internet Gateways, & Route Tables
- **Custom VPC Setup:**
  - **VPC (Virtual Private Cloud):** Logically isolated virtual network for your AWS resources.
  - **CIDR Block:** Defines IP space (e.g., `10.0.0.0/16` gives 65,536 IP addresses).
- **Subnets:**
  - **Public Subnet:** Has a direct route to an Internet Gateway (`0.0.0.0/0` -> `igw-xxxx`). Resources get public IPs.
  - **Private Subnet:** No direct route to the Internet Gateway. Used for databases, backend microservices, and internal workloads.
- **Internet Gateway (IGW) & Route Tables:**
  - **IGW:** Scalable, VPC-attached component enabling communication between resources in your VPC and the internet.
  - **Route Table:** Set of rules (routes) used to determine where network traffic from your subnet is directed.

---

## Module 2: Compute Services

### 1. EC2 Instances, Key Pairs, & Security Groups
- **EC2 (Elastic Compute Cloud):** Resizable virtual servers in the cloud.
  - **Instance Types:** General Purpose (`t3`, `m5`), Compute Optimized (`c5`), Memory Optimized (`r5`), Storage Optimized (`i3`).
  - **Purchasing Options:** On-Demand (pay per second/hour), Reserved Instances/Savings Plans (1–3 yr commitment for heavy discount), Spot Instances (up to 90% discount for fault-tolerant workloads).
- **Key Pairs:**
  - Public key stored by AWS; private key (`.pem`/`.ppk`) downloaded by user for SSH access (`ssh -i key.pem ec2-user@<public-ip>`).
- **Security Groups:**
  - Stateful virtual firewalls controlling inbound and outbound traffic at the instance level.
  - Rules are **allow-only** by default (all outbound allowed, all inbound blocked).

---

### 2. AMI Creation, Copying, & Auto Scaling
- **AMIs (Amazon Machine Images):**
  - Pre-configured templates containing OS, application server, and applications needed to launch an EC2 instance.
  - Custom AMIs can be copied across AWS Regions to enable multi-region deployments.
- **Auto Scaling Groups (ASG):**
  - Automatically adds or removes EC2 instances based on demand or metrics (CPU, Memory, Request Count).
  - Uses **Launch Templates** or **Launch Configurations** to define instance attributes (AMI, instance type, key pair, security group).

---

## Module 3: Storage & Content Delivery

### 1. S3 Storage Classes, Lifecycle Policies, & Versioning
- **S3 (Simple Storage Service):** Object storage built to store and retrieve any amount of data from anywhere.
- **Storage Classes:**
  - **S3 Standard:** High durability, low latency, general data access.
  - **S3 Standard-IA (Infrequent Access):** Lower storage cost, retrieval fee applied.
  - **S3 Glacier Flexible / Deep Archive:** Archival data, lowest cost, retrieval times from minutes to hours.
- **Versioning & Lifecycle Rules:**
  - **Versioning:** Keeps multiple variants of an object in the same bucket to protect against accidental deletions/overwrites.
  - **Lifecycle Rules:** Automates moving objects between storage classes or deleting them after a specified period.

---

### 2. CloudFront CDN & Route 53 DNS Routing
- **AWS CloudFront:**
  - Content Delivery Network (CDN) that caches static and dynamic content at Edge Locations worldwide for low-latency delivery.
- **Amazon Route 53:**
  - Scalable Domain Name System (DNS) web service.
  - **Routing Policies:**
    - **Simple:** Standard 1:1 domain-to-IP mapping.
    - **Weighted:** Routes traffic across resources based on assigned weights (e.g., 80% v1, 20% v2).
    - **Latency-based:** Directs traffic to the AWS region offering the lowest network latency for the user.
    - **Failover:** Primary/Secondary setup for disaster recovery health checks.

---

## Module 4: Networking & Load Balancing

### 1. Application & Network Load Balancers
- **ELB (Elastic Load Balancing):** Distributes incoming application traffic across multiple target instances.
- **Application Load Balancer (ALB):**
  - Operates at Layer 7 (HTTP/HTTPS).
  - Supports path-based (`/api`), host-based (`app.domain.com`), and query-string routing.
- **Network Load Balancer (NLB):**
  - Operates at Layer 4 (TCP/UDP/TLS).
  - Ultra-high performance, capable of handling millions of requests per second with ultra-low latency.

---

### 2. VPC Peering, NAT Gateways, & Transit Gateways
- **NAT Gateway:**
  - Placed in a **Public Subnet** to allow instances in a **Private Subnet** to connect to the internet (e.g., for software updates) while preventing external inbound connections.
- **VPC Peering:**
  - Networking connection between two VPCs that enables routing using private IP addresses. Does not support edge-to-edge routing or transitive peering.
- **AWS Transit Gateway:**
  - Centralized hub that connects multiple VPCs, on-premises networks, and AWS accounts in a star topology.

---

## Module 5: Security, Identity & Compliance

### 1. IAM Roles, Policies, Users, & Groups
- **IAM (Identity and Access Management):**
  - **Users:** End-users or services requiring direct authentication.
  - **Groups:** Collections of users assigned identical permissions.
  - **Roles:** Temporary identities assumed by users, applications, or AWS services (e.g., allowing an EC2 instance to read an S3 bucket without hardcoded credentials).
  - **Policies:** JSON documents defining explicit permissions (`Allow` or `Deny` on `Actions` for specific `Resources`).

---

### 2. AWS Key Management Service (KMS) & Secrets Manager
- **AWS KMS:** Managed service to create and control cryptographic keys used to encrypt data at rest across AWS services (EBS, S3, RDS).
- **AWS Secrets Manager:** Enables rotation, management, and retrieval of database credentials, API keys, and other secrets throughout their lifecycle.

---

## Module 6: Serverless & Containerization

### 1. AWS Lambda & API Gateway
- **AWS Lambda:** Event-driven, serverless compute service that runs code in response to events (S3 upload, API call, DynamoDB update) without managing servers.
- **Amazon API Gateway:** Fully managed service for developers to create, publish, maintain, monitor, and secure RESTful and WebSocket APIs at any scale.

---

### 2. Elastic Container Registry (ECR) & Elastic Container Service (ECS)
- **AWS ECR:** Fully managed Docker container registry for storing, managing, and deploying Docker container images.
- **AWS ECS:** Scalable container management service supporting Docker containers.
  - **Launch Types:**
    - **EC2 Launch Type:** You provision and manage the underlying EC2 instances hosting your containers.
    - **AWS Fargate:** Serverless compute engine for containers; no server management required.

---

## Module 7: Infrastructure as Code & Automation

### 1. AWS CloudFormation Templates
- **CloudFormation:**
  - Declarative Infrastructure as Code (IaC) service using YAML or JSON.
- **Key Sections:**
  - `Parameters`: Custom values passed into the template at runtime.
  - `Resources` *(Mandatory)*: Specifies the AWS infrastructure objects to deploy.
  - `Outputs`: Returns values (e.g., instance IP, VPC ID) to view or import into other stacks.

---

### 2. AWS CLI & SDK Automation Scripts
- **AWS CLI:** Command-line interface to control and automate AWS services using scripts (`aws ec2 run-instances`, `aws s3 sync`).
- **AWS SDKs (e.g., Boto3 for Python):** Software development kits allowing programmatical management of AWS services directly inside application code.
