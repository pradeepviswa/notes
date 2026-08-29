
```
docker pull httpd:latest
docker run -dt -p 8080:80 --name webapp httpd:latest
```

#### test website
https://publicip:8080

#### configure own website
```
docker exec -it webapp /bin/bash
apt update -y
apt install git -y
cd htdocs
rm -rf /usr/local/apache2/htdocs/index.html
git clone https://github.com/pradeepviswa/apachewebsite.git .
git clone  https://github.com/pradeepviswa/apachewebsite.git /usr/local/apache2/htdocs
# press ctrl+pq
```

#### Pull Jenkins image
```
docker pull jenkins/jenkins:latest
docker run -d -p 9090:8080 jenkins/jenkins:latest
```
