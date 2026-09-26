# Azure CLI
> CLI: Command Line Interface
> Used to create, manage, configure and troubleshoot azure resources
> It works in all Operating Systems
> It is used for automation, scripting, DevOps and bulk operations
> It is faster for repeatative tasks
> all the commands starts from `az`


### scenario
az 

### clone repo
https://github.com/pradeepviswa/Azure-Administrator/tree/main/Azure%20CLI

#### steps
- `az accoutn show`: lists all accounts
- `az login`: login using your account
- 
### Install Azure CLI on system
https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest&pivots=winget
download MSI for windows > 64 bit

### what to look for in command o utptu
`provisioningState: Succeed`

### login using azur eaccount
```
az login
```

### crate resource group
```
az group create --location "Central India" --name "demo-grp"
```

### create virtual virtual network
```
az network vnet create --name "app-network" --resource-group "demo-grp" --subnet-name "SubnetA" --address-prefixes 10.0.0.0/16
```

### create subnet
```
az network vnet subnet create -n "SubnetB" --address-prefixes 10.0.1.0/24 -g "demo-grp" --vnet-name "app-network"
```


### get vm image list
```
az vm image list --output table
az vm list-sizes --location "Central India"
```

### create VM
VM List: `https://learn.microsoft.com/en-us/azure/virtual-machines/windows/cli-ps-findimage`
```
az vm create -g "demo-grp" -n "appvm" --image Win2019Datacenter --admin-username "appusr"
```
or
```
az vm create -g "demo-grp" -n "appvm" --image "MicrosoftWindowsServer:WindowsServer:2022-Datacenter:latest" --admin-username "appusr" --size "Standard_DS1_v2" --vnet-name "app-network" --subnet "SubnetA"
```


### create separate disk and attach to VM

```
az disk create -n "data-disk" -g "demo-grp" -l "Central India" --size-gb 16

az vm disk attach --vm-name "appvm" --lun 0 -g "demo-grp" -n "data-disk"
```
