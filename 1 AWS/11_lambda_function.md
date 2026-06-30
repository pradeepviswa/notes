# IAM
   - custom user is called IAM user. IAM is global.
   - Create user, don't create any group, create user.
   - Create group
   - user <----- attach---- Group <---- attach ---- policy

# Lambda Function - PAAS (platform as a service)
  - Scenario
   -- upload a file in S3 bucket
   -- file name should be saved in DynamoDB
   -- steps:
```
   LAMBDA FUNCTION <---attach--- ROLE <---attach--- POLICY FOR DYNAMO DB FULL ACCESS
				S3 bucket
			     /
	      LAMBDA FUNCITON
	     /		     \
	 ROLE		      DYNAMO DB
        /
      POLICY
	  
    a) create s3 bucket
    b) create IAM role - PradeepLBRole
         policy - AmazonDymamoDBFullAccess
    c) create lambda function
       author from scrach: pradeep-lambda
       3 questions for developr: 
         Which language the code is written? Python
         What is the version of that language? 3.11
         Where will I apply?
       select role and create function
     d) add trigger -> s3 -> pradeep2100 bucket
     e) create DynamoDB - create table
        table name: newtable
        partition key: unique
     f) click on --> code. Paste below code
	click on deploy button first -> then test button
```
# Lambda Function code
```
import boto3
from uuid import uuid4
def lambda_handler(event, context):
    s3 = boto3.client("s3")
    dynamodb = boto3.resource('dynamodb')
    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        object_key = record['s3']['object']['key']
        size = record['s3']['object'].get('size', -1)
        event_name = record ['eventName']
        event_time = record['eventTime']
        dynamoTable = dynamodb.Table('newtable')
        dynamoTable.put_item(
            Item={'unique': str(uuid4()), 'Bucket': bucket_name, 'Object': object_key,'Size': size, 'Event': event_name, 'EventTime': event_time})
```

    g) add a file in s3 bucket
    h) DynamoDB -> explore tables
       refresh and see one entry has been made in table.

# real time example
## policy contents
```
POLICY:
Version: policy language version example "2012-10-17"
ID: identification (optional)
Statement: one or more individual statement is required
statement consists of:
SID: an identifier oif the statement (optional)
effect: whether the statement allows or denies
Principle: account / user role
Action: list of action policies allows / denies
resources: List of AWS resources to which the action applied to
Condition: Conditions when the policy will effect (optional)
```
## s3 access policy
```
AmazonS3FullAccess
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:*",
                "s3-object-lambda:*"
            ],
            "Resource": "*"
        }
    ]
}
```

# Create a custom policy
```
IAM -> create policy
ec2
write: select - startintance, stopinstance
resources: add ARN
	   region: us-east-1
	   resource: i-0cc8e0b2382fb1e59 [copied from instance created]
	   Resource ARN: this will be created automatically
```

# create a lambda role and attach the policy
  ```
  python 3.11
```
## code:
```
N. Virginia
us-east-1

import boto3
region = 'us-east-1'
instances = ['i-054d04aae37dcb581']			# update instance id here
ec2 = boto3.client('ec2', region_name=region)

def lambda_handler(event, context):
    ec2.stop_instances(InstanceIds=instances)
    print('stopped your instances: ' + str(instances))
```


======================================================


# Start the instances:-
```
import boto3
region = 'us-east-1'
instances = ['i-054d04aae37dcb581']
ec2 = boto3.client('ec2', region_name=region)

def lambda_handler(event, context):
    ec2.start_instances(InstanceIds=instances)
    print('started your instances: ' + str(instances))
```

# click on deploy
# click on test
  - create test case, save it and invoke it
  - this should stop the instance

# Assignment

  create a lambda function to start the instacne




