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
