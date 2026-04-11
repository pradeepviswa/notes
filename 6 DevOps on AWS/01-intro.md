# DevOps on AWS
- This is related to CI/CD pipeline in AWS.
- code commit is provided by aws. github offerend my microsoft.
- code pushed to code commit.
- in code commit, use code build. it is AWS resource used to build to build the project.
- for container app, use ECS service which used docker
- use EKS, it si managed k8s service offerend by AWS
- use Elastic **Beanstalk** to deploy applicaiton
<img width="935" height="500" alt="image" src="https://github.com/user-attachments/assets/90072038-febb-47f2-808f-112a0687f7ad" />


# what are the tools in AWS DevOps
- **Code Pipeline**: it is CI/CD tool. like Jenkins. Push code to github or code commit and pipeline will trigger build and deploy steps
- **Code Build**: it is a build tool. like maven. it compile code, perform test cases, create artifact
- **Code Deploy**: it is deploy tool. deploy to EC2 or lambda or ECS. supports rollign updates, blue green deployment, etc
  - we create 2 envs, blue and gree
  - blue: prod
  - green: testing
  - after testing route traffic from green to blue env 
- **AWS code Commit**: it is version control tool. like github.
- **Cloud Formation**: it is IaC (infra as code) tool. like terraform. write code in yaml of json.
- **Amazon ECS**: AWS natice containerization and orchestration tool. like docker and docker swarm. It can do container management also. deploy an app inside acontainer, if new container needdd, can be configured here. it is for AWs natice only.
- **EKS**: Elastic Kubernets SAerviec. its uses k8s internally. It is AWs Managed Service.

 
