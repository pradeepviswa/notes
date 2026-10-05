# Module 7: Containerization & Serverless Architectures (Scenario 2 - Pure ECS & Serverless)

## Overview
In this module, you will build out the fully containerized and serverless architecture for the **CloudPay** platform. This setup replaces traditional EC2 instances with **Amazon ECS on AWS Fargate**, stores container images in **Amazon ECR**, and integrates event-driven automation via **AWS Lambda** and **Amazon API Gateway**.

---

## Step 1: Container Registry & Image Management (Amazon ECR)

### 1.1 Create the ECR Repository
1. Navigate to the **Amazon Elastic Container Registry (ECR)** console in the `ap-south-1` region.
2. Click **Create repository**.
3. Configure settings:
   * **Visibility settings**: `Private`
   * **Repository name**: `cloudpay-payment-service`
   * **Tag immutability**: Enabled (prevents accidental overwriting of production image tags)
   * **Scan on push**: Enabled (automatically checks container layers for known vulnerabilities)
4. Click **Create repository**.

### 1.2 Build, Tag, and Push Docker Image
1. Authenticate your local Docker client to your ECR registry:
   ```bash
   aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com


### Build your application Docker image locally:
```
docker build -t cloudpay-payment .
```

### Tag the image to match your ECR repository URI:
```
docker tag cloudpay-payment:latest <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/cloudpay-payment-service:latest
```

### Push the image to ECR:
```
docker push <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/cloudpay-payment-service:latest
```

---

## Step 2: Serverless Container Orchestration (Amazon ECS on AWS Fargate)

### 2.1 Create the ECS Task Definition
1. Navigate to the **Amazon ECS** console and click **Task definitions** -> **Create new task definition**.
2. **Task definition family**: `cloudpay-payment-task`
3. **Launch type**: Select **AWS Fargate**.
4. **Operating system / Architecture**: Linux/X86_64
5. **Task size**:
   * **Task CPU**: `0.5 vCPU`
   * **Task memory**: `1 GB`
6. **IAM Roles**:
   * **Task execution role**: Select `ecsTaskExecutionRole` (allows Fargate to pull images from ECR and write logs to CloudWatch).
7. **Container configurations**:
   * **Name**: `payment-container`
   * **Image URI**: `<aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com/cloudpay-payment-service:latest`
   * **Port mappings**: Container port `8080` (Protocol: `tcp`)
8. Click **Create**.

### 2.2 Create the ECS Cluster & Service
1. In the ECS console, go to **Clusters** -> Click **Create cluster**.
   * **Cluster name**: `CloudPay-Cluster`
   * **Infrastructure**: Check **AWS Fargate (serverless)**.
   * Click **Create**.
2. Inside `CloudPay-Cluster`, go to the **Services** tab and click **Create**:
   * **Environment**: Launch type -> `Fargate`
   * **Deployment configuration**: Family -> `cloudpay-payment-task`, Revision -> `Latest`
   * **Service name**: `cloudpay-payment-service`
   * **Desired tasks**: `2` (ensures high availability across availability zones)
3. **Networking configuration**:
   * **VPC**: Select `CloudPay-Production-VPC`
   * **Subnets**: Select private application subnets (`Private-App-Subnet-1a`, `Private-App-Subnet-1b`)
   * **Security group**: Select `cloudpay-app-sg` (configured to accept inbound traffic on port `8080` exclusively from the Application Load Balancer)
   * **Auto-assign public IP**: `DISABLED` (secure private execution)
4. **Load Balancing**:
   * Select **Application Load Balancer (ALB)**.
   * Choose your existing target group (`cloudpay-app-tg`) mapping container port `8080`.
5. Click **Create service**.


