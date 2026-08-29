# Bind Mount Volume

#### bind command
```
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock
```
**Here:**

1. type=bind → bind mount
2. src=/var/run/docker.sock → file on host
3. dst=/var/run/docker.sock → mounted inside container


#### Example mount a file
```
docker service create \
  --name=viz \
  --publish=8080:8080 \
  --constraint=node.role==manager \
  --mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock \
  dockersamples/visualizer
```
#### Example mount a directory
```
docker run -it \
--mount type=bind,src=/tmp/,dst=/tmp/tmp-pradeep \
--name c03 ubuntu /bin/bash
```
