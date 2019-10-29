# Configure the OpenStack Provider
provider "openstack" {
  version                       = "~> v1.19.0"
  domain_name                   = var.domain_name
  user_domain_name              = var.user_domain_name != "" ? var.user_domain_name : var.domain_name
  auth_url                      = var.auth_url
  region                        = var.region
  application_credential_name   = var.application_credential_name
  application_credential_id     = var.application_credential_id
  application_credential_secret = var.application_credential_secret
}

module "vpc" {
  source  = "./vpc"
  petname = random_pet.pet.id
}

module "instance" {
  instance_name = "vm"
  source        = "./instance"
  sec_id        = module.vpc.sec_id
  petname       = random_pet.pet.id
}

output "ip" {
  value = module.instance.ip
}
