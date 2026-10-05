# Hands-On Guide: Custom VPC Setup (Multi-AZ Architecture)

## Scenario Overview
You are building the production network foundation for the **CloudPay** platform across two Availability Zones in the `ap-south-1` (Mumbai) region. This setup provides complete network isolation across Public, Private Application, and Isolated Database layers.

---

### Planned Network Topology

| Subnet Name | Type | Availability Zone | CIDR Block | Route Target (`0.0.0.0/0`) | Usable Role |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Public-Subnet-1a** | Public | `ap-south-1a` | `10.0.1.0/24` | Internet Gateway (`IGW`) | Application Load Balancer, NAT Gateway 1a |
| **Public-Subnet-2b** | Public | `ap-south-1b` | `10.0.11.0/24` | Internet Gateway (`IGW`) | Application Load Balancer Endpoint |
| **Private-App-Subnet-1a** | Private | `ap-south-1a` | `10.0.2.0/24` | NAT Gateway (`NAT-GW-1a`) | EC2 / ECS Fargate Application Nodes |
| **Private-App-Subnet-2b** | Private | `ap-south-1b` | `10.0.12.0/24` | NAT Gateway (`NAT-GW-1a`) | Standby Application Workloads |
| **Private-DB-Subnet-1a** | Isolated | `ap-south-1a` | `10.0.3.0/24` | Local VPC Only | Primary RDS PostgreSQL Instance |
| **Private-DB-Subnet-2b** | Isolated | `ap-south-1b` | `10.0.13.0/24` | Local VPC Only | Secondary RDS PostgreSQL Standby |

---

## Step-by-Step Implementation Guide

### Step 1: Create the Virtual Private Cloud (VPC)
1. Log in to the **AWS Management Console** and search for **VPC**.
2. On the left navigation pane, click **Your VPCs**, then click **Create VPC**.
3. Under **VPC settings**:
   * Select **VPC only**.
   * **Name tag**: `CloudPay-Production-VPC`
   * **IPv4 CIDR block**: `10.0.0.0/16`
   * **Tenancy**: Default
4. Click **Create VPC**.
5. Select `CloudPay-Production-VPC` -> Click **Actions** -> **Edit VPC settings**.
6. Check **Enable DNS hostnames** and **Enable DNS resolution** -> Click **Save changes**.

---

### Step 2: Create Subnets Across Multi-AZs
Navigate to **Subnets** on the left menu and click **Create subnet**. Select `CloudPay-Production-VPC` and create the following six subnets sequentially:

1. **Public-Subnet-1a**
   * **AZ**: `ap-south-1a`
   * **IPv4 CIDR**: `10.0.1.0/24`
2. **Public-Subnet-2b**
   * **AZ**: `ap-south-1b`
   * **IPv4 CIDR**: `10.0.11.0/24`
3. **Private-App-Subnet-1a**
   * **AZ**: `ap-south-1a`
   * **IPv4 CIDR**: `10.0.2.0/24`
4. **Private-App-Subnet-2b**
   * **AZ**: `ap-south-1b`
   * **IPv4 CIDR**: `10.0.12.0/24`
5. **Private-DB-Subnet-1a**
   * **AZ**: `ap-south-1a`
   * **IPv4 CIDR**: `10.0.3.0/24`
6. **Private-DB-Subnet-2b**
   * **AZ**: `ap-south-1b`
   * **IPv4 CIDR**: `10.0.13.0/24`

> **Important Configuration Note**: After creation, select both public subnets (`Public-Subnet-1a` and `Public-Subnet-2b`), click **Actions**, and choose **Modify auto-assign IP settings** -> Check **Enable auto-assign public IPv4 address**.

---

### Step 3: Configure Internet Gateway (IGW) & Public Route Table
1. Go to **Internet Gateways** -> Click **Create internet gateway**.
2. Name it `CloudPay-IGW` -> Click **Create internet gateway**.
3. Select the created IGW -> Click **Actions** -> **Attach to VPC** -> Select `CloudPay-Production-VPC` -> Click **Attach internet gateway**.
4. Go to **Route Tables** -> Click **Create route table**:
   * **Name**: `CloudPay-Public-RT`
   * **VPC**: `CloudPay-Production-VPC`
5. Select `CloudPay-Public-RT` -> Click **Routes** tab -> **Edit routes**:
   * Add route: Destination `0.0.0.0/0` -> Target: **Internet Gateway** (`CloudPay-IGW`) -> **Save changes**.
6. Click the **Subnet associations** tab -> **Edit subnet associations** -> Select both `Public-Subnet-1a` and `Public-Subnet-2b` -> **Save associations**.

---

### Step 4: Configure NAT Gateway for Private Outbound Egress
1. Go to **NAT Gateways** -> Click **Create NAT gateway**.
2. **Name**: `CloudPay-NAT-Gateway`
3. **Subnet**: Select `Public-Subnet-1a` (must be a public subnet).
4. **Connectivity type**: Public.
5. Click **Allocate Elastic IP**.
6. Click **Create NAT gateway**.
7. Go to **Route Tables** -> Click **Create route table**:
   * **Name**: `CloudPay-Private-RT`
   * **VPC**: `CloudPay-Production-VPC`
8. Select `CloudPay-Private-RT` -> Click **Routes** tab -> **Edit routes**:
   * Add route: Destination `0.0.0.0/0` -> Target: **NAT Gateway** (`CloudPay-NAT-Gateway`) -> **Save changes**.
9. Click **Subnet associations** -> **Edit subnet associations** -> Select both application subnets (`Private-App-Subnet-1a`, `Private-App-Subnet-2b`) and database subnets (`Private-DB-Subnet-1a`, `Private-DB-Subnet-2b`) -> **Save associations**.

---

### Step 5: VPC Security Controls & Audit Logging
* **Security Groups (Stateful):** Control traffic at the instance/ENI level. Inbound traffic allowed automatically permits matching outbound responses.
* **NACLs (Stateless):** Subnet-level firewalls requiring explicit inbound and outbound rule configurations. Keep default NACLs open unless custom compliance mandates rules.
* **VPC Flow Logs:** Enable flow logs on `CloudPay-Production-VPC` targeting a CloudWatch Logs group (`/aws/vpc/cloudpay-flow-logs`) to monitor and audit accepted and rejected traffic metrics.
