# docker volume

#### Meaning
- persistant storage is a directory which resides outside container
- if container is deleted or not running, data will remain safe

#### show existing volumes
```
docker volume ls
```
#### create volume
```
docker volume create vol1
```

#### create a container and map a directory of conatiner with docker volume
```
docker run -it -v vol1:/logs ubuntu /bin/bash
ls 
# map vol1 with /logs directory
# logs will automatically be created in root folder
cd logs
touch file1 file2
exit # stop without saving and 
docker rm <contID>

```
#### see all the details of volume vol1
```
docker inspect vol1
check mountpoint
cd to mountpoint dir and run ls. all files created inside container will be present here.
```
#### mount same volume in new container and check data
```
docker run -it -v vol1:/log2 ubuntu /bin/bash
# files will be present in /log2 folder.
```
#### Use Docker’s read-only mount flag :ro when attaching the volume.
```
docker run -it -v vol1:/log2:ro ubuntu /bin/bash
```
#### More advanced mount options (recommended method)
```
docker run -it \
  --mount source=vol1,target=/log2,readonly \
  ubuntu /bin/bash
```

| Option | Meaning               |
| ------ | --------------------- |
| `ro`   | Read-only             |
| `rw`   | Read-write (default)  |
| `z`    | Shared SELinux label  |
| `Z`    | Private SELinux label |
