<?php

class Simple_Cache{
	
	public $cache_expires = 3600;
	//Path to Cache folder
	public $cache_folder = 'Cache/';
	
	
	function is_cached($file){
		global $cache_folder, $cache_expires;
		$cachefile = $cache_folder.$file;
		$cachefile_created = (file_exists($cachefile)) ? @filemtime($cachefile) : 0; 
		return ((time() - $cache_expires) < $cachefile_created);
	}
		
	function read_cache($file){
		global $cache_folder;
		$cachefile = $cache_folder.$file;
		return file_get_contents($file);
	}
	
	function write_cache($file,$value){
		$cachefile = $this->cache_folder.$file;
		$fp = fopen($cachefile, 'w');
		fwrite($fp,$value);
		fclose($fp);
	}
}

