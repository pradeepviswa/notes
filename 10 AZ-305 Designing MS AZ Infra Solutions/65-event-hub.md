# Event Hub
Refer: https://github.com/pradeepviswa/Designing-Azure-Infrastructure-Solutions-AZ-305/blob/main/5%20Design%20Infrastructure/17%20Azure%20Event%20Hub.pdf


## what is event hub?
> Azure event hub is fully managed, highly scalable, event ingestion service <br>
> big data streaming platforms <br>
> example in stock market, big transactions takes place, Example company-A, doing research on stock market <br>
> stock market data is stored in data warehouse, on top of it analysis would be done <br>
> using azure event hub, we can replace data warehouse with Event Hub <br>
> it is used for telematery data, monitoring dat, etc.


### event hub components
- `namespace`: its a container
  - inside namespace we create `event hub`

### example
- namespace - abc company-events
  - event hub 1: applicaiton logs
  - event hub 2: transaction logs
  - event hub 3: user clicks

### components structure
- produer: That sends data to event hub like web app, mobile logs, IOT devices, servers, Microservices, log collectors
- event hub: data is sent to event hub
- consumer: That receives data from event hub. example custom app, azure stream analytics service, databricks, apache spark, azure functions
<img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/516655d4-a879-42d1-9d75-0ae67c7b5fdc" />

### partitions
> It is a section of event hub which is used for distributing incoming traffic.
> events hub will have multiple partitions, example P1, P2, P3 ands so on
