Topics
Container
Docker Installation and usage on ec2
ECR
ECS
Project work

Docker
container
docker image can be downloaded from hub.docker.com
Docker commands
docker images
docker pull ubuntu
docker run ubuntu
docker run -it ubuntu /bin/bash # interactive
docker run nginx
docker run -d -p 8080:80 nginx

Run docker in EC2 instance
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

sudo systemctl start docker
sudo systemctl enable docker

# Install docker on Amazon Linux
sudo dnf update -y
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user
docker --version

Dockerfile
FROM httpd
WORKDIR /usr/local/apache2/htdocs/
COPY index.html .
COPY about.html .

Elastic container registry
push docker image to ECT, terminal need to authenticate. how?
authenticate EC2 machine to push command
aws configure
[account - se credential - create access key]
key and secret
region: ECR region (ex. ap-south-1)
format: json (or yaml)
for this use push command, run 4 commands
connect ecr command
docker build -t sl-repo .
tag image
push image

copy image url from AWS ECR

Crete docker env to run ECR image
In ECS create cluster
AWS Fargate - it is adv version of ec2, it is serverless
task def - create a new task
 	deploy-run task, select cluster on which thie task should run



Host a website using AWS
EC2 instance, install docker


Project
word press machine
apache
mariagb  / MySQL
wordpress
