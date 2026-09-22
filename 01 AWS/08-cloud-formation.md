# Cloud Formation

```
AWSTemplateFormatVersion: '2010-09-09'
Description: Launch a simple Ubuntu EC2 instance named web-cf.

Parameters:
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues:
      - t2.micro
      - t3.micro
      - t3.small
    Description: EC2 instance type (default t3.micro)

  LatestUbuntuAmiId:
    Type: 'AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>'
    Default: '/aws/service/canonical/ubuntu/server/noble/stable/current/amd64/hvm/ebs-gp3/ami-id'
    Description: Automatically fetches the latest Ubuntu 24.04 LTS AMI ID for your region.

Resources:
  MyUbuntuVM:
    Type: 'AWS::EC2::Instance'
    Properties:
      InstanceType: !Ref InstanceType
      ImageId: !Ref LatestUbuntuAmiId
      Tags:
        - Key: Name
          Value: web-cf

Outputs:
  InstanceId:
    Description: Instance ID of the created Ubuntu VM
    Value: !Ref MyUbuntuVM
  PrivateIP:
    Description: Private IP address of the instance
    Value: !GetAtt MyUbuntuVM.PrivateIp
```
