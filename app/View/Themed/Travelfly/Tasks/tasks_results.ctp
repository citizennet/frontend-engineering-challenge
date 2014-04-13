<?php
    #debug($posts);exit;
?>
<div id="posts">
    <?php
        foreach($posts as $post) {
            if($post['type'] == 'status') {
                $post['name'] = '';
                $post['caption'] = 'facebook.com';
                $post['link'] = $post['actions'][0]['link'];
                $post['picture'] = false;
            } elseif(stripos($post['link'], 'youtube.com/watch')) {
                preg_match('%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i', $post['link'], $match);
                $post['video_id'] = $match[1];
                $post['picture'] = false;//'http://img.youtube.com/vi/'.$video_id.'/hqdefault.jpg';
                $post['type'] = 'youtube';
                $post['player'] = '<div id="player"></div>';
                $post['name'] = '';
            } elseif(stripos($post['link'], 'www.livestream.com')) {
                $post['type'] = 'livestream';
                $post['picture'] = false;
                $post['source'] = str_replace('autoPlay=true', 'autoPlay=false', $post['source']);
            } elseif($post['type'] == 'video') {
                $post['caption'] = 'facebook.com';
                $post['picture'] = false;
            }
    ?>
                <article class="post tag-travelbum tag-tipstricks first odd animated fadeIn de-02">
                  <section class="row">  
                    <div class="col-md-10 col-md-push-2">
                      <div class="post-main">
                        <!-- Post date for mobile & multi author style -->
                        <span class="post-date blog-author-multi visible-xs visible-sm">
                            <?php echo ($post['created_time']) ? date('F d, Y', strtotime($post['created_time'])) : NULL; ?>
                        </span>      
                        
                        <!-- Post title & content -->
                        <h2 class="post-title">
                            <?php echo $this->Html->link($post['name'], $post['link'], array('escape' => false, 'target' => '_blank', 'title' => 'View post')); ?>
                        </h2>
                        <div data-title="View post" class="post-feature-media">
                            <?php
                                if($post['picture']) {
                                    echo '<p>';
                                    echo $this->Html->link(
                                        $this->Html->image($post['picture']),
                                        $post['link'],
                                        array('escape' => false, 'target' => '_blank')
                                    );
                                    echo '</p>';
                                } elseif($post['type'] == 'youtube') {
                                    echo '<div id="player-'.$post['video_id'].'" class="yt-player" data-video-id="'.$post['video_id'].'"></div>';
                                } elseif($post['type'] == 'livestream') {
                                    echo '<iframe width="560" height="340" src="'.$post['source'].'" id="iframeplayer" style="border:0;outline:0" frameborder="0" scrolling="no"></iframe>';

                                } elseif($post['type'] == 'video') {
                                    echo '<iframe src="http://www.facebook.com/video/embed?video_id='.$post['object_id'].'" height="320" width="540" frameborder="0"></iframe>';
                                }
                            ?>
                            <p><?php echo (isset($post['message']) && $post['message'] != @$post['description']) ? $post['message'] : NULL; ?></p>
                        </div>
                        <p class="post-excerpt post-content">
                            <?php echo (isset($post['description'])) ? $post['description'] : NULL; ?>
                            <br />
                            <?php echo $this->Html->link('Continue Reading', $post['link'], array('escape' => false, 'target' => '_blank', 'title' => 'View post', 'class' => 'post-view-link')); ?>
                        </p>
                      </div>
                    </div>
                    <div class="col-md-2 col-md-pull-10 post-meta">
                      <!-- Post date for desktop & single author style -->
                      <span class="post-date blog-author-single hidden-xs hidden-sm">
                        <?php echo ($post['created_time']) ? date('M d, Y', strtotime($post['created_time'])) : NULL; ?>
                      </span>
                      
                      <!-- Post author info -->
                      <!--Post author info block-->
                <div class="post-author post-author-mini blog-author-multi">
                  <h3 class="post-author-name">
                  <?php echo $this->Html->link($post['from']['name'], 'http://citizennet.com', array('escape' => false, 'title' => 'Go To Author Website')); ?>
                  </h3>
                  <p class="post-author-bio"><?php echo $post['from']['category']; ?></p> 
                </div>
                      
                <!-- Post tags -->
                <span class="post-tags">
                  <span class="post-tags-label">Posted on:</span>
                  <span class="post-tag"><?php echo $post['caption']; ?></span>
                </span>
                      
                <!-- Post share links -->
                <!--Post share widget-->
                <div class="post-share-widget">
                  Share it:
                  <ul class="post-share-links" role="menu">
                    <li>
                        <?php echo $this->Html->link('<i class="fa fa-twitter-square"></i><span class="sr-only">Twitter</span>', 'http://twitter.com/share', array('escape' => false, 'title' => 'Share post on Twitter', 'class' => 'post-share-twitter', 'data-toggle' => 'share', 'data-share-window-w' => '550', 'data-share-window-h' => '300', 'data-share-query' => 'text=' . $post['name'] . '&url=' . $post['link'])); ?>
                    </li>
                    <li>
                        <?php echo $this->Html->link('<i class="fa fa-facebook-square"></i><span class="sr-only">Facebook</span>', 'https://www.facebook.com/sharer/sharer.php', array('escape' => false, 'title' => 'Share post on Facebook', 'class' => 'post-share-facebook', 'data-toggle' => 'share', 'data-share-query' => http_build_query(array('u' => $post['link'])))); ?>
                    </li>
                    <li>
                        <?php echo $this->Html->link('<i class="fa fa-google-plus-square"></i><span class="sr-only">Google+</span>', 'https://plus.google.com/share', array('escape' => false, 'title' => 'Share post on Google Plus', 'class' => 'post-share-google', 'data-toggle' => 'share', 'data-share-window-w' => '500', 'data-share-window-h' => '420', 'data-share-query' => http_build_query(array('url' => $post['link'])))); ?>
                    </li>
                  </ul>
                </div>
                </div>    
              </section>
            </article>
    <?php
        }
    ?>
</div>

