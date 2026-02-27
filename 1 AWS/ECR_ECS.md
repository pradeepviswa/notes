# Run docker in EC2 instance
## Install docker on Ubuntu
```
sudo apt update
sudo snap install aws-cli --classic
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

sudo systemctl start docker
sudo systemctl enable docker
```


#### Concreate a new role
```
IAM> Roles > Create role
Trusted entity type: AWS service
Service or use case: EC2
Add permissions: AmazonEC2ContainerRegistryFullAccess
Role name → EC2-ECR-Access
```
#### Attach Role to Your EC2
```
Go → EC2 → Instances
Select your instance
Actions → Security → Modify IAM role
Choose EC2-ECR-Access
Save
```

## Install docker on Amazon Linux
```
sudo dnf update -y
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
docker --version
```

# Docker Command
#### docker image can be downloaded from hub.docker.com
```
docker images
docker pull ubuntu
docker run ubuntu
docker run -it ubuntu /bin/bash # interactive
docker run nginx
docker run -d -p 8080:80 nginx
```

# Build Image Dockerfile
#### dockerfile
```
# dockerfile
FROM httpd
WORKDIR /usr/local/apache2/htdocs/
COPY index.html .
```
#### index.html
```
# index.html
<html>
<center> <h1>
  This is my test wesite
</center> </h1>
</html>
````
#### build command
```
docker build -t img:1 .
```
#### run docker image
```
docker run -d -p 80:80 img:1
```

#### browse website
```
htttp://<public-ip-of-ec2-instance>
```


# Elastic container registry
#### crate registry
```
Amazon ECR > Private registry > Repositories > Create private repository
name: img1
create
```
#### push docker image to ECT
- select img1 repository
- click on "View Push Commands"
- <img width="652" height="529" alt="image" src="https://github.com/user-attachments/assets/54b2d608-ac28-4bca-a434-123344ddbe5f" />
```
# belose commands will not work for all becuase ecr ID is used here. Shown just for reference
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 471112878240.dkr.ecr.us-east-1.amazonaws.com
docker build -t img1 .
docker tag img1:latest 471112878240.dkr.ecr.us-east-1.amazonaws.com/img1:latest
docker push 471112878240.dkr.ecr.us-east-1.amazonaws.com/img1:latest
```
- refresh img1
- authenticate EC2 machine to push command
- aws configure
- [account - se credential - create access key]
- key and secret
- region: ECR region (ex. ap-south-1)
- format: json (or yaml)
- for this use push command, run 4 commands
- connect ecr command
- docker build -t sl-repo .
- tag image
- push image

- copy image url from AWS ECR

- Crete docker env to run ECR image
# In ECS create cluster
- AWS Fargate - it is adv version of ec2, it is serverless
- task def - create a new task
-  	deploy-run task, select cluster on which thie task should run


# Host a website using AWS
- EC2 instance, install docker
