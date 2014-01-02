<!DOCTYPE HTML>
<html>
	<head>
		<title>Citizennet</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="" />
		<meta name="keywords" content="" />
		<link href="http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic,700|Open+Sans+Condensed:300,700" rel="stylesheet" />
		<script src="js/jquery-1.8.3.min.js"></script>
		<script src="css/5grid/init.js?use=mobile,desktop,1200px,1000px&amp;mobileUI=1&amp;mobileUI.theme=none"></script>
		<noscript>
			<link rel="stylesheet" href="css/5grid/core.css" />
			<link rel="stylesheet" href="css/5grid/core-desktop.css" />
			<link rel="stylesheet" href="css/5grid/core-1200px.css" />
			<link rel="stylesheet" href="css/5grid/core-noscript.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-desktop.css" />
			<link rel="stylesheet" href="css/style-1200px.css" />
		</noscript>
        <script type="text/javascript">
        $(function() {
            $(".user-likes").css("display","none");
            $(".likes-link").live("hover",function(){
                $(".user-likes").css("display","none");
                $(this).closest(".article-post").find(".user-likes").css("display","block");
            });
            $(".likes-link").live("mouseout",function(){
                $(".user-likes").css("display","none");
            });
            
            $(".comments-likes").css("display","none");
            $(".comments-link").live("hover",function(){
                $(".user-comments").css("display","none");
                $(this).closest(".article-post").find(".user-comments").css("display","block");
            });
            $(".comments-link").live("mouseout",function(){
                $(".user-comments").css("display","none");
            });
        });
        </script>
	</head>
	<body class="left-sidebar">
		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Content -->
					<div id="content" class="mobileUI-main-content">
						<div id="content-inner">
					       <?php if(isset($posts->data)) { ?> 
                                <?php foreach($posts->data as $postval){ ?>
                                            
							<!-- Post -->
								<article class="is-post is-post-excerpt article-post">
									<header>
										<span class="byline"><?php if(isset($postval->name)) echo $postval->name; else echo "&nbsp;"; ?></span>
									</header>
									<div class="info">
										<span class="date"><span class="month"><?php echo date("M",strtotime($postval->created_time)); ?></span> <span class="day"><?php echo date("d",strtotime($postval->created_time)); ?></span><span class="year">, 2013</span></span>
										<ul class="stats">
											<li><a href="javascript:;" class="link-icon24 link-icon24-1 comments-link"><?php if(isset($postval->comments->count)) echo $postval->comments->count; ?></a></li>
											<li><a href="javascript:;" class="link-icon24 link-icon24-2 likes-link"><?php if(isset($postval->likes->count)) echo $postval->likes->count; else echo "0"; ?></a>
                                                </li>
										</ul>
                                            
									</div>
                                    <?php 
                                    
                                    if(isset($postval->type) && $postval->type=="video")
                                    {
                                        ?>
                                       <object width="500" height="350"
                                            classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
                                            codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0">
                                            <param name="SRC" value="<?php echo $postval->source; ?>">
                                            <param name="play" value="false">
                                            <embed src="<?php echo $postval->source; ?>" width="500" height="350"  play="false" flashvars="autoplay=false&play=false&autostart=true" ></embed>
                                       </object>
                                        <?php
                                    }
                                    ?>
									<p>
										<?php   if(isset($postval->message)) 
                                                {
                                                    if(isset($postval->link))
                                                        echo str_replace($postval->link,"",$postval->message);
                                                    else
                                                        echo $postval->message;
                                                    
                                                }
                                          ?>
                                          </p>
                                          <p>
                                          <?php
                                                if(isset($postval->description)) 
                                                {
                                                    echo $postval->description;
                                                    
                                                    
                                                    if(isset($postval->link))
                                                    {
                                                        echo " <a href='".$postval->link."' target='_blank'>Read more</a>";
                                                    }
                                                }
                                        ?>
									</p>
                                    <p>
                                        <img src="<?php echo base_url("images/category.png"); ?>" class="cat-img-post" />  <a href="javascript:;"> <?php if(isset($postval->from->category)) echo $postval->from->category; ?></a>
                                    
                                    <br />
                                    </p>
                                    
                                    
                                    <?php if(isset($postval->likes->count) && $postval->likes->count>0){ ?>
                                        <div class="user-likes">
                                            <?php foreach($postval->likes->data as $postlikeval){ ?>
                                            <?php echo $postlikeval->name."<br />"; ?>
                                            <?php } ?>
                                        </div>
                                    <?php } ?>
                                    
                                    <?php if(isset($postval->comments->count) && $postval->comments->count>0){ ?>
                                        <div class="user-comments">
                                            <?php foreach($postval->comments->data as $postlikeval){ ?>
                                            <div class="comment-user-name"><?php echo $postlikeval->from->name; ?></div>
                                            <div class="comment-user"><?php echo $postlikeval->message; ?></div>
                                            <div class="comment-on"><?php echo date("Y-m-d", strtotime($postlikeval->created_time)); ?></div>
                                            <br />
                                            
                                            <?php } ?>
                                        </div>
                                    <?php } ?>
                                    
								</article>
						
							<?php } ?>
                        <?php } ?>

						</div>
					</div>

				<!-- Sidebar -->
					<div id="sidebar">
					
						<!-- Logo -->
							<div id="logo">
								<h1 class="mobileUI-site-name">Citizennet</h1>
							</div>
					
						<!-- Nav -->
							<nav id="nav" class="mobileUI-site-nav">
								<ul>
									<li class="current_page_item"><a href="#">Posts</a></li>
									<?php if(isset($links->data)) { ?> 
                                            <?php foreach($links->data as $linkval){ ?>
                                                <li><a href="#"><?php echo $linkval->name; ?></a></li>
                                            <?php } ?>
                                    <?php } ?>
								</ul>
							</nav>

					</div>
			</div>
	</body>
</html>