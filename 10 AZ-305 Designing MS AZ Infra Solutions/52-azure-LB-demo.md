# LB Demo
<img width="935" height="446" alt="image" src="https://github.com/user-attachments/assets/46cf7151-848d-4d5d-be64-a2885580ec53" />

### VMs
- create 2 VMs, port 3389 and 80 allow
- select an extension to install un adavces option
- for this we need storage account where script will be saved
- save a powershell script which installs
  ```
  install-windowsfeature -name web-server
  ```


### disassociate publicip from VMs
- LB communciates with private IP
- servers do no need to have public ip
- each VM -> settings, network, ip configuraiton, disassicate public ip address
- delete them from `public ip` list

### load balancer
- in azure search for `load balancer` or standard load  balancer
- create load  balancer
- standard load balancer
- select RG, region central india, SKU `standard` , Type `public`, tier `regional`
- frontend ip: Add front ip ip config, Name `frontendip1`, IP Version `ipv4`, publi cip address `create a new one`
- backend pool: name `backednpooldemo1`, VNET `central india`, add server `web1 and web2`
- review + create

<img width="952" height="571" alt="image" src="https://github.com/user-attachments/assets/4942e898-f05a-4b5c-997c-b023965d41d6" />


