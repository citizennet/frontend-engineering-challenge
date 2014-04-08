<!DOCTYPE unspecified PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

<?php
	require_once 'class.Extraction.php';
	
	$posts = new Extraction('http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6', 3, 5); 
	$post2 = $posts->getJSON();
	$likes = new Extraction('http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6', 3, 5);
	$like = $likes->getJSON();
	
?>

<script type="text/javascript">

	function Posts(){
		var data2 = <?php echo json_decode($post2);?>;
		$('.likes').text('');
		$('.posts').text('');
		 var createPostHtml = function(post) {
			         var $post = $("<div class='post'></div>");
			 		 $post.append($("<div class='thumbnail'></div>"));
			 		
			         $post.append($("<div class='message'></div>").text(post.message));
			 		
			         if (post.status_type.indexOf('status') === -1) {
			        	 $post.append($("<h2 class='name'><img src='"+post.icon+"' alt=''>"+"  "+"<a href='" + post.link + "'>" + post.name + "</a></h2>"));
			         }
			         $post.append($("<div class='caption'></div>").text(post.caption));
			         $post.append("<br/>");
			         $post.append($("<p class='description'></p>").text(post.description));
			         var $actions = $("<div class='actions'></div>");
			         $actions.append(
			        		 $("<div class='action'><a href='" + post.actions[1].link + "'>" + post.actions[1].name + "</a> "+ 
			              ((post.likes !== undefined) ? post.likes.count : 0) +'</a>'+ "</div>"));
			 
			         $actions.append(
			        		 $("<div class='action'><a href='" + post.actions[0].link + "'>" + post.actions[0].name + "</a> " + 
			                 post.comments.count + "</div>"));
			         $post.append($actions);
			
			         return $post;
			     };
			 
			    
			             var posts = data2.data;
			             var $posts = [];
			 
			             $.each(posts, function(key, value) {
			                 $posts.push(createPostHtml(value));
			             });
			
			             $('.posts').append($posts);
			        
	}

	
	function Likes(){
	
		var data = <?php echo json_decode($like)?>;
		var likes = data.data;
		var $likes = [];
		$('.likes').text('');
		$('.posts').text('');
		$.each(likes, function(key, value) {
			$likes.push('<h3>'+value.name+'</h3>');
			$likes.push($('<h4></h4>').text(value.category));
		   });
		   
		$('.likes').append($likes);
	}	
</script>
</head>

</html>
