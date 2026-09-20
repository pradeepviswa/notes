# Synapse demo
<img width="242" height="117" alt="image" src="https://github.com/user-attachments/assets/f52485f2-e78e-4050-8ff8-a3108406a5d9" />

# pre-requisite: creae storage account first
standard storage account cannot be used with Synapse
- new storage
- simple storage account
- name: appstoragedemo1
- central india
- local reduntand data
- Advanced: **Enabel hierarchal namesapce**: check this box
- after createion create a container
- container name: `data`
- in this container upload this csv file:
  - https://github.com/pradeepviswa/Designing-Azure-Infrastructure-Solutions-AZ-305/blob/main/3%20Design%20Data%20Storage/Supporting%20Files/ActivityLog01.csv


# create synapse
- create
- name: synapsews1
- region: central india
- select data lake storage gen2
  - account name: _select storage account_
  - filesystem name: `data` (it is container name)
- security
  - sql server admin login: sqladmin user
  - sql password: enter password
- ALLOW CONNECTION FROL PUBLIC INTERNET
- review + create

# synapse workspace
<img width="567" height="236" alt="image" src="https://github.com/user-attachments/assets/4c813b63-ac3e-437e-90cf-e0ee2287ec81" />
by default it selects build-itn serversless pool
- open synapce studio
- <img width="581" height="326" alt="image" src="https://github.com/user-attachments/assets/738ccb85-61bb-4c6b-8fab-58173ec8eebe" />
- update csv file in storage
- <img width="461" height="260" alt="image" src="https://github.com/user-attachments/assets/92ba8d5f-2028-410b-b144-17da8fbfa803" />
- click on + icon
- <img width="231" height="222" alt="image" src="https://github.com/user-attachments/assets/6fff5724-42fb-4721-900d-7346fdfd960c" />
- select external data
- select: Azure Cosmod DB For NoSQL
- next
- name: azuredatalake
- auth: accoutn key
- storage account name: select new storge afcount
- <img width="422" height="517" alt="image" src="https://github.com/user-attachments/assets/371d234e-3571-488a-a371-487619cd35b0" />
- click on linked
- aure data lake storage gent 2
- workspace
- data primary
- right click on actiity log, new sql script, select 1000 rows
- this will open query editor


### created dedicated pool
- dedicated sql pool name: dedicatedpool1
- performacne: let it to low
- create

### attach dedicated pool with azure synapse
- resource: sql poo;
- <img width="407" height="452" alt="image" src="https://github.com/user-attachments/assets/966cb5f2-f097-41e8-a73d-9dc61243c68f" />
- connect dedicatedpool1


#### Homework
https://github.com/pradeepviswa/Designing-Azure-Infrastructure-Solutions-AZ-305/blob/main/3%20Design%20Data%20Storage/11%20Loading%20Data%20using%20Pipelines%20-%20Storage%20Account.pdf









