# LBs in Azure
- Basic LB (`retired by azure` in 2025)
- Standard LB
- Gateway LB (for thierd party apps). mainly used by network team.
  <img width="567" height="387" alt="image" src="https://github.com/user-attachments/assets/5273f1a5-83cd-46a2-be6a-0930c1211130" />


# Standard Loab Balancer
- which can serve traffic on `http`, `https`
- it can be `public`, or `internal` also
- LB uses endpoint, endpoint is URLs

### health probes
- example, check health of applocaiton on port 80


### backend pool
- this is similar to `target group` in AWS
- pool of VMs

### Frontend IP
public IP used by LB

### load balancing rule
- traffic coming to `frontend` should be forwarded to `backend pool`
- at a certain port, say port 80


