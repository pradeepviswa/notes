# Virtual Machine `Images` and Custom Images

### what is VM Image
It is a template or snapshot that contains OS, system settings , s/w installed, which can be used to deploy new VMs. Its a blueprint to reproduce new VMs.

### Scenario
> Need is to create 100 servers. <br>
> On all VMs I need S/Ws: .net sdk, java sdk, <br>

### solution
```
Create one VM Manually
Install all S/Ws on it.
Create one template of it
```


### Generalized Image
- suitable for scalable deployments like VMSS.
- generalize usign `sysprep` for Windows or `waagent` for Linux OS.
- genaralize removes `machine specific information` before image is captured, example
  - hostname
  - system identity
  - provisioning
- it is a template for new and clean VMs
- this VM we cannot use any more, Azure will deallocate this VM.
#### Steps
- create VM VM with windows OS
- IIS install
- generalize VM usign sysprep
- capture image
- create new VM from Image


### Specialized I mage
- it keeps exact state of Operating System with machine specific information
- it is best for backup purpose or one-off deployments
- it is a clone of original OS.


