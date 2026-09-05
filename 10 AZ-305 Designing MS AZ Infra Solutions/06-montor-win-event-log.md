<img width="427" height="337" alt="image" src="https://github.com/user-attachments/assets/8250cade-af7c-4e65-b5b8-aaeccaea9549" /><img width="427" height="337" alt="image" src="https://github.com/user-attachments/assets/7e07a323-7629-48ec-953e-b4cda4d77784" /># monitor windows event logs
> go to log analytics workspace
- its a common storage where we can store lolg data
- click create
<img width="322" height="167" alt="image" src="https://github.com/user-attachments/assets/45020e3e-55fa-48ed-821c-16347434f834" />
<img width="427" height="337" alt="image" src="https://github.com/user-attachments/assets/be54260b-26fb-4205-b1c3-ac2f0b586815" />

send logs to log analytics workspace

ther is a provisionc alled DCR - data collection rule
this will send all the logs fro msystem to log analytics workspace

# create Data Collection Rule
<img width="782" height="732" alt="image" src="https://github.com/user-attachments/assets/e16125e0-afcf-4bcb-bccf-4cf634fcb545" />


- add resource
  <img width="746" height="700" alt="image" src="https://github.com/user-attachments/assets/c722490e-743e-4faf-b10d-956cb6365f40" />

- add vm
<img width="442" height="287" alt="image" src="https://github.com/user-attachments/assets/f79fbbce-0adb-4774-a5e7-08a2d71c5e65" />

- select windows evetn logs
  <img width="586" height="435" alt="image" src="https://github.com/user-attachments/assets/20da86e1-46d7-4f5e-8d2c-73090fb0a6ed" />


- add new data source
  <img width="477" height="557" alt="image" src="https://github.com/user-attachments/assets/5c191222-8acf-4e57-aae8-f21b2a075aeb" />

review + create

### logs should appear here
Under table -> security -> event -> click on `run`
<img width="1920" height="1032" alt="image" src="https://github.com/user-attachments/assets/cda9051f-1bfe-4c3e-a4a2-62ce1c6cdc27" />

