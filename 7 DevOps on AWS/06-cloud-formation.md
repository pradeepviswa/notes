- [Cloud Formation](#cloud-formation)
- [stack](#stack)
- [Change Set](#change-set)
- [Stack Set](#stack-set)
- [Drift Detection](#drift-detection)

# Cloud Formation
It is an AWS service that lets us model, provision and manage aws and third party resourcs by reating infra as code

## Template
it is a yaml file containing resoruces to be created in AWS

# stack
Is a collection of AWS resoruces created using yaml file.

# Change Set
Preview of changes we made in stack. It will not make any change in stack as of now

# Stack Set
extends stack across multiple AWS accounts and regions with a single CloudFormation template.

# Drift Detection
Detects whether actual resource configurations differe from the template's expected configuraiton.

