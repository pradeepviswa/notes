# Module 8: Infrastructure as Code (IaC) & Automation

## Overview
In this module, you will automate the provisioning and management of the **CloudPay** platform infrastructure using **AWS CloudFormation** (native declarative templates) and **Terraform** (multi-cloud IaC), alongside programmatic automation via the **AWS CLI** and **Boto3 Python scripts**.

---

## Step 1: AWS CloudFormation

### 1.1 Stacks, Parameters, Resources, & Outputs (YAML Templates)
* **CloudFormation Stacks:** A collection of AWS resources managed as a single unit (creation, updating, and deletion).
* **Template Structure:**
  * **Parameters:** Input values passed at runtime to customize deployments (e.g., environment name, instance types).
  * **Resources:** The actual AWS components to provision (e.g., VPC, EC2 instances, S3 buckets).
  * **Outputs:** Values returned after stack deployment (e.g., ALB DNS name, database endpoints) that can be shared with other stacks.
* **Example CloudFormation Template Snippet (S3 Bucket):**
  ```yaml
  AWSTemplateFormatVersion: '2010-09-09'
  Description: CloudPay Production S3 Asset Bucket
  Parameters:
    EnvironmentName:
      Type: String
      Default: production
  Resources:
    AppAssetBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: !Sub "cloudpay-assets-${EnvironmentName}"
        PublicAccessBlockConfiguration:
          BlockPublicAcls: true
          BlockPublicPolicy: true
          IgnorePublicAcls: true
          RestrictPublicBuckets: true
  Outputs:
    BucketArn:
      Description: ARN of the S3 asset bucket
      Value: !GetAtt AppAssetBucket.Arn
  ```

# Step 2: Terraform & Automation
## 2.1 Terraform State Management, Modules, & AWS Provider Setup
- AWS Provider Configuration: Define the target cloud provider and region requirements:
```Terrarom
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-south-1"
}
```
- State Management: Store Terraform state securely in a remote backend (such as an encrypted Amazon S3 bucket with state locking via DynamoDB) rather than locally.

- Modules: Encapsulate reusable infrastructure components (e.g., a standardized VPC module or RDS database module) to promote clean, dry, and maintainable code structure.

# 2.2 AWS CLI & Boto3 Python Automation Scripts
- AWS CLI: Perform administrative tasks, check resource health, or trigger deployments directly from the terminal (e.g., aws ecs update-service --cluster CloudPay-Cluster --service cloudpay-payment-service --force-new-deployment).

- Boto3 Python Automation: Write custom scripts to interact with AWS APIs programmatically.

- Example Boto3 Script (Listing S3 Invoices):
```Python
import boto3

s3_client = boto3.client('s3', region_name='ap-south-1')

def list_cloudpay_invoices(bucket_name):
    response = s3_client.list_objects_v2(Bucket=bucket_name, Prefix='invoices/')
    for obj in response.get('Contents', []):
        print(f"Found invoice file: {obj['Key']} (Size: {obj['Size']} bytes)")

if __name__ == "__main__":
    list_cloudpay_invoices("cloudpay-production-assets")
```
