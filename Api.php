<?php
    ini_set('display_errors',1);
    ini_set('display_startup_errors',1);
    error_reporting(-1);

    include_once('DiskCache.php');

    class Api {
        private $base_url = 'http://rack1.citizennet.com/interviewtest/api?file=';
        private $token = '.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
        private $disk;

        function __construct() {
            $this->disk = new DiskCache();
        }

        private function url() {
            return $this->base_url . $_GET["api"] . $this->token;
        }

        private function serveJSON($data) {
            header('Content-Type: application/json');
            echo $data;
        }

        private function get_data($url) {
            $ch = curl_init();
            $timeout = 5;

            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);

            $data = curl_exec($ch);

            if (!curl_errno($ch)){ 
                return $data;
            } else{
                // echo 'Curl error: ' . curl_error($ch); 
                curl_close($ch);
                return FALSE;
            }
        }

        private function read_from_cache() {
            $data_cache = $this->disk->read('./json/', $_GET["api"] . '.json');

            if ($data_cache !== FALSE) {
                $this->serveJSON($data_cache);
            } else {
                echo '<br><h2>error! data cache is empty</h2>';
            }
        }

        public function serve() {
            $data = $this->get_data($this->url());
            $posts_json = json_decode($data, true);

            if ($data !== FALSE) {
                if (array_key_exists('error', $posts_json)) {
                    // if 503 serve from cache
                    $this->read_from_cache();
                } else {
                    $this->serveJSON($data);
                    // save to cache
                    $save_to_cache = $this->disk->write('./json/', $_GET["api"] . '.json', $data);
                }
            } else {
                // read from cache
                $this->read_from_cache();
            }
        }
        
    }

    $a = new Api();
    $a->serve();
?>