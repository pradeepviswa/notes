# port expose

- 8080 is port of host machine
- 80 is port exposed inside container
```
docker run -it -p 8080:80 ubuntu /bin/bash
```

#### commands run inside container
```
apt update -t
apt install apache2 -y
service apache2 start
apt install git -y
rm -rf /var/www/html/index.html
git clone https://github.com/pradeepviswa/apachewebsite.git /var/www/html/

```
