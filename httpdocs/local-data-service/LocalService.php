<?php
require_once 'DataCache.php';

class LocalService {
    private $cache;
    private $cache_file;
    private $query;
    const CACHE = '/cache/';

    public function __construct($url) {
        $this->query = $this->parse($url);
        $this->cache_file = dirname(__FILE__) . LocalService::CACHE . $this->query['file'];
        $this->cache = new DataCache($url, $this->cache_file);
    }

    /**
     * Generic for now, should think about how to build this out to
     * accept parameters via $_GET
     * @return str Returns raw text file from cache
     */
    public function get_data() {
        if (!$this->cache->cache_exists() || !$this->cache->is_cache_recent()) {
            $this->update_cache();
        }
        return $this->cache->get_cache();
    }

    private function update_cache() {
        $temp = $this->cache->fetch_source();
        if (LocalService::validate_source($temp)) {
            $this->cache->write_cache();
        }
    }

    /**
     * Validate source data
     * @return boolean Returns true if JSON contains 'data' field
     */
    public static function validate_source($str) {
        $json = json_decode($str);
        return isset($json->data);
    }

    private function parse($url) {
        $data = parse_url($url);
        $query_raw = preg_split('/[;&]/', $data['query']);
        $query = array();
        foreach ($query_raw as $query_temp) {
            $tmp = preg_split('/=/', $query_temp);
            $query[$tmp[0]] = $tmp[1];
            //improve this parse function later to be more flexible with URL
        }
        return $query;
    }

}
?>
<?php
/*
 * TEST OF CLASS
 */
?>

<?php
/*
$likes = 'http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
$service = new LocalService($likes);
$json = $service->get_data();
print_r(json_decode($json));

$posts = 'http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
$posts_service = new LocalService($posts);
$json = $posts_service->get_data();
print_r(json_decode($json));
*/
?>
