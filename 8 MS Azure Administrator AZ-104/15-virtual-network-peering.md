# Virtual Network Peering

> This allows communication between 2 VNets.
> this is also called **intesite connectivity**.
> we can have revional peering (same region)  and global peering (different regions).


# plan
<img width="761" height="422" alt="image" src="https://github.com/user-attachments/assets/58e6e19a-bdd2-459e-b1e0-68f845daada3" />
<br>
https://learn.microsoft.com/en-us/azure/virtual-network/tutorial-connect-virtual-networks?tabs=portal

# steps
> create virtual network in same resource group and in same region
```
name: vnet1
subnet: subnet-1
range: 10.0.0.0/24

name: vnet2
subnet: subnet-2
range: 10.1.0.0/24
```
<br>
vnet - settings - peering - add <br>
<img width="1347" height="637" alt="image" src="https://github.com/user-attachments/assets/79c244bf-9edc-475b-9923-bb64d6d3ad34" />
<br>
<img width="1203" height="596" alt="image" src="https://github.com/user-attachments/assets/856f8b70-00b2-4520-b6b3-5b206dadb4af" />
<br>
Name - vnet 1 to vnet 2 <br>
<img width="1027" height="606" alt="image" src="https://github.com/user-attachments/assets/76038c01-7f03-4d62-ba99-8acbeba5ce1a" />
<br>
vnet 2 to vnet1
<img width="1103" height="605" alt="image" src="https://github.com/user-attachments/assets/2cc14d96-5ae0-4aec-9e85-713a30f91408" />
<br>
<img width="1385" height="427" alt="image" src="https://github.com/user-attachments/assets/231eae5b-ae25-4167-95b0-c7ef45246ee5" />
<br>

# create one vm in vnet1 and one vm in vnet2 and try to ping them

