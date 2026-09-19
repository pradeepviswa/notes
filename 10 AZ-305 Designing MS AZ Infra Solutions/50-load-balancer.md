# Load balancer
Mainly for: 
- distribution of traffic
- health check, fwd traffic to healthy instances

#### instance auto scaling is done by
VMSS - Virtual Machine Scale Set <br>
equivalent to auto scalign group in AWS <br>
we can have multiple instances with different cpu and ram configuraiton

#### we need combination of 
load balancer + VMSS
<br>
<img width="592" height="476" alt="image" src="https://github.com/user-attachments/assets/15aba8c9-9ea5-43b4-9b50-a94215f49433" />


#### load balancer algorithm
it defines
- how request will go
- LB choose algorithm
  - `round robin`: send request in sequence to all instances
  - `weighted round robin`: based on server config, we can assign soem weight <br>
    <img width="522" height="436" alt="image" src="https://github.com/user-attachments/assets/4929a10c-2b8e-4181-8d6d-7247e0f28786" />
  - `least connection`: identify least load on server. and assign incomming traffic to that server <br>
    <img width="572" height="335" alt="image" src="https://github.com/user-attachments/assets/3958db92-e489-49a3-bd2e-7b78a357389b" />
  - `least latency`: LB checks latency of instances, and send to least latency server
  - `Geographically`: LB is region specific. One LB in each Region
  - `Ramdom`: LB randomly decide which instance to choose

  refer for multi region LB: https://github.com/riteshbehal/architecting-on-aws/tree/master/13.%20AWS_Global_Accelerator
