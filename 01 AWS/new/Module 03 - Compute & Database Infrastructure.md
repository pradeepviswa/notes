# Hands-On Guide: Compute & Database Infrastructure

## Scenario Overview
You are now expanding the **CloudPay** platform infrastructure by deploying high-availability compute instances, configuring persistent storage, setting up least-privilege security groups, provisioning Multi-AZ databases, and implementing automated scaling groups with custom AMIs.

---

## Step 1: EC2 Instances, Storage, & Security Groups

### 1. Launching EC2 Instances (Instance Types & Key Pairs)
1. In the AWS Management Console, navigate to **EC2** -> Click **Launch instance**.
2. **Name**: `CloudPay-App-Server-1a`
3. **AMI**: Amazon Linux 2023 (AMI)
4. **Instance Type**: `t3.medium` (Balanced compute and memory for workloads)
5. **Key Pair**: Create a new key pair named `cloudpay-prod-key` (RSA, `.pem` format) for secure SSH access.
6. **Network Settings**:
   * **VPC**: `CloudPay-Production-VPC`
   * **Subnet**: `Private-App-Subnet-1a`
   * **Auto-assign Public IP**: Disable (since it resides in a private application subnet).
7. Click **Launch instance**.

### 2. EBS Volumes (`gp3`, `io2`) & EBS Snapshots
* **General Purpose SSD (`gp3`)**: Default root volumes providing baseline performance of 3,000 IOPS and 125 MB/s throughput cost-effectively.
* **Provisioned IOPS (`io2`)**: Used for high-transaction ledger processing databases requiring high IOPS consistency.
* **EBS Snapshots**:
  1. Navigate to **Elastic Block Store** -> **Volumes** -> Select your instance's data volume.
  2. Click **Actions** -> **Create snapshot**.
  3. Description: `Pre-patch backup snapshot for CloudPay App volume`. Click **Create snapshot**.

### 3. Security Group Rules (Inbound/Outbound Least Privilege)
Create a dedicated security group for the application tier:
* **Name**: `cloudpay-app-sg`
* **VPC**: `CloudPay-Production-VPC`
* **Inbound Rules**:
  * Type: `HTTP` (Port 80) | Source: Custom -> ALB Security Group ID (`cloudpay-alb-sg`)
  * Type: `SSH` (Port 22) | Source: Custom -> Bastion Host IP / CIDR (`10.0.1.50/32`)
* **Outbound Rules**:
  * Type: `All traffic` | Destination: `0.0.0.0/0` (or restricted to required database/API ports for strict egress hardening).

---

## Step 2: Relational & NoSQL Database Services

### 1. Amazon RDS (PostgreSQL/MySQL) Multi-AZ Provisioning
1. Go to **RDS** -> **Databases** -> Click **Create database**.
2. **Engine option**: PostgreSQL
3. **Template**: **Production** (enables Multi-AZ deployment automatically).
4. **Settings**: DB instance identifier `cloudpay-rds-prod`, Master username `cloudpay_admin`.

### 2. DB Subnet Groups, Security Groups, & Private Isolation
* **DB Subnet Group**: Create a custom DB subnet group (`cloudpay-db-subnet-group`) spanning both isolated subnets: `Private-DB-Subnet-1a` and `Private-DB-Subnet-2b`.
* **Connectivity**: 
  * **VPC**: `CloudPay-Production-VPC`
  * **Public access**: **No** (Enforces internal isolation).
* **Database Security Group**: Create `cloudpay-rds-sg` allowing inbound PostgreSQL traffic (Port 5432) **only** from the Application Security Group (`cloudpay-app-sg`).

### 3. Amazon DynamoDB (Partition/Sort Keys & Provisioned vs. On-Demand)
* **Table Creation**:
  * **Table name**: `CloudPay-Transactions`
  * **Partition Key**: `TransactionID` (String)
  * **Sort Key**: `Timestamp` (Number)
* **Capacity Mode Selection**:
  * Choose **On-Demand** for unpredictable transactional payment spikes, or **Provisioned** with Auto Scaling enabled for predictable baseline traffic patterns to optimize cost.

---

## Step 3: AMI Creation, Copying, & High Availability

### 1. Custom AMI Image Creation & Cross-Region Copying
1. In the EC2 console, go to **Instances** -> Select `CloudPay-App-Server-1a`.
2. Click **Actions** -> **Image and templates** -> **Create image**.
3. **Image name**: `CloudPay-App-Golden-AMI-v1` -> Click **Create image**.
4. Once available, go to **AMIs**, select your custom image, click **Actions**, and choose **Copy AMI** to replicate it to a secondary disaster recovery region (e.g., `ap-southeast-1`).

### 2. Launch Templates & Auto Scaling Groups (ASG)
1. Go to **Instances** -> **Launch Templates** -> Click **Create launch template**.
   * **Name**: `CloudPay-App-LaunchTemplate`
   * **AMI**: Select `CloudPay-App-Golden-AMI-v1`
   * **Instance Type**: `t3.medium`
   * **Security Groups**: Select `cloudpay-app-sg`.
2. Go to **Auto Scaling Groups** -> Click **Create Auto Scaling group**:
   * **Name**: `CloudPay-App-ASG`
   * **Launch Template**: Choose `CloudPay-App-LaunchTemplate`.
   * **Network Subnets**: Select both private application subnets (`Private-App-Subnet-1a`, `Private-App-Subnet-2b`).
   * **Group Scaling Limits**: Desired Capacity = `2`, Minimum Capacity = `2`, Maximum Capacity = `6`.
   * **Scaling Policies**: Configure target tracking scaling policy based on **Average CPU Utilization** at `70%`.
