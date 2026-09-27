# Azure with Powershell
### trainer lab
https://github.com/pradeepviswa/Azure-Administrator/blob/main/PowerShell/PowerShell/AzurePowerShell/01_resourcegroup.ps1

### install powershell version 7
```
# run cmd as administrator
# show current version
$PSVersionTable
# Run the following command to install/upgrade to the latest stable release
winget install --id Microsoft.PowerShell --source winget

# To upgrade an existing PowerShell 7 installation in the future, run
winget upgrade --id Microsoft.PowerShell

# in cmd or powershell type `pwsh` to enter PowerShell v7
pwsh

# install az module
Install-Module -Name az
````

### connect
Connect-AzAccount

### create resource group
```
$resourceGroup="demo-RG"
$location="North Europe"

New-AzResourceGroup -Name $resourceGroup -Location $location
```


