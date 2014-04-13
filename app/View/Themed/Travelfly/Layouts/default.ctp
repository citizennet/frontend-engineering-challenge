<!DOCTYPE html>
<html>
<head>
    <title><?php echo $title_for_layout; ?></title>
    <meta name="description" content="<?php echo $app['description']; ?>" />
    
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <?php echo $this->Html->css('bootstrap.min'); ?>
    <?php echo $this->Html->css('font-awesome.min'); ?>
    <?php echo $this->Html->css('theme-style.min'); ?>
    <?php echo $this->Html->css('custom-style'); ?>
    
    <link href="http://fonts.googleapis.com/css?family=Roboto+Slab:400,700,300,100" rel="stylesheet" type="text/css">
    <link href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,100italic,300italic,400italic,700,700italic,900italic,900,500italic,500" rel="stylesheet" type="text/css">
        
    <?php echo $this->Html->css('main'); ?>
</head>
<body class="home-template blog-author-multi" itemscope itemtype="http://schema.org/Blog">
    <div class="page-wrapper">
        <header id="header" class="bg-center bg-norepeat bg-stretch">
            <div class="filter header-inner">
                <div class="blog-branding">
                    <a href="http://travelfly.themelize.me" itemprop="url"><img src="http://citizennet.com/public/images/logo.svg?1394068456" alt="CitizenNet Logo" class="blog-img blog-img-logo" itemprop="image" /></a>
                    <h5 class="blog-description" itemprop="description"><?php echo $app['description']; ?></h5>
                </div>
                <div class="social-media"></div> 
            </div>
        </header>
        <div id="content">
            <main class="content-inner" role="main">
                <?php echo $this->fetch('content'); ?>
                <div class="content-bottom">
                    <div class="row">
                        <div class="col-md-12 text-right"><a href="#top" title="Back to the top" class="btn btn-default btn-no-bg top-link"><span class="sr-only">Back to the top </span><i class="fa fa-angle-up fa-lg"></i></a></div>
                    </div>  
                </div>
            </main>
        </div>
        <footer id="footer">
            <div class="footer-inner">
                <?php echo $this->Html->link('Subscribe via RSS <i class="fa fa-rss-square"></i>', array('controller' => 'tasks', 'action' => 'results', 'rss'), array('escape' => false, 'class' => 'rss-feed')); ?>
                <section class="copyright"><a href="http://travelfly.themelize.me/" target="_blank">Travelfly Ghost Theme</a> &copy; 2013 &bull; <br />All rights reserved.</section>
                <section class="themeby"><a class="icon-ghost" href="http://ghost.org">Ghost</a> theme by <a href="http://themelize.me">Themelize.me</a></section>
            </div>
        </footer>      
    </div>
    <!--Bootstrap Javascript -->
    <?php echo $this->Html->script('//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'); ?>
    <?php echo $this->Html->script('bootstrap.min'); ?>
    <?php echo $this->Html->script('script'); ?>
    <script>
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        function onYouTubeIframeAPIReady() {
            var players = document.getElementsByClassName('yt-player');
            for (var i = 0; i <= players.length -1; i++) {
                var videoId = players[i].getAttribute('data-video-id');
                var elementId = players[i].id;
                var player = new YT.Player(elementId, {
                    height: '390',
                    width: '640',
                    showInfo: "0",
                    videoId: videoId,
                    playerVars: {
                        showinfo: 0 ,
                        modestbranding: 1,
                        rel: 0,
                        allowfullscreen: 0,
                        playsinline: 1,
                        wmode: "opaque"
                    }
                });
            }
        }
    </script>
</body>
</html>