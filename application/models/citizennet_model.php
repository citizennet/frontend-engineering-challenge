<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Citizennet_model extends CI_Model {
	
	/**
	 * Masters_model::__construct()
	 * 
	 * @return
	 */
	public function __construct()
	{	
		parent::__construct();		
	}
	
    public function getLikes()
    {
        $url = "http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6";
        // Initializing curl
        $ch = curl_init( $url );
        // Configuring curl options
        $options = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array('Content-type: application/json') ,
        );
        
        // Setting curl options
        curl_setopt_array( $ch, $options );
        
        // Getting results
        $json =  curl_exec($ch); // Getting JSON result string
        $json_output = json_decode($json);
        return $json_output;
    }
    
    public function getPosts()
    {
        $url = "http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6";
        // Initializing curl
        $ch = curl_init( $url );
        // Configuring curl options
        $options = array(
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => array('Content-type: application/json') ,
        );
        
        // Setting curl options
        curl_setopt_array( $ch, $options );
        
        // Getting results
        $json =  curl_exec($ch); // Getting JSON result string
        $json_output = json_decode($json);
        return $json_output;
    }
}
?>