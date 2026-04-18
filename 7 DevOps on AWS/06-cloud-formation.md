- [Cloud Formation](#cloud-formation)
- [stack](#stack)
- [Change Set](#change-set)
- [Stack Set](#stack-set)
- [Drift Detection](#drift-detection)
- [Cloudformation workflow](#cloudformation-workflow)
- [commands](#commands)

# Cloud Formation
It is an AWS service that lets us model, provision and manage aws and third party resourcs by reating infra as code

## Template
it is a yaml file containing resoruces to be created in AWS. It is the bluepront for the infrastructure.

# stack
Is a collection of AWS resoruces created using yaml file.

# Change Set
Preview of changes we made in stack. It will not make any change in stack as of now

# Stack Set
extends stack across multiple AWS accounts and regions with a single CloudFormation template.

# Drift Detection
Detects whether actual resource configurations differe from the template's expected configuraiton.


# template - demo
```
AWSTemplateFormatVersion
    <verison nimber of aws template>

Description
    < describe what this template is about. detail.

Parameters
    <while creating resources i want to take inputs from user, that time this section is used.>

Resoruces
    < what all resorucs we want to create >

Output
    see the detail of resoruces created, example name of EC2 isntance or s3 bucket.
```

# Cloudformation workflow
- author template: write json or yaml file
- upload to s3 bucket: stpore template here
- creat stack: cloud formation reads the template and begins provisioning
- monitor events: track resoruces creation events in real time
- stack complete: all resources created status become create_complete


# commands
<img width="880" height="372" alt="image" src="https://github.com/user-attachments/assets/f079d7c9-d8f6-4291-9126-fcbf75ba8add" />



# simple example to create bucket and show output
<img width="332" height="250" alt="image" src="https://github.com/user-attachments/assets/0c39de3a-f7b4-4b00-a911-8b5a71204778" />


# simple example to create bucket and show taking bucket name as an input from user in a Parameter
```yaml
# create a s3 bucket with name akshatg7657567
#bucket name and bucket arn as output
#parameter for bucket name
Parameters:
  BucketName:
    Type: String
    Default: akshatg7657567
Resources:
  MyS3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Ref BucketName
Outputs:
  BucketName:
    Value: !Ref MyS3Bucket
  BucketArn:
    Value: !GetAtt MyS3Bucket.Arn
```




