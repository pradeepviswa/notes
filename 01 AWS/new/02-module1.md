# Module 1: Cloud Fundamentals & Architecture Design

## Module Overview
* **Objective:** Understand foundational cloud paradigms, AWS global infrastructure layout, and core architectural principles required to design resilient, highly available systems.
* **Target Scenario Application:** Establishing the fundamental network, region, and security strategy for the **CloudPay** platform before provisioning resources.

---

## 1. Cloud Computing Service Models



### A. Core Models Breakdown
* **IaaS (Infrastructure as a Service):**
  * **Definition:** Provides raw compute, storage, and networking resources. You retain maximum control over OS and software configurations.
  * **CloudPay Context:** Running EC2 instances as custom application nodes or hosting self-managed microservices.
* **PaaS (Platform as a Service):**
  * **Definition:** AWS manages the underlying hardware, OS patching, runtime environments, and infrastructure scaling. You focus purely on application code.
  * **CloudPay Context:** Using Amazon RDS for relational database management or Elastic Beanstalk for rapid deployments.
* **SaaS (Software as a Service):**
  * **Definition:** Fully managed end-user software delivered over the web.
  * **CloudPay Context:** Integrating AWS WorkMail, Slack webhook alerts, or Third-Party Identity Providers.

---

## 2. AWS Global Infrastructure
<img width="1035" height="520" alt="image" src="https://github.com/user-attachments/assets/3216a8bc-f642-4adb-8368-2e5dbde049b6" />


### A. Key Components
1. **Regions:**
   * Physical geographic locations around the world containing clusters of data centers.
   * **Selection Factors:** Compliance & data residency laws, latency to end-users, service availability, and cost.
   * **CloudPay Primary Region:** `ap-south-1` (Mumbai).
2. **Availability Zones (AZs):**
   * One or more discrete physical data centers with redundant power, networking, and cooling within a Region.
   * Connected via low-latency, high-bandwidth private fiber-optic networks.
   * Designed for **Fault Tolerance**—failure in one AZ does not impact adjacent AZs.
3. **Edge Locations (Points of Presence - PoP):**
   * Distributed global infrastructure used by Amazon CloudFront (CDN) and Route 53.
   * Caches static assets (e.g., CloudPay UI assets, CSS, images) closer to end users to reduce access latency.

---

## 3. Shared Responsibility Model

Security and compliance are shared responsibilities between AWS and the customer:

| Responsibility | Managed By | CloudPay Implementation Examples |
| :--- | :--- | :--- |
| **Security OF the Cloud** | **AWS** | Physical facility security, hypervisor patching, hardware integrity, global network infrastructure. |
| **Security IN the Cloud** | **Customer** | Guest OS updates, IAM user/role policies, network security group rules, application data encryption (S3/RDS). |

---

## 4. Multi-AZ Architectural Strategy for CloudPay

To prevent single points of failure, the **CloudPay** platform employs a strict Multi-AZ deployment across `ap-south-1a` and `ap-south-1b`:

* **Network Layer:** Custom VPC (`10.0.0.0/16`) split across two AZs with distinct Public, Private App, and Private DB subnets.
* **Compute Layer:** Application Load Balancer distributes incoming traffic across EC2 nodes or ECS tasks in multiple AZs.
* **Database Layer:** Amazon RDS PostgreSQL primary instance in `ap-south-1a` synchronously replicating data to a Standby instance in `ap-south-1b`.

---

## Summary & Quick Quiz

### Key Takeaways
1. **IaaS** gives max control (EC2); **PaaS** offloads OS/runtime maintenance (RDS).
2. Always design for **Multi-AZ availability** from Day 1 to tolerate data center outages.
3. Customers are responsible for **all configurations inside the VPC**, including data encryption and firewall rules.

### Review Questions
1. *Why should private backend application instances be placed across two separate Availability Zones?*
2. *Under the Shared Responsibility Model, who is responsible for patching the operating system on an EC2 instance vs. an RDS instance?*
3. *What is the primary difference between an Availability Zone and an Edge Location?*
