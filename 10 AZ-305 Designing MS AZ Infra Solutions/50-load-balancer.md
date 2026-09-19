# Load balancer
Mainly for: 
- distribution of traffic
- health check, fwd traffic to healthy instances

#### instance auto scaling is done by
VMSS - Virtual Machine Scale Set
equivalent to auto scalign group in AWS

#### we need combination of 
load balancer + VMSS


#### load balancer algorithm
it defines
- how request will go
- LB choose algorigh, example round robin algorithm
- 
