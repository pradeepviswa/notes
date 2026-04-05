# Exporters
> Exporter is part of prometheus
> Exporters are small tools that collect metrics from system or applications
> and expose them in a format which promethus understands

## how it works
- exporter collects data such as CPU, memory, Database status, etc.
- convert it in to prmethus metrics format
- expose it via an http endpoint
- then it is accessible via prometheus
- prometheus will use these metrics for monitoring

> On prometheus install exporter

## types of exporters
1. node exporter: thsi will collect server level metrics like CPU, RAM, DISK
2. Database exporter: this is used to monitor databases. for this we have exporters like
   -  MySQL exporter
   -  MongoDB exporter
3. Blackvbox exporter: this checks endpoint availability. It checks whether website up or down, API working or not, etc.


## node exporter
- install official page: https://prometheus.io/docs/guides/node-exporter/
  ```
  wget https://github.com/prometheus/node_exporter/releases/download/v1.10.2/node_exporter-1.10.2.linux-amd64.tar.gz
  tar xvfz node_exporter-1.10.2.linux-amd64.tar.gz
  cd node_exporter-1.10.2.linux-amd64
  # ./node_exporter
  # run node_exporter in background
  sudo ./node_exporter > /dev/null 2>&1 &
  ```
> it works on port 9100
- access
  ```
  https://publicip:9100
  ```

## inform promethesu theat exporter will send data to you
- vi promethus.yml
- copy existing job, add one more job, modify parameters as below
  ```
  jobname: "nodeexporter"
  targets: localhost:9100
  ```
- open promethues report
  <img width="795" height="336" alt="image" src="https://github.com/user-attachments/assets/eedc22c8-8adf-40e4-ae81-4099fbc9c610" />

## grafana to show dashboard on node exporter
- https://grafana.com/grafana/dashboards/1860-node-exporter-full/
- in grafana import **id: 1860**
-  
- 




