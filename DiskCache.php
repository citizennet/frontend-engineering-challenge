<?php
    include_once('Cache.php');

    class DiskCache implements Cache {
        public function read($path, $filename) {
            return file_get_contents($path . $filename);
        }

        public function write($path, $filename, $data) {
            return file_put_contents($path . $filename, $data);   
        }
    }
?>