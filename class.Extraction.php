<?php

include_once 'interface.type.php';
require_once 'class.Simple_Cache.php';

class Extraction implements extractData{
	private $url;
	private $cache;
	private $number;
	private $time;

	function __construct($link,$count,$timeout){
		if(!$link){
			echo 'Please provide the link';
			exit();
		}
		$this->url = $link;
		$this->number = $count;
		$this->time = $timeout;
		$this->cache = new Simple_Cache();
	}

	public function getURL(){
		return $this->url;
	}

	function getJSON(){
		$count = 0;
		$data = $this->getData();
		while(array_key_exists('error', json_decode($data,true)) && $count<$this->number) {
				$data = $this->getData();
				$count++;
		}
		if(array_key_exists('error', json_decode($data,true))){
			$data = 'Data currently unavailable. Want to retry?';
			return $data;
		}
		
		if(!$data){
			$data = $this->checkCache();
			if(!$data){
				echo 'Data currently unavailable';
				exit();
			}	
		}
		$query = parse_url($this->url,PHP_URL_QUERY);
		$this->cache->write_cache($query, $data);
		return json_encode($data);
	}
	
	function getData(){
		$count = 0;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $this->url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT,$this->time);
		
		
			$data = curl_exec($ch);
		
		
		if(curl_errno($ch) == 0){
			return $data;
		}else{
			curl_close($ch);
			return FALSE;     	
		}
	}
	function checkCache(){
		if($this->cache->is_cached($this->url.'.json')){
			return $this->cache->read_cache($this->url.'.json');
		}else{
			return FALSE;
		}
	}
}






