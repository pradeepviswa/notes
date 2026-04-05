# monitoring docker container usign prometheus and grafana
**Scenario**
- Machine1 for grafana
- Machine2 for Prometheus and Docker

**steps:**
1. install
  - grafana in Machine1
  - Prometheus and Docker in Machine2
3. configure docker deamon to send logs to prometheus
4. promethus will send logs to grafana
5. in grafana we will configure dashbpoard to see how many containers are running

## Machine 1
- install grafana
- official document for ubuntu: https://grafana.com/docs/grafana/latest/setup-grafana/installation/debian/
- grafana works on **port 3000**
- browse http://ip:3000, username and password is **admin**
  ```
  wget https://dl.grafana.com/enterprise/release/grafana-enterprise-8.4.4.linux-amd64.tar.gz
  ls
  tar -zxvf grafana-enterprise-8.4.4.linux-amd64.tar.gz
  ls
  cd grafana-8.4.4
  ./bin/grafana-server
  ```
  > Grafana servers works on port 3000…so in security group enable port 3000

## Machine 2
- Install Docker
  ```
  apt update 
  apt install docker.io -y
  service docker start
  docker run -dt  ubuntu 
  docker run -dt ubuntu

  ```
- Install Prometheus
  - official document for ubuntu: https://prometheus.io/docs/prometheus/latest/installation/
  - script
    ```
    wget https://github.com/prometheus/prometheus/releases/download/v2.34.0/prometheus-2.34.0.linux-amd64.tar.gz
    
    ls
    tar zxvf prometheus-2.34.0.linux-amd64.tar.gz
    
    ls
    cd prometheus-2.34.0.linux-amd64
    ls
    ```
- WE NEED TO TELL DOCKER AS WELL THAT PROMETHEUS WOULD BE TRACKING DOCKER VIA PORT 9323 port. this can be any port number of our choice
  ```
  vi /etc/docker/daemon.json
  ```
  - press I to insert
    ```
    {
            "metrics-addr" : "0.0.0.0:9323",
            "experimental" : true
    }
    ```
- restart docker service
  ```
  service docker restart
  ```
- go to prometheus folder
  ```
  cd prometheus-2.34.0.linux-amd64   (if u r not inside the prometheus folder)
  ls 
  ```
- you will see Prometheus.yml file…it contains all the configuration of Prometheus. Here we have to tell that metrics would be coming from port 9323
- before that, go to docker-server machine and enable the port 9323 and port 9090
- Copy the ip of docker machine and http://3.15.194.85:9323/metrics
- You should see the docker stats
- edit prometheus.yml
  ```
  vi prometheus.yml
  ```
- enter
  ```
  - job_name: "docker"
  
      # metrics_path defaults to '/metrics'
      # scheme defaults to 'http'.
  
      static_configs:
        - targets: ["localhost:9323"]
  ```
  > just take care of one thing that – job_name should be exactly the job_name of the Prometheus
  <img width="815" height="352" alt="image" src="https://github.com/user-attachments/assets/a62259f0-f69b-429c-8bd6-e0fe38f8f1cc" />
 - start promethus
   ```
    ./prometheus
   ```
- Now open public ip:9090  to check if Prometheus is opening or not
- <img width="852" height="441" alt="image" src="https://github.com/user-attachments/assets/bf193b80-f52f-430b-a481-2dd50221ddab" />
- <img width="773" height="483" alt="image" src="https://github.com/user-attachments/assets/ee9502ca-61b4-41d0-b6ee-c1cbbc3357b0" />
- <img width="962" height="526" alt="image" src="https://github.com/user-attachments/assets/869c3fe0-9da8-40e1-8ee3-567f6d8c6c43" />
- Now lets go to Grafana and we will
- <img width="1116" height="611" alt="image" src="https://github.com/user-attachments/assets/e374b435-97ea-45e0-8f6d-0ff4a8d051a6" />
- give source as Prometheus to Grafana so that it can create beautiful graphs out of it
- (select data sources)
-<img width="923" height="312" alt="image" src="https://github.com/user-attachments/assets/e5570b44-8177-42e9-aa0a-2a72b419c4eb" />
- <img width="433" height="217" alt="image" src="https://github.com/user-attachments/assets/3d8ff0af-8308-4f24-8a4d-99a4ee7b4106" />
- <img width="1108" height="515" alt="image" src="https://github.com/user-attachments/assets/2dc977d4-1e8d-455b-bf96-d9cc0333b191" />
- http://<ip address>:9090/
- <img width="757" height="565" alt="image" src="https://github.com/user-attachments/assets/1e1af416-0aa6-4be1-af8f-4a1b94a2161a" />
- <img width="820" height="537" alt="image" src="https://github.com/user-attachments/assets/d0c3253a-db45-4e4f-998b-dad92bf7dd3b" />
- <img width="817" height="532" alt="image" src="https://github.com/user-attachments/assets/e68c5e69-55d5-4d0d-a72c-438005e90c06" />
- <img width="1150" height="590" alt="image" src="https://github.com/user-attachments/assets/43a261ae-3704-40c4-9960-e05acda85fc0" />
- <img width="838" height="467" alt="image" src="https://github.com/user-attachments/assets/cb230816-75a0-4695-b3b0-1c477dad76ed" />
- engine_daemon_container_states_containers{state="stopped"}
- <img width="1030" height="565" alt="image" src="https://github.com/user-attachments/assets/3211303b-04f7-4666-9e03-8cb477966a90" />
- <img width="1095" height="575" alt="image" src="https://github.com/user-attachments/assets/0429c200-d218-4849-8d74-18cac44b284e" />
- engine_daemon_container_states_containers{state="running"}
- <img width="1048" height="545" alt="image" src="https://github.com/user-attachments/assets/ccd1edd0-89a4-41db-801f-bf1cffb662b9" />
- <img width="1108" height="577" alt="image" src="https://github.com/user-attachments/assets/346fb59a-51c5-4d18-ba93-0c263e051fd6" />
- you can generate the grafana existing dashboard : https://grafana.com/grafana/dashboards/21040-docker-daemons/
  - in grafana
  - <img width="792" height="710" alt="image" src="https://github.com/user-attachments/assets/9e2c6aec-ffab-44da-82d2-dff038a753a9" />
  - Here you need to import dashboard id:
  - <img width="645" height="457" alt="image" src="https://github.com/user-attachments/assets/d428338f-b5b2-4e95-a780-159f79c84af8" />

  > id: **21040**
  > select the prometheus as data source and load 

