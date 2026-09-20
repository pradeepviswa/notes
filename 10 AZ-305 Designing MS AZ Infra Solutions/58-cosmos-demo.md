# COSMOS Database Example
example of
C - create
R  - read
U - udpate
D - delete

### structure
```
CosMos
  database
    continer
      store
```

### open app
- Azure Cosmos DB
- create
- which API: azur ecosmos DB for NoSQL (mongo db ecosystem supported API also available)
- create
  - workload type: `developmment/testing` (learning / producion)
  - resoruce group: RG1
  - account name: cosmosdemo1 (_cannot chagne later_)
  - availability zone: disable
  - location: Central India
  - capacity mode: `serverless`
    - serverless: this is preferred, load balance and backend infra will be managed by azure
    - provisioned throughput: this is fixing capacity. if you know traffic then go for it. itis difficult to predict input request.
  - review + create
<img width="487" height="285" alt="image" src="https://github.com/user-attachments/assets/cb8e8726-bf84-47a6-8df8-e53469e40403" />


### data explorer
- new database-  `demodb`
- create
- new container (it is like table)
- 

