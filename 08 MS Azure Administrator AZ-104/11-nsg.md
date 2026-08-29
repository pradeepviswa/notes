# network security group

<img width="993" height="597" alt="image" src="https://github.com/user-attachments/assets/276b6265-c5cc-422a-951a-9b12df81b094" />
<br>

<img width="953" height="562" alt="image" src="https://github.com/user-attachments/assets/33f2ed13-e20a-4f11-960d-f044760f4fba" />

<br>
RDP will faile because port nota allowed <br>
<img width="500" height="206" alt="image" src="https://github.com/user-attachments/assets/efff27df-0874-4c6e-bc03-1f0e76e564c7" />

<br>
Create network security group and attache it with VM
<br>
open Netowrk secirty group <br>
<img width="337" height="172" alt="image" src="https://github.com/user-attachments/assets/7347eea7-92ef-49f2-97ef-1a0da424f08d" />
<br>
Choose sanme Resource Gorup as per VM <br>
<img width="903" height="437" alt="image" src="https://github.com/user-attachments/assets/4ba1c6e2-a14c-4d30-bc61-437b0ed3df95" />
<br>
go to VM >setings > network interfaces > associcate  <br>
<img width="642" height="478" alt="image" src="https://github.com/user-attachments/assets/1863b715-dbe5-4c65-adae-777e8c8c4b99" />

<br>
choose nsg created above <br>
<img width="582" height="208" alt="image" src="https://github.com/user-attachments/assets/1e56b4ec-80e3-4236-954c-711936fcff51" />
<br>
craete inbound rule in in nsg and create inbound rule to allow port 3389
<br>
<img width="1348" height="653" alt="image" src="https://github.com/user-attachments/assets/fbfca07e-e371-4a82-9a84-c4eddb381310" />

