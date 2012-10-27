<?php
require_once 'LocalService.php';

$service = new LocalService($_GET['url']);
echo $service->get_data();
?>