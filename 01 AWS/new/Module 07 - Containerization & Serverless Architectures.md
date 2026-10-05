# Module 7: Containerization & Serverless Architectures

## Overview
In this module, you will transition the **CloudPay** platform from traditional EC2 compute to modern containerized microservices using **Amazon ECR** and **Amazon ECS (AWS Fargate)**, alongside serverless event-driven processing using **AWS Lambda** and **Amazon API Gateway**.

---

## Step 1: Container Services (ECR & ECS)

### 1.1 Elastic Container Registry (ECR) for Storing Docker Images
1. Go to the **Amazon ECR Console** and click **Create repository**.
2. **Visibility settings**: Private.
3. **Repository name**: `cloudpay-payment-service` -> Click **Create repository**.
4. Authenticate your Docker CLI client to your ECR registry:
   ```bash
   aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.ap-south-1.amazonaws.com
