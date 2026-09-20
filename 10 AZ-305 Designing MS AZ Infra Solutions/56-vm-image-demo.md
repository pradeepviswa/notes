# VM  Image - Generalize

### create a VM
Create a VM and install IIS
```
# install IIS
Install-WindowsFeature -name web-server
# create sample web page
"<h1>Demo web site</h1> <h2>Hostname: $($env:COMPUTERNAME)</h2>" | Set-Content "C:\inetpub\wwwroot\index.html"
```
<img width="307" height="277" alt="image" src="https://github.com/user-attachments/assets/4cb217d9-e669-41ba-b2bb-4ca809110418" />


### Clean up OS Remove machine specific values
- delete Panther folder it contains system specific inforamtion (restart VM if you get `folder in use` error
  `c:\Windows\Panther\`
- run sysprep
  ```
  cd c:\WIndows\System32\Sysprep\
  sysprep.exe /generalize /shutdown
  ```
  <img width="585" height="352" alt="image" src="https://github.com/user-attachments/assets/1163b675-785e-418d-a541-5d16af02d480" />
- In Azure portal, go to VM -> Capture -> Image
  <img width="77" height="37" alt="image" src="https://github.com/user-attachments/assets/e0bedfc0-f234-4a6b-8f76-2dbe05a82bb0" />
  - choose RG and Region
  - name
  - OS State: select `generalize` option
  - target VM Image: create new
      - VM  Name
  - versonnumber: 1.0.0
  - This takes approx 10 mins

# VM  Image - specialized
- Create a new VM
- Install IIS
- Same process. choose specialized image

# where are the Images saved
**Azure Compute Gallery** <br>
<img width="992" height="512" alt="image" src="https://github.com/user-attachments/assets/3917a6af-4f3c-4772-a406-ae7ce1c2fecf" />


# VM from Generalized Image
- new VM <br>
  <img width="510" height="282" alt="image" src="https://github.com/user-attachments/assets/45a336f1-5c66-4a74-bd5c-0360e7b6f085" /> <br>
- set credential because old creds has been deleted <br>
  <img width="507" height="147" alt="image" src="https://github.com/user-attachments/assets/250453e0-95cd-4e09-a904-47f5d6979f82" />

# VM From Specialized Image

