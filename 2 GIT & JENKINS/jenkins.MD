# JENKINS

# USER MANAGEMENT
## for access management install role based authtication plugin
Role-based Authorization Strategy 
SECURITY -> AUTHORIZATION  = ROLE BASED STRAGERY
got to MANAGE AND ASSIGN ROLE to create role, set permission and add users in it

# create a freestyle job

## trigger  
1. github webhook: if there is a commit, job trigger message will be sent to jenkins to trigger the job 
2. Poll SCM: Jenkins will keep on checking any new commit made or not
3. scheduled jobs: after a certain period of time, job will automaticacly trigger    
4. trigger via scrip: create custom script to connect jenkisn and trigger the job


### webhook - only 2 changes
1. in githuib repo, settings -> webhook -> new webhook -> 
   address of jenkins server liek this: http://13.200.37.86:8080/github-webhook/
   choose "Send me everything."
2. In Jenkins,
   job -> configure -> 
     Source Code Management -> add git repo URL
     Triggers -> GitHub hook trigger for GITScm polling
   


