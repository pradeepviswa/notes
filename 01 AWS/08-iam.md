# IAM
Create custome policy
> EC2InstanceManagementNoNetwork 
```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "EC2InstanceManagementOnly",
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeInstances",
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeImages",
                "ec2:DescribeKeyPairs",
                "ec2:DescribeTags",
                "ec2:StartInstances",
                "ec2:StopInstances",
                "ec2:RebootInstances",
                "ec2:TerminatedInstances"
            ],
            "Resource": "*"
        },
        {
            "Sid": "ExplicitlyDenyNetworkChanges",
            "Effect": "Deny",
            "Action": [
                "ec2:CreateVpc*",
                "ec2:DeleteVpc*",
                "ec2:ModifyVpc*",
                "ec2:CreateSubnet*",
                "ec2:DeleteSubnet*",
                "ec2:ModifySubnet*",
                "ec2:CreateSecurityGroup*",
                "ec2:DeleteSecurityGroup*",
                "ec2:AuthorizeSecurityGroup*",
                "ec2:RevokeSecurityGroup*",
                "ec2:CreateInternetGateway*",
                "ec2:AttachInternetGateway*",
                "ec2:CreateRoute*",
                "ec2:DeleteRoute*"
            ],
            "Resource": "*"
        }
    ]
}
```
