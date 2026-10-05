# Hands-On Guide: High Availability, Load Balancing & Content Delivery

## Scenario Overview
You are now configuring the enterprise edge, traffic routing, and load balancing layers for the **CloudPay** platform. This setup distributes incoming public requests securely across multi-AZ compute targets, caches global static assets via CloudFront, and handles authoritative DNS resolution and intelligent routing policies using Route 53.

---

## Step 1: Elastic Load Balancing (ELB)

### 1. Application Load Balancers (ALB) vs. Network Load Balancers (NLB)
* **Application Load Balancer (Layer 7):** Operates at the application layer. Routes HTTP/HTTPS traffic based on path rules, host headers, and query parameters. Ideal for the CloudPay web and API microservices.
* **Network Load Balancer (Layer 4):** Operates at the transport layer. Handles millions of requests per second with ultra-low latency, routing TCP/UDP traffic directly to targets. Ideal for high-throughput payment processing endpoints requiring static source IPs.

### 2. Target Groups, Listener Rules, & Health Checks
1. Go to **EC2** -> **Target Groups** -> Click **Create target group**.
   * **Target type**: Instances
   * **Target group name**: `cloudpay-app-tg`
   * **Protocol / Port**: HTTP / 80
   * **VPC**: `CloudPay-Production-VPC`
   * **Health check path**: `/health` (Interval: 30s, Timeout: 5s, Healthy threshold: 2, Unhealthy threshold: 2)
2. Go to **Load Balancers** -> Click **Create Load Balancer** -> Choose **Application Load Balancer**.
   * **Name**: `CloudPay-Public-ALB`
   * **Scheme**: Internet-facing
   * **Mappings**: Select `ap-south-1a` (Public-Subnet-1a) and `ap-south-1b` (Public-Subnet-2b).
   * **Security Groups**: Create and assign `cloudpay-alb-sg` (Inbound HTTP/HTTPS from `0.0.0.0/0`).
3. **Listeners and Routing**: Configure Listener on Port `80` (and `443` with an ACM SSL/TLS certificate) to forward traffic directly to `cloudpay-app-tg`.

---

## Step 2: Content Delivery & DNS Management

### 1. Amazon CloudFront CDN (Origins, Edge Caching, & OAC/OAI Security)
1. Go to **CloudFront** -> Click **Create distribution**.
2. **Origin domain**: Select your Amazon S3 bucket (`cloudpay-static-assets`) or ALB (`CloudPay-Public-ALB`).
3. **Origin Access Control (OAC)**: Recommended for S3. Create a new control setting so CloudFront signs requests, locking down the S3 bucket so it can *only* be accessed via CloudFront.
4. **Viewer Protocol Policy**: Redirect HTTP to HTTPS.
5. **Cache Policy**: Choose `CachingOptimized` to offload backend compute tasks by serving static assets (images, JS, CSS) from AWS Edge Locations globally.

### 2. Amazon Route 53 (Hosted Zones, Records, & Routing Policies)
1. Go to **Route 53** -> **Hosted zones** -> Click **Create hosted zone**.
   * **Domain name**: `cloudpay.internal` (or your registered custom domain name).
   * **Type**: Public hosted zone.
2. **Record Configuration & Routing Policies**:
   * **Simple Routing**: Standard records pointing your apex or subdomain directly to the ALB (`CloudPay-Public-ALB`).
   * **Weighted Routing**: Split traffic percentages between primary and secondary infrastructure regions for canary deployments.
   * **Latency-Based Routing**: Direct global users to the AWS Region that provides the lowest network latency.
   * **Failover Routing**: Automatically reroute traffic to a disaster recovery region or static error page if primary health checks fail.
