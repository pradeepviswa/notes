# agenda
<img width="1160" height="407" alt="image" src="https://github.com/user-attachments/assets/bf394c80-1b8d-49f9-b8e5-1b2d6a8394cc" />
<br>
<br>
<img width="1283" height="528" alt="image" src="https://github.com/user-attachments/assets/d156ad85-9e79-432b-9ad0-31a48b4c6aa8" /><img width="778" height="660" alt="image" src="https://github.com/user-attachments/assets/b490ed53-f4c1-4c98-9b8e-0599b7f10e7a" /># Netowrk
Ip subnet /24 - thre are total 256 IPS, but we get only 251 IPs only. <br>
belwo ips are resereved by Azure cloud serviec provider:
+ 0 - network address
+ 1 - default gateway
+ 2 - azure dns ip to the vnet space
+ 3 - razure dns ip to the vnet space
+ 255 - broadcast address


- while creating app service (PaaS) or Saas like gmail, hotmail, etc, Azure takes care of netowrk, storage and compute

# create own virtual network while creatign virtual manchine
<img width="846" height="340" alt="image" src="https://github.com/user-attachments/assets/228d43c8-2c0f-48d8-96d1-5676c08eb215" /> <br>
or open **Virtual Networks** <br>
<img width="815" height="286" alt="image" src="https://github.com/user-attachments/assets/903fe092-20b9-4dac-b380-ab4fb16cd6f4" />

<BR>
CREATE <BR>
<img width="787" height="668" alt="image" src="https://github.com/user-attachments/assets/b6876681-8d7b-4b0d-956a-51da332b0c2f" />

<img width="778" height="660" alt="image" src="https://github.com/user-attachments/assets/30173470-a101-4d44-b77c-c9e5d9395aa8" />

**cretated VNET** <br>
<img width="1283" height="528" alt="image" src="https://github.com/user-attachments/assets/8e623db8-56b7-4990-9e69-9ecdb3ad7b16" />
<br>
choose vm again, select same RG as created above <br>
<img width="1047" height="618" alt="image" src="https://github.com/user-attachments/assets/89d326b1-bc6f-4112-9bce-3f8b05eb767d" />
<br>
<img width="897" height="590" alt="image" src="https://github.com/user-attachments/assets/6c17f2cf-4858-481f-a969-87a4f1440834" />
<br>
**create**
<br>
go to VM see IP address <br>
<img width="1385" height="582" alt="image" src="https://github.com/user-attachments/assets/42ed196f-be70-4d4c-b193-3317fb7d78ce" />

