# route 53

# create a bucket - www.abcdtracel123.com

## add index.html and enable public access
<img width="810" height="490" alt="image" src="https://github.com/user-attachments/assets/806720fc-dfa8-428a-be73-f8420c1ab4f5" />

## enabel Static website hosting
- bucket-|> www.abcdtracel123.com  -> Static website hosting -> edit -> enable
- <img width="614" height="591" alt="image" src="https://github.com/user-attachments/assets/8970c33e-9555-455e-a8e7-f862f9894b82" />

## add bucket policy
- bucket -> permission -> bucket policy -> edit
```
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Sid":"AddPerm",
         "Effect":"Allow",
         "Principal":"*",
         "Action":["s3:GetObject"],
         "Resource":"arn:aws:s3:::www.abcdtracel123.com/*"
      }
   ]
}
```

# Route 53
## create a hosted zone
- route 53 -> create hostesd zone
- <img width="456" height="392" alt="image" src="https://github.com/user-attachments/assets/c307bac7-7421-4725-9dc1-ee3b1df6c509" />
- <img width="1335" height="413" alt="image" src="https://github.com/user-attachments/assets/44e5bd82-d961-410f-9ed0-c25f114a5337" />


## Create 'A-Record' to point DNS name to S3 bucket
- Got to hosted zone -> Create Record ->
- if website is hosted in any ec2/VM image then enter public ip of that server
- <img width="503" height="404" alt="image" src="https://github.com/user-attachments/assets/26c74bbc-85b0-48ca-b3f4-e8a793a83f6e" />
- In our case we are using s3 bucket so use below settings. Alias -> route traffic to s3 -> region us-east-1 -> s3 endpoint will appear automatically, select and Create Record.
- <img width="1647" height="534" alt="image" src="https://github.com/user-attachments/assets/3522a2c5-380a-4c95-a491-9b677216f0e4" />



  



