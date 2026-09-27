# create web server on windows
> create windows VM <br>
> RDP to server <br>
> install IIS <br>
> in AZ portal, go to VM. Networking -> Network settings > create new inboud rule, allow http  port <br>
> browse using public IP <br>
> iis port biniding change to 6677 <br>
> inbound port rule - add port 6677 <br>
> NSG is also a firewall but it works at coudl level. at OS level we have to deal with OS firewall <br>
> in VM in create a new rule > port - tcp - 6677 inbound rule add

# create web server on ubuntu
> create ubuntu VM <br>
> ssh to server
```
sudo update -y
sudo apt install apache2 -y
```
> in network settings add inbound rule for port 80 <br>
> browse using public ip
