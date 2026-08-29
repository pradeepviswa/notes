# Build Projects
- build steps are written here: https://github.com/pradeepviswa/apachewebsite/blob/master/buildspec.yml
- in previouse steps we configured 1 stage, i.e., Deploy
- now we will add Build step before Deploy happens
- current situation
- <img width="1033" height="416" alt="image" src="https://github.com/user-attachments/assets/91798937-8779-4f59-9a55-2504a9c3bb16" />


# lab
- trainer document: https://docs.google.com/document/d/1VLk5pPKyWzYz7sNHx_9nwZQM9nJeo7jb/edit?usp=sharing&ouid=103157204066713600014&rtpof=true&sd=true
- got to **Code Build**
- create project
- <img width="1901" height="314" alt="image" src="https://github.com/user-attachments/assets/53bb8024-8684-4d27-bec8-546edebb6cf3" />
- add name and project type
- <img width="518" height="317" alt="image" src="https://github.com/user-attachments/assets/2d175b4b-2a54-413e-82ec-609ccdc8a2c6" />
- source: github
- <img width="1100" height="435" alt="image" src="https://github.com/user-attachments/assets/b1afc38b-e766-4bb1-832f-606c938d73eb" />
- click on **manage account credential** and establish connection
- <img width="1340" height="327" alt="image" src="https://github.com/user-attachments/assets/625183c3-edca-4cb8-8939-350e43a18bef" />
- <img width="980" height="381" alt="image" src="https://github.com/user-attachments/assets/aa1e0f75-43c2-4495-9ade-dcc69492b921" />
- and configure as below
- <img width="1088" height="364" alt="image" src="https://github.com/user-attachments/assets/268bc0f2-c8fb-439d-b953-3f07ece748c2" />
- primary source web hook event
- <img width="820" height="403" alt="image" src="https://github.com/user-attachments/assets/6cb61d86-2c8d-46f9-ab04-9878a238002a" />
- select new role and configure buildspec as below
- <img width="1095" height="555" alt="image" src="https://github.com/user-attachments/assets/69b5cba0-f817-44d2-870e-f7430618962a" />
- ENvironment
- <img width="480" height="457" alt="image" src="https://github.com/user-attachments/assets/5e05764d-3f90-4a73-9a23-f64a514809b3" />
- click on "Create Build Project"
- <img width="821" height="327" alt="image" src="https://github.com/user-attachments/assets/46e4f141-d218-4fb5-af00-a674a8f216af" />
- click on start build
- <img width="1374" height="92" alt="image" src="https://github.com/user-attachments/assets/49fa3b57-8d71-4ab4-80e5-3921b5bb15b7" />
- build result
- <img width="1331" height="792" alt="image" src="https://github.com/user-attachments/assets/11541dff-5be9-4a53-af88-68de93469c01" />
