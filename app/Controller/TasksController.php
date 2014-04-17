<?php
App::uses('HttpSocket', 'Network/Http');
App::uses('File', 'Utility');
App::uses('Folder', 'Utility');

class TasksController extends AppController {
    var $api = 'http://rack1.citizennet.com/interviewtest/api'; //the API url
    var $access_token = 'AAAAAL2uajO8BAPcqOwZB6'; //the API access token
    var $attempts = 0; //keeps track of the number of times we've tried to access the API server per task
    var $max_attempts = 5; //the number of attempts to make before giving up on trying to access the API server
    var $attempt_delay = 5; //$attempts * $attempt_delay determines the number of seconds to wait if the API server is not responding (e.g. 1 * 5 = 5 seconds, 2 * 5 = 10 seconds, etc...)
    var $http; //the instance variable for our HTTPSocket
    
    /*
     * Handy work to perform before any controller actions are called
     */
    public function beforeFilter() {
        parent::beforeFilter();
        $this->http = new HttpSocket();
        $this->theme = 'travelfly';
    }
    
    /*
     * Responsbile for managing the API request process.
     * 
     */
    private function process($file = null) {
        $this->attempts++;
        if(empty($file)) {
            $error = "Unknown file.";
            throw new Exception('<b>Error:</b> ' . $error . ' (line <b>'.__LINE__.'</b>)');
        } elseif($this->attempts > $this->max_attempts) {
            $error = $this->max_attempts . " attempts failed to retrieve {$file}.json. Is service available?";
            throw new Exception('<b>Error:</b> ' . $error . ' (line <b>'.__LINE__.'</b>)');
        } else {
            $uri = $this->api . '?' . http_build_query(array('file' => $file . '.json', 'access_token' => $this->access_token));
            $response = $this->http->get($uri);
            if($response->code == '200') {
                if(empty($response->body)) {
                    $error = 'No data available';
                    throw new Exception('<b>Error:</b> ' . $error . ' (line <b>'.__LINE__.'</b>)');
                }
                $body = json_decode($response->body);
                if(empty($body->data)) {
                    $error = 'No data available';
                    throw new Exception('<b>Error:</b> ' . $error . ' (line <b>'.__LINE__.'</b>)');
                }
                return $response->body;
            } else {
                $seconds = $this->attempts * $this->attempt_delay;
                #echo "{$file} failed, trying again in {$seconds} seconds... <br />";
                sleep($seconds);
                return $this->process($file);
            }
        }
    }
    
    /*
    * The getPosts program is responsible for retrieving the Posts
    */
    public function getPosts() {
        try {
            $res = $this->process('posts');
            $data = json_decode($res);
            foreach($data->data as $obj) {
                $filename = 'files/posts/' . $obj->id . '.json';
                $file = new File($filename, true, 0644);
                $file->write(json_encode($obj));
                $file->close();
            }
            die('Finished retrieving posts');
        } catch (Exception $e) {
            echo $e->getMessage(), '<br />';
        }
    }
    
    /*
    * The getLikes program is responsible for retrieving the Likes
    */
    public function getLikes() {
        try {
            $fb = new FB();
            $res = $this->process('likes');
            $data = json_decode($res, true);
            foreach($data['data'] as $array) {
                $fbdata = $fb->api('/' . $array['id']);
                
                $array['caption'] = 'facebook.com';
                $array['description'] = $fbdata['about'];
                $array['picture'] = $fbdata['cover']['source'];
                $array['link'] = $fbdata['link'];
                $array['type'] = 'like';
                $array['created_time'] = false;
                $array['from'] = false;
                
                $filename = 'files/likes/' . $array['id'] . '.json';
                $file = new File($filename, true, 0644);
                
                $file->write(json_encode($array));
                $file->close();
            }
            die('Finished retrieving likes');
        } catch (Exception $e) {
            echo $e->getMessage(), '<br />';
        }
    }
    /*
     * The results function will display the results of the API pull on a creative, user-friendly page
     */
    public function results($rss = false) {
        $posts = $likes = array();
        $dir = new Folder('files/posts');
        $files = $dir->find('.*\.json');
        foreach ($files as $file) {
            $file = new File($dir->pwd() . DS . $file);
            $data = json_decode($file->read(), true);
            //debug($data);exit;
            $file->close();
            
            $posts[] = $data; 
        }
        
        $dir = new Folder('files/likes');
        $files = $dir->find('.*\.json');
        foreach ($files as $file) {
            $file = new File($dir->pwd() . DS . $file);
            $data = json_decode($file->read(), true);
            $file->close();

            $posts[] = $data; 
        }
        $this->set('posts', $posts);
        
        //debug($likes);exit;
        if ($rss) {
            $this->layout = 'rss/default';
            $this->response->type('xml');
            $this->render('rss/tasks_rss_results');
        } else {
            $this->render('tasks_results');
        }
    }
}