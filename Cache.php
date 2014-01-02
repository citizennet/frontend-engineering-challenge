<?php
    interface Cache {
        public function read($path, $filename);
        public function write($path, $filename, $data);
    }
?>