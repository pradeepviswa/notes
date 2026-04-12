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


# lab scenario
<img width="1220" height="636" alt="image" src="https://github.com/user-attachments/assets/48909150-e524-48f6-aedb-b535850f5c57" />


