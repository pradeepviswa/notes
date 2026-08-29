# Network Virtual Appliance (NVA)

> it is a **virtual machine**.
> it is like a proxy or jump server which allwos connection with many other  networks.
> it is used to securily route the traffice securily. it goes through firewall and traffic routing, VPN, etc.
> create multiple subnets - 4 subnets.
> create subnet for bastion network.

https://learn.microsoft.com/en-us/azure/virtual-network/tutorial-create-route-table?tabs=portal
<br>

<img width="666" height="558" alt="image" src="https://github.com/user-attachments/assets/c414f52e-6033-4129-82d4-66e124dfe881" />

<br>

DMZ we create NVA <br>
<img width="957" height="626" alt="image" src="https://github.com/user-attachments/assets/4fc40cfe-f904-47e8-b75a-72047d9073e4" />

<br>
create 4 subnets <br>
other than document + <br>
<img width="1046" height="606" alt="image" src="https://github.com/user-attachments/assets/11ba3ba3-434c-43aa-9c88-282069e47346" />

<br>
all subnets <br>
<img width="953" height="547" alt="image" src="https://github.com/user-attachments/assets/bd22f69a-a9b2-42a4-a313-2eb2929f13a5" />
<br>
using /16 we have created 4 subnets <br>

wait for this to create before going on with bastion creation <br>
<img width="1010" height="491" alt="image" src="https://github.com/user-attachments/assets/6f4cd5d4-cd26-4795-9093-a586eec4118b" />

<br>
create bastion <br>

<img width="1056" height="292" alt="image" src="https://github.com/user-attachments/assets/ddc5f7a1-2cae-4c8e-a0ad-ce243a584519" />
<br>
same resource group <br>

<img width="1060" height="605" alt="image" src="https://github.com/user-attachments/assets/498e581c-f2de-46fe-a2e5-531f50dd7e46" />


<br>
Thsi will take 10 mins approx <br>

# cereate Virtual Machine now for NVA
create ubuntu vm. use same resource group. <br>
public inboud not needed <br>
<img width="945" height="582" alt="image" src="https://github.com/user-attachments/assets/586edd19-2285-46ce-9485-18ebc4ab4c18" />
<br>
create new network security group <br>
<img width="991" height="641" alt="image" src="https://github.com/user-attachments/assets/87a1b16c-eec9-4913-833a-c83cab1aafa1" />

<br>
# create 2 more VMs, one in public subnet other in private subnmet
<img width="1117" height="586" alt="image" src="https://github.com/user-attachments/assets/46207321-4787-47c9-8861-f4f79b612e3c" />

<br>
network <br>
NSG - None <br>
public ip - none <br>

**3rd vm ** <br>
<img width="998" height="577" alt="image" src="https://github.com/user-attachments/assets/3e36e953-1835-450b-9346-deef2cd9d042" />
<br>
<img width="963" height="615" alt="image" src="https://github.com/user-attachments/assets/7b9f24a0-e6f8-4cd4-a8de-40e504c81ffb" />
<br>

# enable ip forwarding
Because via NVA we have to connect other VMs <br>

<img width="1087" height="592" alt="image" src="https://github.com/user-attachments/assets/7927c3ee-d1aa-46ac-9500-b18ade962dac" />
click on network interface card > ip configuraiton > enabel ip formwarding
<br>
<img width="1355" height="631" alt="image" src="https://github.com/user-attachments/assets/65b48f33-e27b-4dee-a25d-fe6113cc450f" />


# ip forwardign in OS as well


vm > operations  > run command
<img width="372" height="436" alt="image" src="https://github.com/user-attachments/assets/ef0715f7-0a3d-4a16-b36a-1b10b290aff2" />
<br>
<img width="806" height="226" alt="image" src="https://github.com/user-attachments/assets/c721b83f-1537-4d93-8b4f-0d681faf19a8" />
<br>
restart the nva vm.
<br>

# create rouyte table to route the traffice
search for route tebale
<br>
<img width="992" height="631" alt="image" src="https://github.com/user-attachments/assets/06d5728b-9cf8-47fc-8977-55aafcf96256" />
<br>
<img width="841" height="483" alt="image" src="https://github.com/user-attachments/assets/20be5052-8d23-4390-9e2d-b6d75e8aeac5" />
<br>
add route table
<br>
<img width="1367" height="653" alt="image" src="https://github.com/user-attachments/assets/bc43c366-0916-4496-9bc5-79b461ff4b4f" />
<br>
add subnet
<br>
<img width="1218" height="701" alt="image" src="https://github.com/user-attachments/assets/933a8a0d-ab5b-418c-8f7a-76cd0872b964" />


# now do the testing
connect public vm via bastion <br>
<img width="1300" height="621" alt="image" src="https://github.com/user-attachments/assets/bf091482-6080-45bd-994f-154cd24f8633" />
<br>
connected <br>
<img width="1115" height="582" alt="image" src="https://github.com/user-attachments/assets/43d3ef15-7bd1-44ee-91af-253367e8ac39" />
<br>

```
tracepath vm-private
```
<br>
traffice is going via nva machine
<br>
<img width="587" height="140" alt="image" src="https://github.com/user-attachments/assets/9dd485a4-6818-4321-89a1-8bbd8733d7fc" />
<br>
so here we have learned vm-public and vm-private are not directly connected and are in 2 different networks. they both are connecting each other via nva vm.









