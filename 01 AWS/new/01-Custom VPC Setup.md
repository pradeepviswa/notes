# Hands-On Guide: Custom VPC Setup

## Scenario Overview
You are tasked with setting up a isolated, high-availability AWS network infrastructure for a web application across two Availability Zones (AZs).

### Planned Network Architecture:
* **VPC CIDR:** `10.0.0.0/16` (65,536 IP addresses)
* **Public Subnet 1 (AZ-a):** `10.0.1.0/24` (Web/ALB Layer)
* **Private Subnet 1 (AZ-a):** `10.0.2.0/24` (App/Database Layer)
* **Internet Gateway (IGW):** Attached to the VPC for internet connectivity
* **Public Route Table:** Directs internet-bound traffic (`0.0.0.0/0`) to the Internet Gateway

---

## Step-by-Step Implementation Guide

### Step 1: Create the Virtual Private Cloud (VPC)
1. Log in to the **AWS Management Console**.
2. In the top search bar, type **VPC** and select **VPC** under Services.
3. On the left navigation pane, click **Your VPCs**.
4. Click the orange **Create VPC** button at the top right.
5. Under **VPC settings**:
   - Choose **VPC only** (for manual, step-by-step creation).
   - **Name tag:** Enter `Production-VPC`.
   - **IPv4 CIDR block:** Choose **IPv4 CIDR manual input**.
   - **IPv4 CIDR:** Enter `10.0.0.0/16`.
   - **Tenancy:** Select `Default`.
6. Click **Create VPC** at the bottom.

---

### Step 2: Create Subnets
#### A. Create Public Subnet 1
1. On the left navigation pane, click **Subnets**.
2. Click **Create subnet**.
3. **VPC ID:** Select `Production-VPC`.
4. **Subnet settings**:
   - **Subnet name:** `Public-Subnet-1a`
   - **Availability Zone:** Select `ap-south-1a` (or your primary AZ).
   - **IPv4 VPC CIDR block:** `10.0.0.0/16`
   - **IPv4 subnet CIDR block:** Enter `10.0.1.0/24`.
5. Click **Create subnet**.

#### B. Create Private Subnet 1
1. Click **Create subnet** again.
2. **VPC ID:** Select `Production-VPC`.
3. **Subnet settings**:
   - **Subnet name:** `Private-Subnet-1a`
   - **Availability Zone:** Select `ap-south-1a`.
   - **IPv4 subnet CIDR block:** Enter `10.0.2.0/24`.
4. Click **Create subnet**.

#### C. Enable Auto-Assign Public IP for Public Subnet
1. Select `Public-Subnet-1a` from the list.
2. Click **Actions** (top right) ➔ **Edit subnet settings**.
3. Check the box **Enable auto-assign public IPv4 address**.
4. Click **Save**.

---

### Step 3: Create & Attach an Internet Gateway (IGW)
1. On the left navigation pane, click **Internet gateways**.
2. Click **Create internet gateway**.
3. **Name tag:** `Prod-IGW`.
4. Click **Create internet gateway**.
5. Click **Actions** ➔ **Attach to VPC** (or click the banner prompt).
6. Select `Production-VPC` from the dropdown list.
7. Click **Attach internet gateway**.

---

### Step 4: Configure Route Tables
By default, a **Main Route Table** is created for local VPC routing. We need a custom route table for public subnets.

1. On the left navigation pane, click **Route tables**.
2. Click **Create route table**.
3. **Name:** `Public-Route-Table`.
4. **VPC:** Select `Production-VPC`.
5. Click **Create route table**.

#### A. Add Internet Route (`0.0.0.0/0`)
1. Select `Public-Route-Table`.
2. Select the **Routes** tab at the bottom and click **Edit routes**.
3. Click **Add route**:
   - **Destination:** `0.0.0.0/0`
   - **Target:** Select **Internet Gateway**, then choose `Prod-IGW`.
4. Click **Save changes**.

#### B. Associate Route Table with Public Subnet
1. Select the **Subnet associations** tab at the bottom.
2. Click **Edit subnet associations**.
3. Check the box next to `Public-Subnet-1a`.
4. Click **Save associations**.

---

## Verification & Key Takeaways

| Resource Name | CIDR / Target | Associated Component |
| :--- | :--- | :--- |
| **Production-VPC** | `10.0.0.0/16` | Main Network Boundary |
| **Public-Subnet-1a** | `10.0.1.0/24` | Public Route Table (`Prod-IGW`) |
| **Private-Subnet-1a** | `10.0.2.0/24` | Main Route Table (Local traffic only) |
| **Prod-IGW** | N/A | Attached to `Production-VPC` |

* **Public Subnet Definition:** A subnet is public **only** if its route table explicitly routes `0.0.0.0/0` to an Internet Gateway.
* **AWS Reserved IPs:** In any subnet (e.g., `/24` with 256 IPs), AWS reserves **5 IP addresses** (first 4 and last 1) for internal networking purposes, leaving 251 usable IPs.
