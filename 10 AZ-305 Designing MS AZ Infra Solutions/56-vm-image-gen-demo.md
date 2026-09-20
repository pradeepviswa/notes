# VM  Image - Generalize

### create a VM
Create a VM and install IIS
```
# install IIS
Install-WindowsFeature -name web-server

$hostname = $env:COMPUTERNAME

@"
<!DOCTYPE html>
<html>
<head>
    <title>IIS Hostname Test</title>
</head>
<body>
    <h1>IIS Load Balancer Test</h1>
    <h2>Hostname: $hostname</h2>
</body>
</html>
"@ | Set-Content "C:\inetpub\wwwroot\index.html"
```
<img width="307" height="277" alt="image" src="https://github.com/user-attachments/assets/4cb217d9-e669-41ba-b2bb-4ca809110418" />




