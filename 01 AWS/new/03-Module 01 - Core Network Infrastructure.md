# Hands-On Guide: Custom VPC Setup (Multi-AZ Architecture)

## Scenario Overview
You are building the production network foundation for the **CloudPay** platform across two Availability Zones in the `ap-south-1` (Mumbai) region. This setup provides complete network isolation across Public, Private Application, and Isolated Database layers.

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
   - Select **VPC only**.
   - **Name tag:** `CloudPay-Production-VPC`
   - **IPv4 CIDR block:** `10.0.0.0/16`
   - **Tenancy:** `Default`
4. Click **Create VPC**.
5. Select `CloudPay-Production-VPC` ➔ Click **Actions** ➔ **Edit VPC settings**.
6. Check **Enable DNS hostnames** and **Enable DNS resolution** ➔ Click **Save changes**.

---

### Step 2: Create Subnets Across Multi-AZs

Navigate to **Subnets** on the left menu and click **Create subnet**. Select **`CloudPay-Production-VPC`**.

#### A. Public Subnets (Edge Layer)
1. **Public-Subnet-1a:**
   - **AZ:** `ap-south-1a`
   - **IPv4 CIDR block:** `10.0.1.0/24`
2. Click **Add new subnet** and define **Public-Subnet-2b:**
   - **AZ:** `ap-south-1b`
   - **IPv4 CIDR block:** `10.0.11.0/24`
3. Click **Create subnet**.
4. Select both public subnets (`Public-Subnet-1a` and `Public-Subnet-2b`), click **Actions** ➔ **Edit subnet settings**, check **Enable auto-assign public IPv4 address**, and click **Save**.

#### B. Private Application Subnets (Compute Layer)
1. Click **Create subnet** ➔ Select `CloudPay-Production-VPC`.
2. **Private-App-Subnet-1a:** `ap-south-1a` | CIDR: `10.0.2.0/24`
3. **Private-App-Subnet-2b:** `ap-south-1b` | CIDR: `10.0.12.0/24`
4. Click **Create subnet**.

#### C. Isolated Database Subnets (Data Layer)
1. Click **Create subnet** ➔ Select `CloudPay-Production-VPC`.
2. **Private-DB-Subnet-1a:** `ap-south-1a` | CIDR: `10.0.3.0/24`
3. **Private-DB-Subnet-2b:** `ap-south-1b` | CIDR: `10.0.13.0/24`
4. Click **Create subnet**.

---

### Step 3: Create & Attach an Internet Gateway (IGW)
1. On the left navigation pane, click **Internet gateways** ➔ **Create internet gateway**.
2. **Name tag:** `CloudPay-IGW`.
3. Click **Create internet gateway**.
4. Click **Actions** ➔ **Attach to VPC** ➔ Select `CloudPay-Production-VPC` ➔ Click **Attach internet gateway**.

---

### Step 4: Create a NAT Gateway for Private App Outbound Traffic
1. On the left navigation pane, click **NAT gateways** ➔ **Create NAT gateway**.
2. **Name:** `CloudPay-NAT-GW-1a`.
3. **Subnet:** Select **`Public-Subnet-1a`** *(Must be placed in a public subnet)*.
4. **Connectivity type:** `Public`.
5. Click **Allocate Elastic IP**.
6. Click **Create NAT gateway**.

---

### Step 5: Configure Route Tables

#### A. Public Route Table (Internet Facing)
1. Go to **Route tables** ➔ Click **Create route table**.
2. **Name:** `CloudPay-Public-RT` | **VPC:** `CloudPay-Production-VPC`.
3. Click **Create route table**.
4. Select `CloudPay-Public-RT` ➔ **Routes** tab ➔ **Edit routes**:
   - Add Route: Destination `0.0.0.0/0` ➔ Target **Internet Gateway** (`CloudPay-IGW`).
5. Go to **Subnet associations** tab ➔ **Edit subnet associations**:
   - Select `Public-Subnet-1a` and `Public-Subnet-2b` ➔ Click **Save associations**.

#### B. Private Application Route Table (Egress via NAT)
1. Click **Create route table**.
2. **Name:** `CloudPay-Private-App-RT` | **VPC:** `CloudPay-Production-VPC`.
3. Click **Create route table**.
4. Select `CloudPay-Private-App-RT` ➔ **Routes** tab ➔ **Edit routes**:
   - Add Route: Destination `0.0.0.0/0` ➔ Target **NAT Gateway** (`CloudPay-NAT-GW-1a`).
5. Go to **Subnet associations** tab ➔ **Edit subnet associations**:
   - Select `Private-App-Subnet-1a` and `Private-App-Subnet-2b` ➔ Click **Save associations**.

#### C. Private Database Route Table (Isolated)
1. Click **Create route table**.
2. **Name:** `CloudPay-Private-DB-RT` | **VPC:** `CloudPay-Production-VPC`.
3. Click **Create route table**.
4. Select `CloudPay-Private-DB-RT` ➔ **Subnet associations** tab ➔ **Edit subnet associations**:
   - Select `Private-DB-Subnet-1a` and `Private-DB-Subnet-2b` ➔ Click **Save associations**.
   *(Note: No routes to `0.0.0.0/0` are added here to ensure zero direct internet connectivity).*

---

## Architecture Verification Checklist

- [x] **Multi-AZ HA:** Subnets are created redundantly across `ap-south-1a` and `ap-south-1b`.
- [x] **Inbound Security:** Public layer routes traffic through the Internet Gateway via ALB.
- [x] **Outbound Access:** Application nodes pull patches/packages safely through the NAT Gateway.
- [x] **Database Isolation:** Database subnets have no internet routes and accept internal VPC connections only.
