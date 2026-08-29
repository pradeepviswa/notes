# AZ-305
## trainer infor
- Instructor: Ritesh Behal
- refer https://github.com/riteshbehal/Designing-Azure-Infrastructure-Solutions-AZ-305/tree/main

## types of cloud
- public cloud (shared responsibility. cost wise economical)
- private cloud (full infra mangaed by customer, very expensive)
- hybrid cloud (ex. DB is on-prem, web server is in public cloud)
- community cloud (ex. multiple colleges sharign same project)

## understand shared responsiblity
- security `of` the cloud
  - managed by service provider like Azure, AWS, ACP, manages Regions, AZs, DCs, hardware, physical netwrok
- security `in` in the cloud
  - managed by customer like data, access, configuraiton
 
## Azure global infrastructure
> https://datacenters.microsoft.com/globe/explore
- regions (at present 60+ regions, it is georaphical area) each region has minimum 3 AZs
  - availability zone3 1 (separate locaiton, physical isolation (HA 99.99% SLA)
    - data centers (contains servers, storage, network, and power cooling)
  - availability zones 2
    - data centers (contains servers, storage, network, and power cooling)
  - availability zones 3
    - data centers (contains servers, storage, network, and power cooling)

> sla clculator: https://uptime.is
> 99.9% means 1 min downtime every day
> for no downtiem need DR site

## DR
- Region pairing can ensure 100% uptime
- DR architecture has 4 strategies
  - backup and restore (this takes time)
  - Pilot light (choose services for always availale)
  - warm standby (resources are available in other revion with less capacity)
  - multi site active-active architecture (both sites always available) this takes very less time
> azure doesn't commit SLA on multi-site stragety
