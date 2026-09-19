# Virtual Machine Scale Set (VMSS) Demo
Create, manage and automatically scale a out of virtual machines

### architecture
<img width="492" height="341" alt="image" src="https://github.com/user-attachments/assets/6ffe6fb6-149a-4dc0-9751-68bd607cb2ea" />

### Policiy
- `Manual policy`: user will have to increase VMs manually. not recommended.
- `Dynamic policy`: evaluate rule during runtime and increase VM count.
- `schedule based`: define start and end time when to increase VM count.
- `predictive scaling`: using soem algo, cloud figure out network traffic pattern and then azure creates a policy for you


### capacity
- define `minimum` number of VMs
- define `maximum` number of VMs
- Currnet VMs - how many are running
