# Terraform on Openstack


## Initialization
Fill in your credentials in terraform.tfvars and backend.tfvars.
For more information about how to setup a terraform remote state using IBM object storage look at [this blogpost](https://www.ibm.com/cloud/blog/store-terraform-states-cloud-object-storage).

Create an openstack keypair `my-keypair` with your SSH key.

Initialize the project:
```
terraform init --backend-config backend.tf
```

Create all resources:
```
terraform apply --auto-approve
```

Delete all resources:
```
terraform destroy --auto-approve
```

Get the server ip:
```
terraform output ip
```
