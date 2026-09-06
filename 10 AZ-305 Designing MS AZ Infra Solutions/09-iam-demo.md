# IAM Demo

Create 2 VMs
VM1 and VM2

2 blob storage accounts
- randomstorage10609
- randomstorage20609

create users
- demo_user1
- demo_user2 (demo_user2@pradeepvishwagmail.onmicrosoft.com)

#### demo_user1
check assigned roles. currently it is blank.
we can add assignbment and roles.

in incognito window login to portal.azure.com
demo_user1@pradeepvishwagmail.onmicrosoft.com
enter passwrod, reset password, scan QR code
try to access VMs, won't see anything

#### purpose give permission to demo_user1
- got to VM
- IAM
- add role assignment
- privilege admin roles
  - Owner: user1 is given owner access, it can make furthe rowners
  - Contributor: it doesn't allow to assign role in RBAC.  s1 can manage all resoruces but cannot create another owner
 
  - Assign access to - Assign access to > select user1 > give `Allow user to assign all roles (highly privileged)`
  - in demo_user1 profile, check VM1 will appear. this is resource level permisiso.
- same way give permission on `storge accoutns  as well
- see all permission here 'demo_user1 | Azure role assignments'
- remvo perm from vm1 `vm1 | Access control (IAM)` -> role assignments -> select demo_user1 -> delete

### give permission on resoruce group level
- resource grup name - rg1
- user dissk -> user cannot see disk, can't see disk
- open rg1, same process
- `rg1 | Access control (IAM)`
- 


> uderstand difference between owner and contributor
> demo_user1 is owner
> demo_user2 can configure IAM and give permision to demo_user2
> from demo_user1 login, on VM1, assign contributor/owner role to demo_user2

> a contributo cannot assign role to another user

> assign user at subscription level


### create yoru own custom role (group)
- at subscription level, go to IAM
- add custom role, name `customeRoleNetwork`
- start from scrach
- add permission
- search `Microsoft:Netwrok`
- search for exact permission name for allowed creation of virtual network and but delete not allowedw hile making custom role in azure
- virtualvirtualnetwork
- <img width="533" height="548" alt="image" src="https://github.com/user-attachments/assets/83956efa-2882-4234-a566-ce711bf50b7a" />


### assign newly created role to demo_user1
- assign `customeRoleNetwork` at subscription levgel to demo_user1
- user can see and create virtual network only
- try to delete existing virtual network, it will give error

### compute permission
-  create another cusome role under `compute`
-  start, restart permision only
-  <img width="563" height="307" alt="image" src="https://github.com/user-attachments/assets/50082a5e-a0e5-4a63-8348-5ff0ae84b899" />
-  and check stop or delete VM, it should give error

