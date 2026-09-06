# integrate Microsoft Entra ID with AWS
> https://github.com/riteshbehal/Aws-Solution-Architect/blob/main/IAM%20Labs/IAM%20IDENTITY%20CENTER.pdf

- Microsoft AD
  - Azure Account
    - users groups
   
- In AWS
  - MS User should be able to use AWS resources
 
#### Common settings
- Misifit AD cretes azure-metadata file, this has to be up;loaded to AWS.
- Same way generate AWS-metada file and upload it in Mirosoft AD
- thsi synching is d one by URL Token.

### Microsoft AD crate 
- Enterprise application
  - create users groups

#### In AWS
- create AWS Identity Center
- I `don't` want to create `IAM usrs and groups` in AWS


<img width="881" height="477" alt="image" src="https://github.com/user-attachments/assets/7b41e344-2bba-44d7-a53e-d009b64b00e1" />

1. In Azure got to `enterprise applicaitons` and create one `demoapp`
   <img width="370" height="276" alt="image" src="https://github.com/user-attachments/assets/36f81c50-f590-4342-8587-b8a9f6284b21" />
2. create 3 users
  - appuser1, appuser2, appuser3
3.  In AWS lopen `IAM Identity Center`
    - enable
    - single region
    - enable
    - <img width="1102" height="137" alt="image" src="https://github.com/user-attachments/assets/7e6aa498-6e19-414e-bad6-37d53fa0d412" />
    - here you can users inleft pane, we want azure users to appear here
    - go to settings
    - actions
      - change identity source
      - select EXTERNAL
      - next
      - download metadata file. it has got sensitive information. this file we will upload in azure side
    - demoapp-t | Single sign-on
  4. go back to Azure
    - demoapp-t | Single sign-on
    - SAML
    - upload aws-medata file > save
    - <img width="965" height="281" alt="image" src="https://github.com/user-attachments/assets/e6cfcaed-5652-4d28-a103-6baf7e18d56a" />
    - download `Federation Metadata XML`
  5. go back to AWS. IAM Identity Center -> Settings -> Change identity source
    - upload azure-metadata
    - <img width="460" height="252" alt="image" src="https://github.com/user-attachments/assets/e647724c-124e-4d86-b295-6a946a8c5292" />
    - next
    - change identity source
    - <img width="1580" height="782" alt="image" src="https://github.com/user-attachments/assets/9752e7ef-35a0-4d56-8936-ab746132c674" />


    
    



  
