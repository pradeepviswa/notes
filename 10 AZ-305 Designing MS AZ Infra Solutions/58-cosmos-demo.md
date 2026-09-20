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
- DB: use existing, choose our DB `demodb`
- container ID: orders
- partition key: `/category` (it is used to search data aster)

### create item
this is how we insert data <br>
we can create stored procedure, etc
<img width="1002" height="292" alt="image" src="https://github.com/user-attachments/assets/5e660b20-f620-45af-aaef-e9656e34b748" />

### retrieve data

<img width="797" height="526" alt="image" src="https://github.com/user-attachments/assets/e2775dc8-2c59-4d3b-8172-8692b2783c9b" />



### retrieve data from api
#### use chatgpt to generate code
<img width="737" height="266" alt="image" src="https://github.com/user-attachments/assets/7dbf42e6-1a28-434a-8596-30dedb6be188" />

#### new project in VS Code
<img width="587" height="322" alt="image" src="https://github.com/user-attachments/assets/c52ce946-a848-4f84-a620-172bb3cbadf5" />

#### inherit pacakge
<img width="402" height="155" alt="image" src="https://github.com/user-attachments/assets/8ceb3bf3-f95c-4ff9-9536-53210133498d" />

#### endpoint url
<img width="452" height="122" alt="image" src="https://github.com/user-attachments/assets/f7b10004-93a9-45a8-9c0a-ee87fcdea381" />


#### cosmos key
<img width="692" height="262" alt="image" src="https://github.com/user-attachments/assets/0bdd7679-1637-4a74-8d3c-6a5a2b00312c" />


#### dot net final view
<img width="852" height="277" alt="image" src="https://github.com/user-attachments/assets/63f3a6cc-2fd3-44e1-b320-796b95f1c801" />



 

