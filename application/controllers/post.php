<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Post extends CI_Controller {
    
    public function __construct()
	{	
		parent::__construct();
        $this->load->model("citizennet_model");
	}
    
	public function index()
	{
        $links=null;
        $linksobj=null;
        $posts = null;
        $postsobj = null;
        $linksobj = $this->citizennet_model->getLikes(); 
        $postsobj = $this->citizennet_model->getPosts();
        if($linksobj)
	       $links = $linksobj;
        if($postsobj)   
            $posts = $postsobj; 
        $data = array("links"=>$links,"posts"=>$posts);
		$this->load->view('post_view',$data);
	}
}