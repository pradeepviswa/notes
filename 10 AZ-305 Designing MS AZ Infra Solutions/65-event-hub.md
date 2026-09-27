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
