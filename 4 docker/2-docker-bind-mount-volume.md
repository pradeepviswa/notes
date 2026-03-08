# Bind Mount Volume

#### bind command
```
--mount type=bind,src=/var/run/docker.sock,dst=/var/run/docker.sock
```
**Here:**

1. type=bind → bind mount
2. src=/var/run/docker.sock → file on host
3. dst=/var/run/docker.sock → mounted inside container
