# Module 6: Security, Identity & Compliance

## Overview
In this module, you will implement comprehensive security controls for the **CloudPay** platform. This includes enforcing least privilege access using AWS IAM, creating EC2 instance profiles for secure resource interactions, and setting up data protection mechanisms with AWS KMS encryption and automated secret rotation via AWS Secrets Manager and SSM Parameter Store.

---

## Step 1: IAM Roles, Policies, Users, & Groups

### 1.1 Least Privilege Access & IAM JSON Policy Structure
* **Principle of Least Privilege:** Grant only the exact permissions required to perform necessary operational tasks—no more, no less.
* **IAM Policy Structure (JSON):** Policies are composed of statements defining `Effect` (Allow/Deny), `Action` (specific AWS API calls), `Resource` (targeted ARNs), and optional `Condition` blocks.
* **Example Policy for S3 Invoice Uploads:**
  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "AllowInvoiceUploadsOnly",
        "Effect": "Allow",
        "Action": [
          "s3:PutObject",
          "s3:GetObject"
        ],
        "Resource": "arn:aws:s3:::cloudpay-production-assets-[your-unique-id]/invoices/*"
      }
    ]
  }
