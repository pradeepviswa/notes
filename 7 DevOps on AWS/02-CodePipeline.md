# Code Pipeline

- Deployment: when our goal is to deploy an applicaiton. deploy any project on
    - ECR (like dockerhub)
    - ECS Fargate
    - Cloud formation
    - Teraform deploy to AWS
- Continuous Integration: when focus only on build +  testing the code
- Automation:
- custome pipeline

# build custom pipeline
- enter pipeline name
- exeuction maodes
  - superseded:
    - develper pushed code to github. build triggered.
    - developer 2 also pushed the code. previous build will be terminated and developer2's new build will start.
  - queued (for test and dev env)
    - developer1 pushed the code
    - developer2 also pushed the code, this will wait in queue. it will start when developer1 code is built.
    - execution runs one-by-one in order.
  - parallel (for production. cost is high)
    -  developer1 code and developer2 codes, both will build at the same time.
    -  multiple runs at the same time.
   
# serivce role: 
new role: this will create a new role in IAM

# add source storage
- for docker image select amazon ECR
- select github (via o-auth app) for current scenario
- click on github authorize aws button. 
- after authorization it will show all repos, select oru repo "**apachewebsite**"
- branch: master

# skip build step
becasue tyhis build step will be included later in pipeline.

# add deploy stage
- Deplopy provider: elastic Beanstalk
- select test-app  created below using beanstalk

- settings : service role : elasticbeansetalkfullpermission : add permission

#### what is elastic beanstalk
- deploy the applicatio without worring about infrastructure like ec2, security group, load balancer, Autop scalign group, etc.
- AWS will servers, scaling, load balacing, deployment.
- configure cloud watch
- create security group

# select elastic beanstalk
- environment tier: we server environment
- Applicatiion name: test-app
- domain: apacheapp (check avialability)
- platform: PHP
- Applicaiton code: sample applicaiton (becuase app git location will be selected later in separate stage)
- Presets: single intance (9free tier elibile)
- Next
- create a role, new role. trust entitiy type: AWS service
- **setup network ing database tags**
    - select enable public ip
    - select all availablity zones
- General purposse ssd


# lab
Create pipeline
<img width="293" height="206" alt="image" src="https://github.com/user-attachments/assets/dacc93df-1c85-4e6b-bd75-c3923764c880" />
custrom pipeline
<img width="676" height="239" alt="image" src="https://github.com/user-attachments/assets/45d0fa25-4c55-4873-a28c-4556e191f7ac" />
pipelien name. role name will auto populate
<img width="670" height="618" alt="image" src="https://github.com/user-attachments/assets/2b4d9e2f-15f0-4e57-9fc8-ea297e9635ee" />
GitHub via oAuth app. 
<img width="666" height="445" alt="image" src="https://github.com/user-attachments/assets/593f9c5b-c130-40ce-a28c-f41dd02e24f8" />
connec GitHub. Authorise AWS-codesuit
<img width="608" height="640" alt="image" src="https://github.com/user-attachments/assets/3596867c-1068-430e-a704-671386ac89b8" />
Aithorise - confirm
<img width="601" height="661" alt="image" src="https://github.com/user-attachments/assets/fe3f164c-bf06-453b-a61f-861405e904bd" />
select  branch
<img width="601" height="661" alt="image" src="https://github.com/user-attachments/assets/2e736309-09ff-483a-9532-b1db941e923b" />
skip build stage
<img width="669" height="299" alt="image" src="https://github.com/user-attachments/assets/9dd626d7-416d-4aad-a9f3-bd8dbc058075" />
skip test stage
<img width="655" height="262" alt="image" src="https://github.com/user-attachments/assets/9421450a-b091-4740-8206-509e6d24032f" />
deploy - AWS Elastic Beanstalk

### deploy the sample php application on elastic beanstalk

- open elastic beanstalk in new tab and "create applicaiton"
- <img width="1156" height="226" alt="image" src="https://github.com/user-attachments/assets/7881d6d8-9b06-4938-bf35-1a542f808694" />
- configure env as below
- <img width="886" height="850" alt="image" src="https://github.com/user-attachments/assets/bc54e180-cb1f-439c-b497-6f10895cad56" />





