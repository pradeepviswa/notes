# Azure Monitoring
> 20-25% in exam `az-305` is from monitoring

# why do we need monitoring
- web app cpu utilization check
- disk size is full or not
- db connection is made successfully
- check health of hosted web api
- check health of load balancer
- you have netwrok connection, check login cionnection is established

> if something is not happening as expected then send alert to user.
> This is how azure monitoring helps

# we can su e azure monitoring tool for
- Applicaiton 
- infrastructure
- azure platform services
- have custom services
- on premises resources can add

# azure monitoring is a group of services or suite of services
## insight
> get insight of 
- applicaiton containind
netowrk 
additional solution some 3rd party api
- have storage

## Analyze
- metric explorer (measurement of performance) for example we have 
  - cpu utilization
  - incoming traffic

## Log analytics
- it store our logs

## visualization
- dashboards

## workbooks

## Respond
 - actions



> visit for more information https://github.com/riteshbehal/Designing-Azure-Infrastructure-Solutions-AZ-305/tree/main/1%20Design%20Monitoring

# Alert on VM
 - alert rule on VM
   - decide scope of resource
     - add signal (cpu utilization)
       - add condition (if avg cpu is > 80% fo continuously 3 mins then send email)
         - Fire of alert  
> since we are studing monitoring, we can do it on web app, SQL DBs, VMs. go through github repo mentioned above.



