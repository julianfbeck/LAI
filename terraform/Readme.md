# Terraform Basics

Terraform a tool to declaratively define infrastructure within a cloud environment e.g. Openstack which is used by BwCloud.
Required changes are determined by comparing the current state of cloud infrastructure with the desired configuration
specified in terraform files (`.tf`).
The current state of existing cloud infrastructure is saved in a so called state file (`.tfstate`).
As such a local state file can cause trouble because terraform might be run on different machines using different local states
leading to conflicts within cloud infrastructure changes.
The solution for this problem is a central terraform statefile saved using a remote backend, e.g. an object storage service.
This repository uses the IBM object storage service to save the terraform state.
For more information about how to setup a terraform remote state using IBM object storage look at [this blogpost](https://www.ibm.com/cloud/blog/store-terraform-states-cloud-object-storage).
After terraform has deployed the instance further configuration is done by the cloud-init component.
The cloud-init configurations of this project such as packages to install, shell commands to execute and
files(templates) to copy to the machine are located in `terraform/instance/templates/userdata.yml`.

## Project specific information

For simplification purposes a shell script located at `terraform/instance/templates/run.sh` will be copied to the created
instance to `/run.sh` containing shell commands to be executed. Immediately before it starts to run, an empty file
`/running` will be created. After the script finished successfully the `/running` file will be renamed to `/finished`.
To inspect the cloud-init logs take a look at `/var/log/cloud-init*` on the running instance.
By the usage of templates it is possible to replace variables within files with real values that should not be saved within
the repository. This is achieved by passing the secrets defined in the `terraform.tfvars` file into the modules defined
in the `main.tf` which are located in the directories `instance` and `vpc` (virtual private cloud).
Those modules contain variables defined in their `variables.tf` which can be filled in the `main.tf` and used within
the module.
Files to be templated are defined in `terraform/instance/data.tf` and the correspondent template files are located in the `terraform/instance/templates/` directory.

## Initialization
Fill in your credentials in terraform.tfvars and backend.tfvars, see the `.example` files.
The `terraform.tfvars` file contains secret variables used to configure the terraform infrastructure.
The `backend.tfvars` file contains the credentials to access the remote backend containing the terraform state.
An openstack keypair `hska-tgl-keypair` is required,
which has been created for the desired SSH key using horizon (the web GUI of openstack).

Initialize the project (creates a `.terraform` subdirectory with mandatory data):
```
terraform init --backend-config backend.tfvars
```

Create all resources:
```
terraform apply
```

Delete all resources:
```
terraform destroy
```

Get the instance ip:
```
terraform output ip
```

## Configuration
This project sets up a docker container containing an Learn Analytics in Ilias instance along with a reverse proxy
and a letsencrypt companion providing a TLS certificate for the domain `hska-tgl.dynu.net`.
All containers are provisioned using docker compose.
The docker compose configuration is located in `terraform/instance/templates/docker-compose.yml`.
It configures an nginx reverse proxy for the domain to automatically redirect port 80 to 443 which enforces encrypted
communication. By passing the docker socket to the reverse proxy it is able to inspect other running containers such
as the container using the desired `hskatgl/lai` image. The `VIRTUAL_HOST` environment variable defines which domains
should terminate onto this container, by default it will select port 80, however using the `VIRTUAL_PORT` variable
this can be configured as desired. The `SSL_POLICY` is configured to TLSv1.2 which is state of the art for encrypted
communication. The `LETSENCRYPT_HOST` environment variable defines the domain for which a TLS certificate should be
issued. It is read by the letsencrypt companion container which will check whether a valid certificate exists and
issue a new one if necessary which is saved in the `certs` volume.
The reverse proxy supports IPv6 which is enabled using the `ENABLE_IPV6` variable.

## Remaining tasks
### Save letsencrypt certificate
The letsencrypt certificate is issued after each recreation of the instance which can be a problem because the certificate
is currently not saved causing a recreation every time. Let's Encrypt Certificates are currently limited to 10 new
certificates per week for the same domain which will cause an error at the 11th time.
The certificate can either be saved on a cinder storage volume that can be mounted every time the instance is started
or on an external storage e.g. an object storage or an artifactory to load the certificates after launching the instance.
Another option would be to save the certificate locally and pass it as a template to the instance. Note that letsencrypt
certificates expire after 90 days as they should be renewed automatically. Another variable that can be passed to the
letsencrypt companion container is the `LETSENCRYPT_EMAIL`. The email address set within this variable will be contacted
by Let's Encrypt before the certificate is about the expire if it is not renewed in time.

## References

The docker compose setup is based on a nextcloud example:
https://github.com/nextcloud/docker/blob/master/.examples/docker-compose/with-nginx-proxy/mariadb/apache/docker-compose.yml

More information about the nginx reverse proxy:
https://github.com/jwilder/nginx-proxy

More information about the letsencrypt companion:
https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion

