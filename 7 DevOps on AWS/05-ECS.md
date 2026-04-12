# ECS
Fully manged container orchestration service provided by AWS that helps to run, manage and scale Docker containers.

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
aws 
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
browse: http://publicip:8080

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


