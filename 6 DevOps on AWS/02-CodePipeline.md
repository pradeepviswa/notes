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





