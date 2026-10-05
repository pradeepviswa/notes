# Module 9: Observability, Monitoring & CI/CD

## Overview
In this module, you will implement comprehensive observability, monitoring, logging, and automated CI/CD deployment pipelines for the **CloudPay** platform using native AWS tools including Amazon CloudWatch, CloudTrail, Amazon SNS, AWS CodePipeline, and CodeBuild.

---

## Step 1: Monitoring & Logging

### 1.1 Amazon CloudWatch (Metrics, Alarms, Logs, & Dashboards)
* **Metrics:** Collect and track real-time operational data points from AWS resources (e.g., CPU utilization, disk reads/writes, network traffic, and HTTP error codes).
* **Alarms:** Set up automated threshold triggers (e.g., triggering an alarm if CPU utilization exceeds 80% for 2 consecutive periods) to notify operations teams via Amazon SNS.
* **Logs:** Centralize application and system log streams using CloudWatch Logs Log Groups and Log Streams, enabling deep query analysis via **CloudWatch Logs Insights**.
* **Dashboards:** Build centralized, multi-widget graphical dashboards to visualize the overall health, latency, and throughput of the CloudPay application stack.

### 1.2 Amazon SNS (Simple Notification Service) for Pub/Sub Messaging & Alerting
* **Topics & Architecture:** Create Pub/Sub messaging topics (e.g., `CloudPay-Operations-Alerts`) to act as communication channels for publishing notifications.
* **Subscriptions:** Configure fan-out messaging by binding multiple endpoint protocols to a single topic, such as:
  * **Email / SMS:** Direct operational alerts sent to engineers or on-call rotations.
  * **AWS Lambda / SQS:** Triggering downstream automated remediation scripts or queuing messages for asynchronous processing when critical alerts fire.
* **CloudWatch Integration:** Connect CloudWatch Alarms directly to SNS topics so that infrastructure anomalies automatically publish alerts to subscribed endpoints.

### 1.3 AWS CloudTrail for API Activity Auditing
* **API Tracking:** Automatically record all governance, compliance, and API activity across your AWS account infrastructure.
* **Management & Data Events:** Capture who made API calls, the source IP address, timestamps, and request parameters for security auditing and forensic investigations.

---

## Step 2: CI/CD Pipelines on AWS

### 2.1 AWS CodePipeline, CodeBuild, & Deployment Strategies
* **AWS CodePipeline:** Orchestrate end-to-end software release workflows with automated stages: Source (GitHub / AWS CodeCommit), Build (CodeBuild), and Deploy.
* **AWS CodeBuild:** Compile source code, run unit tests, and build Docker container images securely within managed build environments defined by a `buildspec.yml` file.
* **Deployment Strategies:**
  * **Rolling Deployment:** Gradually replaces instances or tasks with the new version, ensuring minimum capacity is maintained throughout the update.
  * **Blue/Green Deployment:** Routes traffic simultaneously between two identical production environments (Blue = current version, Green = new version), allowing instant rollback and zero-downtime cutovers.
