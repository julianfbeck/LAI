data "openstack_images_image_v2" "ubuntu" {
  name = "Ubuntu 16.04"
  properties = {
    ssh-user = "ubuntu"
  }
}

data "template_file" "docker_compose_yml" {
  template = "${file("${path.module}/templates/docker-compose.yml")}"

  vars = {
    #proxy
    SSL_POLICY  = "${var.SSL_POLICY}"
    ENABLE_IPV6 = "${var.ENABLE_IPV6}"
    CERTS_PATH  = "${var.CERTS_PATH}"

    #lai
    DNS_HOST = "${var.DNS_HOST}"
  }
}

data "template_file" "run_sh" {
  template = "${file("${path.module}/templates/run.sh")}"

  vars = {
    DNS_KEY = "${var.DNS_KEY}"
    DNS_HOST = "${var.DNS_HOST}"
    REPOSITORY_PATH = "${var.REPOSITORY_PATH}"
    DOCKER_PASSWORD = "${var.DOCKER_PASSWORD}"
    DOCKER_USERNAME = "${var.DOCKER_USERNAME}"
  }
}

data "template_file" "userdata" {
  template = "${file("${path.module}/templates/userdata.yml")}"

  vars = {
    REPOSITORY_PATH       = "${var.REPOSITORY_PATH}"
    RUN_SH                = "${base64encode(data.template_file.run_sh.rendered)}"
    DOCKER_COMPOSE_YML    = "${base64encode(data.template_file.docker_compose_yml.rendered)}"
  }
}
