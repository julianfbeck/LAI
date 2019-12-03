data "openstack_images_image_v2" "ubuntu" {
  name = "Ubuntu 16.04"
  properties = {
    ssh-user = "ubuntu"
  }
}

data "template_file" "userdata" {
  template = "${file("${path.module}/templates/userdata.yml")}"

  vars = {
    DOCKER_PASSWORD = "${var.DOCKER_PASSWORD}"
    DOCKER_USERNAME = "${var.DOCKER_USERNAME}"
    
  }
}
