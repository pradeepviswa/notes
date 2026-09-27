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
 > Refer: https://github.com/pradeepviswa/Azure-Administrator/tree/main/ARM/Templates
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

### online help
https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/overview

### lab
> consider this template: https://github.com/pradeepviswa/Azure-Administrator/blob/main/ARM/Templates/Temp01.json%20(Creating%20Storage%20Account).json <br>
> copy the content of above file <br>
> in azure search for template: `Template deployment`
> build your own template in editor
> paste here the jason content <br>
<img width="857" height="341" alt="image" src="https://github.com/user-attachments/assets/d61bf3a5-df02-431d-bcae-f38fd4af3439" />
> run this <br>
> choose subscription and Resource Group and region <br>
> review + create <br>
<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/d4ce7be8-06ba-45f6-9ade-c1d41f7415b7" />

