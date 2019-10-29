output "ip" {
  value = "${openstack_compute_instance_v2.my-instance.access_ip_v4}"
}