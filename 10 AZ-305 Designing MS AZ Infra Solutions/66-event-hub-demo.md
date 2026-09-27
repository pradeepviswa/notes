# event hub

### create namespace
<table>
 <Tr>
   <Td>
<li>In azure search for event hub <br></li>
- create a namesapce <br>
- rg: rg1 <br>
- namespace name: pradeepns1 <br>
- regions: central india <br>
- pricing tier: Basic <br>
- Troughput: 1 <br>
- review + create <br>
    
   </Td>
   <Td>
<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/97893721-1c8f-4bfd-b9bf-dfe86bd4b2ad" />
    
   </Td>
 </Tr>
 
</table>


### create even hub
- name: pradeephub
- <img width="726" height="832" alt="image" src="https://github.com/user-attachments/assets/c5d4883c-8f20-4130-8e3e-cf6df3c84e93" />
- <br>
- send events: custom payload and use json to send soem dummy value to event hub

### create a project in vs to producec data
- create a project in vs
- use chatgpt to generate code to send data
- install requried nuget package
- connection string of event hub:  in event hub, search for settings: shared access policies, add sAS policy, create
- onc epolicy is created we get  connection string
- <img width="727" height="826" alt="image" src="https://github.com/user-attachments/assets/de68611e-0414-4bf1-af2e-f666b7246b50" />



 
