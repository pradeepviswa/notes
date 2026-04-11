# Deploy an Application Using the Kubernetes Dashboard

# Problem Statement 
```
Karen is a DevOps engineer at a tech startup. Her team has developed a new
application using MySQL. Now, it is her task to deploy that application.
The company plans to utilize Kubernetes for its robust container
orchestration capabilities.
Karen must create a Kubernetes dashboard with specific configurations, user
roles, storage, service verification, and data management.
```

# Steps
1. Get started with pods, services, and deployments
2. Create and verify the service
3. Create a token and work on a dashboard
4. Configure the NFS-server for MySQL and WordPress deployment
5. Set up the NFS client side
6. Create and verify the PV
7. Create a secret for MySQL deployments secret data
8. Create a configmap for WordPress deployment to store non-sensitive information


# Get started with pods, services, and deployments
## Create 3 ec2 instances in AWS
<img width="556" height="127" alt="image" src="https://github.com/user-attachments/assets/2446015e-7253-4184-a00d-49300c6782e3" />

## install kubernetes on ec2 instances and create cluster
Install commands: https://github.com/pradeepviswa/deployment-scripts/blob/main/k8s.sh
> **on master node**
```
## CREATE 3 T3.medium machine with all traffic enabled 

#In master machine:

#Step 1 : Update and Upgrade Ubuntu
sudo apt-get update
sudo apt-get upgrade

sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

## 

sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF

##

sudo modprobe overlay
sudo modprobe br_netfilter

##
sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

##

sudo sysctl --system

##

sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/docker.gpg
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update
sudo apt install -y containerd.io

containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
sudo sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml

sudo systemctl restart containerd
sudo systemctl enable containerd

##

sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# This overwrites any existing configuration in /etc/apt/sources.list.d/kubernetes.list
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

##

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

##

modprobe br_netfilter
echo 1 > /proc/sys/net/bridge/bridge-nf-call-iptables
echo 1 > /proc/sys/net/ipv4/ip_forward

##

sudo kubeadm init

mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

kubectl apply -f https://raw.githubusercontent.com/projectcalico/calico/v3.25.0/manifests/calico.yaml


##################
##################
###################
```

> **on node1 and node2**
```
## NOW RUN THE BELOW COMMANDS IN THE NODES ######


sudo apt-get update
sudo apt-get upgrade

sudo swapoff -a
sudo sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

## 

sudo tee /etc/modules-load.d/containerd.conf <<EOF
overlay
br_netfilter
EOF

##

sudo modprobe overlay
sudo modprobe br_netfilter

##
sudo tee /etc/sysctl.d/kubernetes.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
net.ipv4.ip_forward = 1
EOF

##

sudo sysctl --system

##

sudo apt install -y curl gnupg2 software-properties-common apt-transport-https ca-certificates
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmour -o /etc/apt/trusted.gpg.d/docker.gpg
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

sudo apt update
sudo apt install -y containerd.io

containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
sudo sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml

sudo systemctl restart containerd
sudo systemctl enable containerd

##

sudo apt-get update
# apt-transport-https may be a dummy package; if so, you can skip that package
sudo apt-get install -y apt-transport-https ca-certificates curl gpg

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.29/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg

# This overwrites any existing configuration in /etc/apt/sources.list.d/kubernetes.list
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.29/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

##

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```
> **run below cluster join command on node1 and node2.**
> This unique command is generated as part of cluster installation commnd which was executed on master n ode

```
sudo kubeadm join 172.31.32.15:6443 --token b7cz8o.3zodxe3yu6lmov0u         --discovery-token-ca-cert-hash sha256:53412b32bb5e817895da9b3d561772ad4a6518402aea8736450fa32a5f1b347a
```
<img width="1342" height="368" alt="image" src="https://github.com/user-attachments/assets/245c1c40-6475-4af3-8503-62541486eeca" />


> **run below command on master node to check cluster status**
<img width="772" height="130" alt="image" src="https://github.com/user-attachments/assets/be0b5c4c-1431-496f-b8db-4dc3d94af69d" />


-----
# 2. Create and verify the service
# 3. Create a token and work on a dashboard
# 4. Configure the NFS-server for MySQL and WordPress deployment
**create PersistentVolume** 
```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: efs-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteMany
  nfs:
    path: /
    server: fs-xxxxxx.efs.ap-south-1.amazonaws.com
```
<img width="1147" height="782" alt="image" src="https://github.com/user-attachments/assets/9e3afe6c-ff07-4695-aa3e-f9325416a75b" />

# 5. Set up the NFS client side
# 6. Create and verify the PV
# 7. Create a secret for MySQL deployments secret data
# 8. Create a configmap for WordPress deployment to store non-sensitive


