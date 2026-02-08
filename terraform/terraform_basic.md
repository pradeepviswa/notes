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

# Lab
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
terraform apply --auto-approve
```

