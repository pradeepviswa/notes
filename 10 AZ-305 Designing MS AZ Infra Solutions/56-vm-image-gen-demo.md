# VM  Image - Generalize

### create a VM
Create a VM and install IIS
```
# install IIS
Install-WindowsFeature -name web-server

# create sample web page
$hostname = $env:COMPUTERNAME

@"
<!DOCTYPE html>
<html>
<head>
    <title>IIS Hostname Test</title>
</head>
<body>
    <h1>Demo web site</h1>
    <h2>Hostname: $hostname</h2>
</body>
</html>
"@ | Set-Content "C:\inetpub\wwwroot\index.html"
```
<img width="307" height="277" alt="image" src="https://github.com/user-attachments/assets/4cb217d9-e669-41ba-b2bb-4ca809110418" />


### Clean up OS Remove machine specific values
- delete Panther folder it contains system specific inforamtion
  `c:\Windows\Panther\`
- if any issue in delete the kill the proccess isung
  ```
    Get-Process | Where-Object {
        $_.Path -like "*Panther*"
    } | Select-Object Id, ProcessName, Path

  #then kill
  Stop-Process -Id <PID> -Force
  ```
- run sysprep
  ```
  cd c:\WIndows\System32\Sysprep\
  sysprep.exe /generalize /shutdown
  ```
  <img width="585" height="352" alt="image" src="https://github.com/user-attachments/assets/1163b675-785e-418d-a541-5d16af02d480" />

  

