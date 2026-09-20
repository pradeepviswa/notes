# COSMOS Database
> It is Microsoft manager `No SQL` Database.
> it is eual to `Dynamo DB` in AWS
No SQL Means:
- for sql we follow 1st normal for, 2nd normal form, and so on
- it is called SQL - structured query languae
- Multiple DBs follwo this structure like MySQL, MSSQL, Orale, IBM DB2
- No SQL is written from scratch
- it is build for very low latency
- performance is very fast

### It is a managed service
- it is a managed service
- it is managed by Microsoft
- MS will do
  - provisioning of infra
  - replicaiton
  - availablibility
  - Auto scaling


### No fixed schema
- in case of SQL, schema is fixed, example
  ```
  create table
  (
  custid int,
  name, varchar (50),
  email varchar (100)
  )
  ```
- In case of CosMos there is no fixed number of columns


### CosMos DB API
- users use API to communicate wtih this DB
- usign api we can 
  - Create data
  - Read  data
  - udpate data
  - delete data
- structure
```
Cosmos DB
  database
    container
      store
      retrieve
```
