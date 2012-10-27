<?php
/*
 * DataCacherTest
 *
 * This class tests DataCacher.php
 */
require '../DataCacher.php';

class DataCacherTest extends PHPUnit_Framework_TestCase {
    var $data_cacher;
    var $posts_data_url;

    public function setUp() {
        $this->posts_data_url = 'http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
        $this->data_cacher = new DataCacher($this->posts_data_url);
    }

    public function test_get_data() {
        $this->assertNull($this->data_cacher->get_data());
    }

}
 ?>
