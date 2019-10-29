resource "openstack_compute_instance_v2" "my-instance" {
  name            = "${var.instance_name}-${var.petname}"
  flavor_name     = "${var.flavor}"
  image_id        = "${data.openstack_images_image_v2.ubuntu.id}"
  key_pair        = "hska-tgl-keypair"
  security_groups = ["${var.sec_id}"]
  user_data       = "${data.template_file.userdata.rendered}"

  network {
    name = "public-belwue"
  }
}
