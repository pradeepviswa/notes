# metrics
> https://learn.microsoft.com/en-us/azure/azure-monitor/reference/metrics-index
> search for the resource you want to monitor

# log analytics workspace
> it works with azure monitoring
> it stores the log
> it uses KQL languae usign which we can query log


# demo
- Azure VM
  - alert for VM (if cpu utilization is > 80% then send email)

### create one VM
regions: East US 2 (Zone 1)
OS: Server 2022
Size: Standard D2s v7 (2 vcpus, 8 GiB memory)
HDD: Standard SSD

### CPU load increase script
> run this file, CPU utilization will increase
> sl.bat
```
sl.bat
```
> in VM monitor check CPU graph, % will increase

### open Monitor
- Alerts
- create alert rule
  - if  cpu usage  >  80%,
  - lookback period 5 mins,
  - then in action group set send email to personal email ID.
 
we get email like this
<img width="645" height="617" alt="image" src="https://github.com/user-attachments/assets/3a420777-9a3c-4821-a22b-59f6645abd9c" />


