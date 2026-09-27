# ARM Template

### What is ARM Temaplate and why do we need it?
ARM - Azure Resource Manager <br>
ARM Template is Infrastrucure as Code (IaC). <br>
It's a JSON file. <br>
In s/w industry, we follow SDLC uder which we have different environments like dev, qa, uat, prod. <br>
It helps to mainain multiple such environments as shown below <br>
<img width="657" height="253" alt="image" src="https://github.com/user-attachments/assets/a5391cda-1b0d-4a7b-8e93-23244e6bd3cf" /> <br>

### how to use it?
we ca nuse it from 
- run directly from azure console OR
- add these templates to to CI/CD pipeline

 ### how template look like?
 
```json
{
    "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
    "contentVersion": "1.0.0.0",
    "parameters": {},
    "functions": [],
    "variables": {},
    "resources": [
        {
            "name": "demotemp010101201",
            "type": "Microsoft.Storage/storageAccounts",
            "apiVersion": "2023-01-01",
            "location": "Central India",
            "kind": "StorageV2",
            "sku": {
                "name": "Standard_LRS"
            }
        }
    ],
    "outputs": {}
}
```

