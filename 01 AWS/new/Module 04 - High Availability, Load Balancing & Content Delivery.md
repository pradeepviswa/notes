# Scenario Phase 1: CloudPay E-Commerce Platform (EC2 Architecture)

## Overview
In Phase 1, you will design, build, and configure the end-to-end cloud infrastructure for the **CloudPay** platform using traditional AWS EC2 instances, Multi-AZ networking, an Application Load Balancer, and Amazon Route 53 DNS routing.

---

## Step 1: Core Network Infrastructure (Custom VPC)

### 1.1 VPC & Subnet Architecture
* **VPC CIDR Block**: `10.0.0.0/16`
* **Subnet Topology**:
  * `Public-Subnet-1a`: `10.0.1.0/24` (AZ: `ap-south-1a`) — Hosts ALB & NAT Gateway
  * `Public-Subnet-2b`: `10.0.11.0/24` (AZ: `ap-south-1b`) — Hosts ALB Standby
  * `Private-App-Subnet-1a`: `10.0.2.0/24` (AZ: `ap-south-1a`) — Hosts EC2 App Nodes
  * `Private-App-Subnet-2b`: `10.0.12.0/24` (AZ: `ap-south-1b`) — Hosts EC2 App Nodes Standby
  * `Private-DB-Subnet-1a`: `10.0.3.0/24` (AZ: `ap-south-1a`) — Hosts RDS Primary
  * `Private-DB-Subnet-2b`: `10.0.13.0/24` (AZ: `ap-south-1b`) — Hosts RDS Standby

### 1.2 Step-by-Step Execution
1. **Create VPC**: Go to VPC Console -> **Create VPC** -> Name: `CloudPay-Production-VPC`, CIDR: `10.0.0.0/16`. Enable DNS Hostnames and DNS Resolution.
2. **Create Subnets**: Create the 6 subnets defined above across `ap-south-1a` and `ap-south-1b`. Enable **Auto-assign public IPv4** on both public subnets.
3. **Internet Gateway (IGW)**: Create `CloudPay-IGW` and attach it to `CloudPay-Production-VPC`.
4. **Public Route Table**: Create `CloudPay-Public-RT`, add a route for `0.0.0.0/0` targeting `CloudPay-IGW`, and associate `Public-Subnet-1a` and `Public-Subnet-2b`.
5. **NAT Gateway**: Deploy `CloudPay-NAT-Gateway` inside `Public-Subnet-1a` with an allocated Elastic IP. Create `CloudPay-Private-RT`, add a route for `0.0.0.0/0` targeting `CloudPay-NAT-Gateway`, and associate all private application and database subnets.

---

## Step 2: Compute & Database Infrastructure

### 2.1 Security Groups Setup
* **`cloudpay-alb-sg`**: Allow inbound HTTP (`80`) and HTTPS (`443`) from `0.0.0.0/0`.
* **`cloudpay-app-sg`**: Allow inbound HTTP (`80`) or app port (`8080`) **only** from `cloudpay-alb-sg`. Allow SSH (`22`) from your Bastion / Admin CIDR.
* **`cloudpay-rds-sg`**: Allow inbound PostgreSQL (`5432`) **only** from `cloudpay-app-sg`.

### 2.2 Provisioning EC2 Instances & Database
1. **Launch EC2 App Instances**: Launch instances inside `Private-App-Subnet-1a` and `Private-App-Subnet-2b` using `cloudpay-app-sg` and your created key pair.
2. **Amazon RDS PostgreSQL**: Create a Multi-AZ production database inside `Private-DB-Subnet-1a` and `Private-DB-Subnet-2b` using the `cloudpay-rds-sg` security group and a custom DB subnet group. Ensure public access is disabled.

---

## Step 3: High Availability & Load Balancing (ALB)

### 3.1 Target Group Creation
1. Open the **EC2 Console** and navigate to **Load Balancing** -> **Target Groups**.
2. Click **Create target group**.
3. **Target type**: Select **Instances**.
4. **Target group name**: Enter `cloudpay-app-tg`.
5. **Protocol & Port**: HTTP / `80` (or `8080` matching your application port).
6. **VPC**: Select `CloudPay-Production-VPC`.
7. **Health checks**: Set path to `/health`.
8. Click **Next**, select your running EC2 application instances from the list, click **Include as pending below**, and click **Create target group**.

### 3.2 Application Load Balancer (ALB) Provisioning
1. In the EC2 Console, navigate to **Load Balancers** -> Click **Create load balancer**.
2. Choose **Application Load Balancer** and click **Create**.
3. **Basic configurations**:
   * **Name**: `CloudPay-Public-ALB`
   * **Scheme**: Internet-facing
   * **IP address type**: IPv4
4. **Network mapping**:
   * **VPC**: Select `CloudPay-Production-VPC`.
   * **Mappings**: Select `ap-south-1a` (`Public-Subnet-1a`) and `ap-south-1b` (`Public-Subnet-2b`).
5. **Security groups**: Select your pre-created `cloudpay-alb-sg` security group.
6. **Listeners and routing**:
   * **Listener**: HTTP : `80`
   * **Default action**: Forward to `cloudpay-app-tg`.
7. Click **Create load balancer**.

---

## Step 4: Content Delivery & Route 53 DNS Integration

### 4.1 CloudFront CDN & Route 53 Aliasing
1. **CloudFront**: Set up a CloudFront distribution pointing to `CloudPay-Public-ALB` or your S3 bucket (protected via OAC) to cache static assets globally.
2. **Route 53 DNS Setup**:
   * Navigate to **Route 53** -> **Hosted zones** -> Open your public hosted zone (`cloudpay.internal` or your domain).
   * Click **Create record**.
   * Set the **Record name** (e.g., `app`).
   * Choose Record Type: `A - Routes traffic to an IPv4 address and some AWS resources`.
   * Turn on the **Alias** toggle switch.
   * Select **Alias to Application and Classic Load Balancer**, select your region (`ap-south-1`), and choose `CloudPay-Public-ALB`.
   * Click **Create records**.
