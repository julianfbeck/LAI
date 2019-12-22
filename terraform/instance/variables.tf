variable "flavor" {
  default = "m1.large"
}

variable "sec_name" {
  type = string
}

variable "petname" {
  type = string
}

variable "instance_name" {
  type = string
}

variable "DOCKER_USERNAME" {
  type = string
}

variable "DOCKER_PASSWORD" {
  type = string
}

variable "REPOSITORY_PATH" {
  type = string
}

variable "SSL_POLICY" {
  type = string
}

variable "ENABLE_IPV6" {
  type = string
}

variable "CERTS_PATH" {
  type = string
}

variable "DNS_HOST" {
  type = string
}

variable "DNS_USERNAME" {
  type = string
}

variable "DNS_PASSWORD" {
  type = string
}
