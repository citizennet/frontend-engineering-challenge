<!DOCTYPE unspecified PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
          <title>CitizenNet</title>
          <link rel="stylesheet" href="css/style.css">
		  <script type="text/javascript" src='js/index.js'></script>
		  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

     </head>
  
      <body>
      <?php
       require_once 'class.Demo.php';?>
       
        <div class="jumbotron" style="height:150px;background-color:#3B5998;color:#fff">
  			<h2>Hello, world! Welcome to CitizenNet FB</h2>
 			 <p>...</p>
		</div>
          <div class="container">
              <div class="header"></div>
              <div class="data">
              <ul class="nav nav-tabs nav-justified">
                  <li id="like">
                  
                  <a onclick="Likes()">
                      <h2>Page Likes</h2>
                  </a>
                  </li>
                  <li id="post">
                  <a onclick="Posts()">
                      <h2>Page Posts</h2>
                  </a>
                  </li>
              </ul>
              </div>
             <div class="posts"></div>
              <div class="likes"></div>
          </div>
      </body>
</html>