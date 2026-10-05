# Module 5: Storage & Asset Management

## Overview
In this module, you will configure robust asset and object storage for the **CloudPay** platform using **Amazon S3** (for secure, scalable invoice and static asset storage) and **Amazon EFS** (for shared file storage across multiple EC2 application instances).

---

## Step 1: Amazon S3 Object Storage

### 1.1 Bucket Policies, Block Public Access, & IAM Integration
1. Go to the **S3 Console** and click **Create bucket**.
   * **Bucket name**: `cloudpay-production-assets-[your-unique-id]`
   * **Region**: `ap-south-1`
2. **Block Public Access**: Keep **Block all public access** checked to prevent public data exposure.
3. **Bucket Policy**: Enforce least-privilege IAM access and secure transport (forcing HTTPS):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "ForceHTTPSOnly",
         "Effect": "Deny",
         "Principal": "*",
         "Action": "s3:*",
         "Resource": [
           "arn:aws:s3:::cloudpay-production-assets-[your-unique-id]",
           "arn:aws:s3:::cloudpay-production-assets-[your-unique-id]/*"
         ],
         "Condition": {
           "Bool": {
             "aws:SecureTransport": "false"
           }
         }
       }
     ]
   }
