#### why own image
- Application has some dependencies without which application won't work.
- Installing pre-requisite steps everytime on base image is not advisable.
- create a new image with all pre-requisites installed

#### how to build an image
- use Dockerfile
- it is a text file with some set of commands
- command
```
docker build -t myimage .
docker run -it --name c01 myimage /bin/bash
```


#### docker file instruction
```
FROM: base image path
RUN: run some command in image while loading
COPY: copy some file inside image
MAINTAINER: here put name of person who udpated thsi docker file
EXPOSE: port on which applicaiton is exposed by developer
CMD: sets the default command that runs when the **container starts**
ENTRYPOINT: same as CMD, it sets the main command that always runs
```

#### docker file example: vi Dockerfile
```
# Dockerfile
FROM ubuntu
MAINTAINER pradeep.viswa@gmail.com
RUN apt update -t
RUN apt install apache2 -y
RUN apt install git -t
RUN rm -rf /var/www/html/
RUN git clone https://github.com/pradeepviswa/apachewebsite.git  /var/www/html/
# COPY config.xml /var/www/html/ # config.xml should be present in local vm
```
#### build and run
```
#build cmd
docker build -t apache1 .

# run container
docker run -dt -p 1234:80  img1

# connect container
docker exec -it 00fcfa353e2c /bin/bash

# start apache service
service apache2 status

# website: http://34.201.209.30:1234/
```


#### updated docker file with CMD and ENTRYPOINT
```
# Dockerfile
FROM ubuntu
MAINTAINER pradeep.viswa@gmail.com
RUN apt update -t
RUN apt install apache2 -y
RUN apt install git -t
RUN rm -rf /var/www/html/
RUN git clone https://github.com/pradeepviswa/apachewebsite.git  /var/www/html/
CMD ["apache2ctl", "-D", "FOREGROUND"]
#👉 CMD = default (can change). can have multiple CMDs
#👉 ENTRYPOINT = fixed (always runs). can have only one ENRYPOINT
# COPY config.xml /var/www/html/ # config.xml should be present in local vm
```


