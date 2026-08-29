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
- refresh img1, newly uploaded image will appear  here

#### Create ECS Service Linked Role (GUI) — Create Role
1) Open Amazon Web Services Console
2) Search → AWS Identity and Access Management (IAM)
3) Left side → Roles
4) Click Create role
  - Choose: Trusted entity → AWS service
  - Use case: Select Elastic Container Service
5) Select: Elastic Container Service
6) Role name: ecs-role
7) Click Next → Create role


#### Create ECS Cluster
1) AWS Console → ECS
2) Click Clusters
3) Click Create cluster
4) Choose:
  - Fargate (serverless) → easiest
5) Cluster name → img1-cluster-1
6) Click Create

✅ Wait until created

#### Create Task Definition (Your Container Setup)
- This tells ECS which Docker image to run.
- Go to:
```
AWS Console → ECS → Task definitions → Create new task definition
```
- Choose: Launch type → Fargate
- Basic configuration
  - Task definition name → img1-task
  - CPU → 0.5 vCPU (default ok)
  - Memory → 1GB (default ok)

- Container configuration
  - Click Add container:
  - Container name → img1-container
```
471112878240.dkr.ecr.us-east-1.amazonaws.com/img1:latest
```
  - click Create

#### Run Your Container in Cluster
- Go to:
```
ECS → Clusters → img1-cluster-1
```

- Click Run new task
  - Choose:Launch type → Fargate
  - Task definition → img1-task
- Networking:
  - Select VPC (default ok)
  - Select subnet
  - Auto assign public IP → ENABLED (important for testing)
- Click Run task

#### ECS task must allow incoming traffic.
- Go to
```
ECS → Cluster → Task → Networking → Security group → Click it
```
- Add inbound rule:
```
Custom TCP → 8080 → 0.0.0.0/0
```
### browse website
```
Go to:
Amazon Elastic Container Service
Clusters
img1-cluster-1
Tasks
e17798c4b96848e085a5a42647a0a1cd
Configuration

Note down Public IP

http://public-ip:80
```
