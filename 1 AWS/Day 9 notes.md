# route 53

# create a bucket - www.abcdtracel123.com
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

# add index.html and enable public access
<img width="810" height="490" alt="image" src="https://github.com/user-attachments/assets/806720fc-dfa8-428a-be73-f8420c1ab4f5" />

# enabel Static website hosting
- bucket-|> www.abcdtracel123.com  -> Static website hosting -> edit -> enable
- <img width="614" height="591" alt="image" src="https://github.com/user-attachments/assets/8970c33e-9555-455e-a8e7-f862f9894b82" />

# add bucket policy
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

# create a hosted zone
- route 53 -> create hostesd zone
- <img width="456" height="392" alt="image" src="https://github.com/user-attachments/assets/c307bac7-7421-4725-9dc1-ee3b1df6c509" />
- <img width="1335" height="413" alt="image" src="https://github.com/user-attachments/assets/44e5bd82-d961-410f-9ed0-c25f114a5337" />


  

