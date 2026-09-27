# event hub

### create namespace
<table>
 <Tr>
   <Td>
<li> In azure search for event hub </li>
<li> create a namesapce </li>
<li> rg: rg1 </li>
<li> namespace name: pradeepns1 </li>
<li> regions: central india </li>
<li> pricing tier: Basic </li>
<li> Troughput: 1 </li>
<li> review + create </li>
    
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

### consume event hub
- using chatgpt write a code to consume data from event hub
program_consumer.cs
```
using Azure.Messaging.EventHubs.Consumer;

string connectionString = "SECURE_CONNECTION_STRING";

await using EventHubConsumerClient consumer =
    new EventHubConsumerClient(
        EventHubConsumerClient.DefaultConsumerGroupName,
        connectionString,
        eventHubName
    );

Console.WriteLine("Listening for Event Hub messages...");

await foreach (PartitionEvent partitionEvent in consumer.ReadEventsAsync())
{
    string message = partitionEvent.Data.EventBody.ToString();

    Console.WriteLine("----------------------------------");
    Console.WriteLine($"Partition: {partitionEvent.Partition.PartitionId}");
    Console.WriteLine($"Message: {message}");
    Console.WriteLine($"Sequence: {partitionEvent.Data.SequenceNumber}");
    Console.WriteLine($"Time: {partitionEvent.Data.EnqueuedTime}");
}
```

 
