# To create high available architecture by distributing incoming traffic among healthy service instances in cloud services or virtual machines in a load-balanced set with the help of a command-line interface
> this can be doen using simplylearn subscription
refer: https://github.com/pradeepviswa/notes/blob/main/8%20MS%20Azure%20Administrator%20AZ-104/17-load-balancer.md

<br>
avoid bastion 
only one zone is enough


### steps
- ignore Create a bastion subnet
- ignore Create bastion host
- modified command for Create virtual machines
  - for VM1
    ```
    az vm create --resource-group CreatePubLBQS-rg --name myVM1 --nics myNicVM1 --image win2019datacenter --size Standard_B1s --storage-sku Standard_LRS --admin-username azureuser --zone 1 --no-wait
    ```

  - fror vm2 
    ```
    az vm create --resource-group CreatePubLBQS-rg --name myVM2 --nics myNicVM2 --image win2019datacenter --size Standard_B1s --storage-sku Standard_LRS --admin-username azureuser --zone 2 --no-wait
    ```

