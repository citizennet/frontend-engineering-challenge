<?php

    $this->set('documentData', array(
        'xmlns:dc' => 'http://purl.org/dc/elements/1.1/',
        'xmlns:content' => 'http://purl.org/rss/1.0/modules/content/',
        'xmlns:atom' => 'http://www.w3.org/2005/Atom'
    ));
    $this->set('channelData', array(
        'title' => __("Most Recent Posts"),
        'link' => $this->Html->url('/', true),
        'description' => __("Most recent posts."),
        'language' => 'en-us'
    ));


    foreach($posts as $index => $post) {
        switch($post['type']) {
            case 'status':
                $post['name'] = 'Facebook Status';
                $post['link'] = $post['actions'][0]['link'];
            break;
            case 'video':
            break;
        }
        
        $title = $post['name'];
        $postLink = $post['link'];
        if(isset($post['description'])) { $description = $post['description']; }
        elseif(isset($post['message'])) { $description = $post['message']; }
        elseif(isset($post['caption'])) { $description = $post['caption']; }
        elseif(isset($post['name'])) {    $description = $post['name']; }
        else {                            $description = ''; }
        $data = array(
            'title' => '<![CDATA[' . $title . ']]>',
            'link' => $postLink,
            'guid' => array('url' => $postLink, 'isPermaLink' => 'true'),
            'description' => '<![CDATA[' . $description . ']]>',
        );
        if($post['created_time']) {
            $data['pubDate'] = $post['created_time'];
        }
        $item = $this->Rss->item(array(), $data);
        echo $item;
        if($index == 16) {
            //debug($post);exit;
        }
    }
?>