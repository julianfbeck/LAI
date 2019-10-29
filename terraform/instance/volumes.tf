# Data Volume
resource "openstack_blockstorage_volume_v2" "my-volume" {
  name = "my-volume-${var.petname}"
  size = "5"

  lifecycle {
    prevent_destroy = false
  }
}

resource "openstack_compute_volume_attach_v2" "my-attachment" {
  instance_id = "${openstack_compute_instance_v2.my-instance.id}"
  volume_id   = "${openstack_blockstorage_volume_v2.my-volume.id}"
}
