## Route 53

It is DNS service of AWS

DNS resolver is with service provider.



### compare domain price

Route 53

abctravel123.com \[search]



godaddy.com

abctravel123.com \[search]



compare, here godaddy is cheaper



### domain in godaddy and server in AWS - configure



#### website in s3 bucket

&nbsp;s3 -> www.abctravel123.com -> ACL allow

&nbsp;add index.html file \& grant public access

&nbsp;

&nbsp;inside bucket -> properties -> scroll down search for "Static website hosting" -> Enable it

static web site endpoint will be used later

permission -> bucket policy -> edit -> paste below policy and save changes

```
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Sid":"AddPerm",
         "Effect":"Allow",
         "Principal":"*",
         "Action":["s3:GetObject"],
         "Resource":"arn:aws:s3:::www.abctravel123.com/*"
      }
   ]
}

```

#### 

#### create route 53

route53 -> get started -> create a hosted zones

domain name: www.abctravel123.com

type: public hosted zone

click on created hosted zone



this will Name Server

value/route traffic to will show 4 dns servers.

if you purchased domain from godaddy.com then add these 4 NSs in godaddy's DNS management settings



#### link s3 bucket with route-53

In NS screen, click n create record

record type: A record

value: if you have web server, mention server IP here. In current example, we have used s3 bucket, so this field will remain blank

on: Alias

Route traffic to: alias to s3 website endpoint

region: n. Virginia

S3 Endpoint: select from dropdown (appear if static web hosting is enabled)

click on Create record.





geo location routing policy

latency based routing policy

failover routing policy - this needs health check

