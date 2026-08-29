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
- trainer document: https://docs.google.com/document/d/1VLk5pPKyWzYz7sNHx_9nwZQM9nJeo7jb/edit?usp=sharing&ouid=103157204066713600014&rtpof=true&sd=true
- Create pipeline
- <img width="293" height="206" alt="image" src="https://github.com/user-attachments/assets/dacc93df-1c85-4e6b-bd75-c3923764c880" />
- custrom pipeline
- <img width="676" height="239" alt="image" src="https://github.com/user-attachments/assets/45d0fa25-4c55-4873-a28c-4556e191f7ac" />
- pipelien name. role name will auto populate
- <img width="670" height="618" alt="image" src="https://github.com/user-attachments/assets/2b4d9e2f-15f0-4e57-9fc8-ea297e9635ee" />
- GitHub via oAuth app. 
- <img width="666" height="445" alt="image" src="https://github.com/user-attachments/assets/593f9c5b-c130-40ce-a28c-f41dd02e24f8" />
- connec GitHub. Authorise AWS-codesuit
- <img width="608" height="640" alt="image" src="https://github.com/user-attachments/assets/3596867c-1068-430e-a704-671386ac89b8" />
- Aithorise - confirm
- <img width="601" height="661" alt="image" src="https://github.com/user-attachments/assets/fe3f164c-bf06-453b-a61f-861405e904bd" />
- select  repo and branch
- <img width="810" height="721" alt="image" src="https://github.com/user-attachments/assets/68cfc10e-8cec-48bf-80e0-6b3ce79c00fb" />
- skip build stage
- <img width="669" height="299" alt="image" src="https://github.com/user-attachments/assets/9dd626d7-416d-4aad-a9f3-bd8dbc058075" />
- skip test stage
- <img width="655" height="262" alt="image" src="https://github.com/user-attachments/assets/9421450a-b091-4740-8206-509e6d24032f" />
- deploy - AWS Elastic Beanstalk

### deploy the sample php application on elastic beanstalk

- open elastic beanstalk in new tab and "create applicaiton"
- <img width="1156" height="226" alt="image" src="https://github.com/user-attachments/assets/7881d6d8-9b06-4938-bf35-1a542f808694" />
- configure env as below
- <img width="1318" height="856" alt="image" src="https://github.com/user-attachments/assets/1bc4d2f1-868e-4908-96e5-19e7b1fc8b48" />
- under eac role, create a new role with default value
- <img width="1342" height="423" alt="image" src="https://github.com/user-attachments/assets/303d6b45-564e-4386-85a2-8e1411092488" />
- enable public ip and select all AZs
- <img width="1085" height="694" alt="image" src="https://github.com/user-attachments/assets/91cef579-6a2e-4b84-ac1a-e19445252760" />
- select **general purpose 3 SSD **
- <img width="1093" height="246" alt="image" src="https://github.com/user-attachments/assets/957d8e40-51f7-4fdb-92f5-ad6efffdc916" />
- 2 times next button with default values and then **create**
- <img width="1093" height="246" alt="image" src="https://github.com/user-attachments/assets/7b796ff6-62ef-4771-a8c9-432a1cdbd063" />

### move back to code pipeline and we will deploy the code to the elastic beanstalk 
- select beanstalk app newly created
- <img width="647" height="741" alt="image" src="https://github.com/user-attachments/assets/37a50627-8daa-4e85-9a0e-716f1ebf7d48" />
- create pipeline
- <img width="632" height="391" alt="image" src="https://github.com/user-attachments/assets/701f3ac9-f900-4c55-9d10-d507ad28105c" />


> Deployment  WILL FAIL. Lets solve the issue:If the Deployment fails this is because the IAM role does not have elastic beanstalk full permission. Select code pipeline and check the role attached to it…and now go to iam and search for the role and attach that specific role
- click on Settings -> click on service role ARN
- attach policies
- <img width="1324" height="239" alt="image" src="https://github.com/user-attachments/assets/84763899-b9b9-4bc9-a29e-d56135e09dd3" />
- assign permission: AdministratorAccess-AWSElasticBeanstalk
- <img width="400" height="184" alt="image" src="https://github.com/user-attachments/assets/303b0be1-1855-4b90-9303-64c61ba81792" />
- new permission list
- <img width="619" height="285" alt="image" src="https://github.com/user-attachments/assets/b7c1a997-d69c-4d26-b78d-c4318540177b" />
- Retry the failed stage
- <img width="643" height="311" alt="image" src="https://github.com/user-attachments/assets/848c3e63-c4d8-406e-9764-42ad55f9e527" />
- go back to beanstalk and click on domain url
- <img width="633" height="223" alt="image" src="https://github.com/user-attachments/assets/27c8ee7e-08e7-4338-9958-dd7315074e06" />
- wesite will open
- <img width="1005" height="400" alt="image" src="https://github.com/user-attachments/assets/a068893a-f217-4f15-97c0-5990497474d5" />
- if we update anything in the github repo automatically my pipeline should trigger: https://github.com/pradeepviswa/apachewebsite
- <img width="841" height="656" alt="image" src="https://github.com/user-attachments/assets/74ae2a40-a197-4fd5-9730-c5fc5fee38d3" />
- <img width="632" height="286" alt="image" src="https://github.com/user-attachments/assets/91f0be91-d3c9-41d6-9357-a12f5f11b8eb" />



















