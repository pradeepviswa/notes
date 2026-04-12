# ECS
Fully manged container orchestration service provided by AWS that helps to run, manage and scale Docker containers.

# trainer document
https://docs.google.com/document/d/1r1zpm_9IOBJO6rah7xOTs_Or0wCp7lOpZpQ4gNsJMts/edit?usp=sharing

# What ECS do?
- ECS runs docker on server
- keeps them helathy
- scales them up and down automatically.

# why shoudld I use ECS?
- when we have a docker container:
  - we need a location where to run them.
  - decide how many copies we need
  - how we handle the failures
- ECS solves all the points mentioned abvoe

 # ECS require few steps
 - when i have containersized applicaiton i can use ECS

# key component sof ECS
- **cluster**: group of machines where application containers runs.
- **Task definition**:
  - docker container runs from an image. We create image frm dockerfile. Docker build command builds image.
  - it is blueprint of applicaiton running in container. it tells what will run in container. it contains inforamtion like:
    - docker image
    - port number at which applicaitohn will be running
    - CPU and memory container will utiize
-  **Task**: Running container inside the ECS cluster is task. It is created from Task Definition

# launch typ in ECS. there are 2 ways
- **use EC2 launch type**
  - you manage the servers.
  - you have more control over infrastructure
  - you have more responsibolity
  - AWS doesnot recoment this approach
- **Fargate**
  - THere is no server management
  - it is fully serverless
  - no security issues
  - no pathcing
  - no managment and administration work.
  - it is pay per use basis. When container is running, pay for that time only.
  - AWS recomends usign fargate.

# lab scenario
<img width="1219" height="752" alt="image" src="https://github.com/user-attachments/assets/9133aa92-9afd-41b7-b578-e80be86ecf9f" />

# deploy steps
> we have spring boo applicaiton. wil ldeploy it via ECS
## steps
### 1. create an EC2 instance as DEVELOPER MACHINE. This can be loptop also
```
name: developer-machine
type: t3.medium
SG allo ports: 8080
HDD: 20GB
```
### 2. clone gitbub repo
```
sudo apt update
sudo apt install git -y
sudo apt install docker.io -y
sudo apt install unzip -y
sudo apt install curl -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install 
git clone https://github.com/pradeepviswa/ECS-AWS-LAB.git
cd ECS-AWS-LAB
```
### 3. build dockerfile to create custom image (test step)
> this is just for testing docker imatge whether it is workign as expected
```
docker build -t ecslab .
docker images
docker run -dt -p 8080:8080 ecslab:latest
```
browse: http://54.90.68.175:8080/LoginWebApp-1/

### 4. push this image to ECR (Elastic Container Registry)
1. in aws open ECR
2. create a repo:
   - **namespace**:
     - suppose I have 3 images
     - PROD image, TET image, DEVELOP image
     - these imagers i will isolate using namespace. logical isolation.
     - like **prod** namespace, **test** namespace, **dev** namespace
   - image tag setting
     - **mutable**: means we can overrite the tags.
     - **immutable**: means we cannot overrite the tags.
  3. go to reigistry, click on **push commands**
  4. go to image where image is present
  5. pre requisites
     - make sure aws cli is installed
     - go to IAM and genrate AWS access key and secret key and run below command
       ```
       # store aws credential lcoally
       aws configure
       # this willa sk for aws key and secret key

      
       ```
  5. run push commands
     - retrive auth
     - build command is optional if not already built. we have already build it
     - tag the image and push the image to repository
       ```
        docker tag ecslab:latest <copy tag uri from ECR>
       ```
   6. image is now available in ECR
   7. create lifecycle policy rule of iamge in ECR
      - we can create to expire an image after certain days
     
### 5. deploy the image from ECS
1. in AWS, go to ECS -> task definition > create new task definition
2. create new task definition
   - task denifition family:escprojecttaskdefinition
   - infra requirment: AWS Fargate
   - task size: 1 CPU, 3 GB memory
   - task roles: create a new IAM role with default values
   - Container -1
     - name: mycontainer   # task def will create container with this name in ECS cluster
     - Image URI: copy from image uri from ECR
     - container port: 8080
     - keep default value sand create
    
3. create cluster, go to aws ECS > cluster > create cluster
   - name: prod-ecs-app-cluster
   - infra: fargate only
   - create cluster
   - in cluster > tasks > run a new task
     - task def: select def created above
     - task dev versi: 1
     - desired tasks: 2 $ more number of tasks means more number of containers. this can be automated later
     - compute options (default)
     - Compute options: **launch type**
     - in networking ? create new security group, allow all traffic so that i can acces my tasks
     - create task
    
   - click on any task and copy public ip and browse http://32.192.193.116:8080/LoginWebApp-1/
  
### Service - robust system if task is deleted
1. if task is deleted, application will also stop working
2. I need a system, if task is deleted, new task should create again
3. service ensures, minimum number of tasks are always running
4. select cluster > inside that click on **create service**
5. Compute options: **Launch type**
6. Deploymet configuration: **Replica**   # how many minimum numbe rof pods always be running
7. Desired tasks: 3   # this means 3 containers will alwlays be running
8. **turn on** Availability zone rebalancing    # task is distributred across the AZs
9. Networking
    - create a new secuirty group
    - custome TCP: 8080
  
10. use serivce auto scaling
    - 3min to 10max
   
11. service will create task, click on new task and again browse using IP. Problem agin.
  
12. what we have done till ow
    - tassk gets public ip
    - if task is restarted IP is changed
13. create a load balancer and it will distribute the load amongh multiple task
    - target groups
      - type: ip address
      - name: mytg
      - protocol:http, port: 8080
      - ip address: IPv4
      - VPC: default
      - helathcheck: /LoginWebApp-1/
      - next
      - ip address > ports: 8080 > next > create
      
    - select load balancer > **application load balancer**
      - create
      - name: dev-lb
      - scheme: internet-facing
      - Availabiliity zones: select all
      - security groups: create new
        - new=sg
        - default vpc
        - allow all ports or just 8080
      - listeners adn routing, **http** and port **8080**
      - target group: **mytg**
      - **create load balancer** button
      - in target no target is selected because we ECS will configure targes automatically
     
14. got to ecs
    - 

