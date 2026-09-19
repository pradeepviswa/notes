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


### orchestration
- Flexible Orchestration: `different configuration` for new VMs
- Uniform Orchestration: `same configuraiton`  for new VMs


### Open VMSS
1. create VMSS
2. select: rg, region: `Central India`, zone `choose 2 for free tier account`
  <img width="397" height="37" alt="image" src="https://github.com/user-attachments/assets/a58aa882-98da-4642-9c99-fcc455989b70" />
4. orchestration mode: flexible
5. select VM sizes
  <img width="407" height="97" alt="image" src="https://github.com/user-attachments/assets/f94b4584-62f8-41bf-97ad-c4a491dcacc9" />
6. Allocation strategy: pricing `lowest first`, optimizign `low config first`, prioritizing the size
  <img width="517" height="107" alt="image" src="https://github.com/user-attachments/assets/865a0ab8-eead-4c8e-9285-2162f6f9e3b0" />
7. scaling configuraiton
  <img width="386" height="547" alt="image" src="https://github.com/user-attachments/assets/8ec9179b-62f2-42ea-96ed-c85c6e35de2c" /> <br>
  <img width="672" height="107" alt="image" src="https://github.com/user-attachments/assets/2bd418a0-e310-447f-bcde-e230493f7517" />

9. summary
   <img width="532" height="487" alt="image" src="https://github.com/user-attachments/assets/dcbe4663-f893-475e-be66-163ae79f2ab2" />




