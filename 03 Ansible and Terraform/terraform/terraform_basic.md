# about terraform
- write in Hashicorp Configuration Language (HCL)
- we use documentation to write the code
- extension is .tf
- Provider list: https://registry.terraform.io/providers/hashicorp/

# steps
- terraform init: this will download provider inforamation locally
- terraform apply: this will execute terraform code and create infrastructure 

# Install Terrafrom
install terraform: https://developer.hashicorp.com/terraform/install#linux
```
wget -O - https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

# Simple Lab
- create file **connection.tf**
```
terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.31.0"
    }
  }
}

provider "aws" {
  # Configuration options
  region = "us-east-1"
  access_key = "<your aws access key>"
  secret_key = "<your aws secret key>"
}
```

- create file **vm.tf**. Take help from document: https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/instance
```
resource "aws_instance" "id1" {
  ami           = "ami-0b6c6ebed2801a5cb"
  instance_type = "t3.micro"

  tags = {
    Name = "HelloWorld"
  }
}
```
- create file **mys3.tf**
```
resource "aws_s3_bucket" "mys3" {
  bucket = "my-tf-test-bucket-pv2123"

  tags = {
    Name        = "My bucket"
    Environment = "Dev"
  }
}
```

- run below **commands**
```
terraform init
terraform apply --auto-approve
```
- destroy resource
```
terrafrom destroy --auto-approve
```

# Create multiple VMs
- create 3 vms with output message
```
resource "aws_instance" "id1" {
  ami           = "ami-0b6c6ebed2801a5cb"
  instance_type = "t3.micro"
  count = 3

  tags = {
    Name = "HelloWorld"
  }
}

output "instance_id" {
    value = aws_instance.id1[*].id
}
```
- list down all created resources
```
terraform state list
```
- detail of particular resource
```
state show aws_s3_bucket.mys3
```

- delete particular instance
```
terraform destroy -target=aws_instance.id1[1]
```

- Recreate (replace) a specific instance
```
terraform apply -replace=aws_instance.id1[1]
```


# variable use
- declare variable and call its value

```
variable "inst_type"{
  default = "t3.micro"

}

variable "ami_id"{
   default = "ami-0b6c6ebed2801a5cb"
}

resource "aws_instance" "id1" {
  ami           = var.inst_type
  instance_type = var.ami_id
  count = 3

  tags = {
    Name = "HelloWorld"
  }
}

output "instance_id" {
    value = aws_instance.id1[*].id
}
```

# data
- scenario:
  - AMI ID will change for each region.
  - Manually go and pick AMI IDs is tedious task.
  - data will pick latest ami id of given region. Example latest AMI ID of Ubuntu
  - data is used to fetch ami id only
```
variable "inst_type" {
  default = "t3.micro"

}

data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical
}
resource "aws_instance" "id1" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.inst_type
  count = 1

  tags = {
    Name = "HelloWorld-autoami"
  }
}

output "instance_id" {
    value = aws_instance.id1[*].id
}
```
