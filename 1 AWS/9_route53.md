# route 53 - register DNS name for s3 website and browse it

## pre-requisites
- s3 bucket should be present
- Bucket name exactly matches your domain name
- bucket name: my-bucket-demo-1919.com
- Allow public access


## add index.html and enable public access
<img width="810" height="490" alt="image" src="https://github.com/user-attachments/assets/806720fc-dfa8-428a-be73-f8420c1ab4f5" />

## enabel Static website hosting
- Amazon S3 > Buckets > www.my-bucket-demo-1919.com > Properties > Static website hosting -> edit -> enable
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
         "Resource":"arn:aws:s3:::my-bucket-demo-1919.com/*"
      }
   ]
}
```

# Route 53 Configure
## create a hosted zone
- Route 53 > Get started > create hostesd zone
- Domain name: my-bucket-demo-1919.com
- Type: Public hosted zone > Create hosted zone
- <img width="1353" height="412" alt="image" src="https://github.com/user-attachments/assets/af6e9d2d-048d-45ba-8e63-4706eff3696c" />


## Create 'A-Record' to point DNS name to S3 bucket
- Got to hosted zone -> Create Record ->
- if website is hosted in any ec2/VM image then enter public ip of that server
- <img width="503" height="404" alt="image" src="https://github.com/user-attachments/assets/26c74bbc-85b0-48ca-b3f4-e8a793a83f6e" />
- In our case we are using s3 bucket so use below settings. Alias -> route traffic to s3 -> region us-east-1 -> s3 endpoint will appear automatically, select and Create Record.
- <img width="1350" height="512" alt="image" src="https://github.com/user-attachments/assets/9bf81d45-b9cd-4963-a389-486aeb60df87" />


## next steps
- Creating a hosted zone in Amazon Route 53 is not enough.
- Your domain registrar must point to Route 53.
- Now check where you bought the domain
```
GoDaddy
Namecheap
Google Domains
etc.
```
- Check in Route 53 → Hosted Zone → NS record
```
ns-1371.awsdns-43.org
ns-97.awsdns-12.com
ns-672.awsdns-20.net
ns-1585.awsdns-06.co.uk
```

  


  








