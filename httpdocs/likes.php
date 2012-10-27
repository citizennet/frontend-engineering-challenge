<?php
$likes = 'http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6';
?>    
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link href='http://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
        
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
        <div id="wrapper">
            <h1>Likes</h1>
            <nav>
                <a href="#" id="prev"><img src="img/prev-sprite.png" alt="Previous"/></a>
                <a href="#" id="next"><img src="img/next-sprite.png" alt="next"/></a>
            </nav>
            <div id="post-container">
                <img src="img/ajax-loader.gif" class="preloader" alt="Loading..."/>
                <p><noscript>Please enable Javascript.</br>This is the year <?php echo date('Y')?>.</noscript></p>
            </div>
            <div class="logo">
                <img src="img/pixel-speaking.png" alt="The Healthy Pixel"/>
            </div>
            

        </div>
        
        
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.2.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>
        <script>
            var postContainer = jQuery('#post-container');
            var prevBtn = jQuery('#prev img');
            var nextBtn = jQuery('#next img');
            var posts;
            var currentPost;
            
            jQuery.getJSON(
                'local-data-service',
                {url:'<?php echo $likes ?>'},
                handleLoadComplete
            );                
            
            
            function handleLoadComplete(data){
                setPostData(data);
                initButtons();
                currentPost = 0;
                displayPost(currentPost);
                prevBtn.fadeOut(0,function(){jQuery(this).addClass('hidden')});
            }
            
            function setPostData(data){
                posts = data['data'];
            }
            
            function getPost(num){
                return posts[num];
            }
            
            function displayPost(num){
                jQuery('.logo').removeClass('active');
                postContainer.fadeOut('slow',function(){
                    jQuery(this).empty();
                    var data = getPost(num);
                    postContainer.append('<p>'+ data['name'] +'</p>');
                    postContainer.append('<p>'+ data['id'] +'</p>');
                    postContainer.fadeIn('slow',function(){
                        jQuery('.logo').addClass('active');
                    });
                    
                });
                
            }
                        
            function initButtons(){
                enableBtn(prevBtn);
                enableBtn(nextBtn);
            }
            
            function enableBtn(btn){
                btn.click(handleBtnClick);
            }
            
            function disableBtn(btn){
                btn.click(nullBtnClick);
            }
            
            function nullBtnClick(e){
                e.preventDefault();
            }
            
            function handleBtnClick(e){
                e.preventDefault();
                switch(e.target){
                    case prevBtn[0]:
                        currentPost--;
                        if(currentPost>=0){
                            showBtn(nextBtn);
                        }
                        if(currentPost<0){
                            currentPost=0;
                            hideBtn(prevBtn);
                        }
                        displayPost(currentPost);
                        break;
                    case nextBtn[0]:
                        currentPost++;
                        if(currentPost<posts.length){
                            showBtn(prevBtn);
                        }
                        if(currentPost>=posts.length-1){
                            currentPost=posts.length-1;
                            hideBtn(nextBtn);
                        }
                        displayPost(currentPost);
                        break;  
                }

            }
            
            function showBtn(btn){
                if(btn.hasClass('hidden')){
                    btn.removeClass('hidden').fadeIn('slow');
                    enableBtn(btn);
                }
            }
            
            function hideBtn(btn){
                if(!btn.hasClass('hidden')){
                    disableBtn(btn);
                    btn.fadeOut('slow',function(){jQuery(this).addClass('hidden')});
                }
            }
            

            
        </script>
    </body>
</html>
