<?php
/*
 * DataCache
 *
 * This class can:
 * 1) read data from a source
 * 2) write data to an output file for local caching
 *
 * @author: John Pascual <john@healthypixel.com>
 */

class DataCache {
    private $source_url;
    private $output_file;
    private $data;

    /**
     * Constructor
     *
     * @param str $url URL for data source
     * @param str $file Filename where data will be written
     */
    public function __construct($url, $file) {
        $this->source_url = $url;
        $this->output_file = $file;
    }

    /**
     * @return str Data from source URL
     */
    public function fetch_source() {
        $curl = curl_init();
        $timeout = 10;
        curl_setopt($curl, CURLOPT_URL, $this->source_url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, $timeout);
        $this->data = curl_exec($curl);
        return($this->data);
    }

    /**
     * @return str Data from the cache file
     */

    public function get_cache() {
        return file_get_contents($this->output_file);//$this->data;
    }

    /**
     * Write output to destination file
     */
    public function write_cache() {
        if ($this->data) {
            $file_handle = fopen($this->output_file, 'w') or die('Cannot open output file.');
            $output = fwrite($file_handle, $this->data);
            fclose($file_handle);
        }
    }

    /**
     * @return date Get Unix timestamp when output file was modified
     */
    public function get_cache_modification_time() {
        clearstatcache();
        return filemtime($this->output_file);
    }

    /**
     * @param int Window of time in hours
     * @return boolean Returns true if modification time is within specified window
     */
    public function is_cache_recent($window=86400) {
        if (($this->get_cache_modification_time()) > strtotime('-'.$window.' sec')) {
            return true;
        } else {
            return false;
        }
    }
    
    public function cache_exists(){
        return file_exists($this->output_file);
    }

}
    $url = 'http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
    $cache = new DataCache($url,'cache/likes.json');
    

?>

<?php
/*
 * TEST OF CLASS
 */
?>
<?php
/*
<h1>BEFORE CALL TO FETCH AND WRITE</h1>
<p><?php echo $cache->cache_exists()?'cache file exists':'cache file does not exist'; ?></p>
<p><?php echo $cache->get_cache()?$cache->get_cache():'no data exists'; ?></p>
<p><?php echo $cache->get_cache_modification_time()?"file modified: ". date('Y-m-d H:i:s',$cache->get_cache_modification_time()):'file never modified' ?></p>
<p><?php echo $cache->is_cache_recent(24)?'cache recent':'cache expired' ?></p>

<?php
//$cache->fetch_source();
//$cache->write_cache();
?>

<h1>AFTER CALL TO FETCH AND WRITE</h1>
<p><?php echo $cache->cache_exists()?'cache file exists':'cache file does not exist'; ?></p>
<p><?php echo $cache->get_cache()?$cache->get_cache():'no data exists'; ?></p>
<p><?php echo $cache->get_cache_modification_time()?"file modified: ". date('Y-m-d H:i:s',$cache->get_cache_modification_time()):'file never modified' ?></p>
<p><?php echo $cache->is_cache_recent(24)?'cache recent':'cache expired' ?></p>

*/
?>