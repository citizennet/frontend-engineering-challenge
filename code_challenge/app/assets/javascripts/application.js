// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var posts;
var likes;
//adds posts to page
function appendPosts(posts) {
  for(var i = 0; i < posts.data.length; i++) {
    if(posts.data[i].description !== undefined){
      $("<div class='post' id='post-"+i+"'><div id='name'><a href='"+posts.data[i].link+"'><h3>"+posts.data[i].name+"</h3></a></div></div></br>").appendTo('#posts');
    }
  }
}

function appendLikes(likes) {
  // adds likes to page
  // what to do with the likes was the most ambiguous part of the assignment for me
  for(var i = 0; i < likes.data.length; i++) {
    var link = "<a href='http://google.com/#q="+likes.data[i].name.replace(" ", "+")+"'>"+likes.data[i].name+"</a>";
    $("<div class='like'>"+link+': '+likes.data[i].category+"</div>").appendTo('#likes');
  }
}

function loadListeners() {
  // loads hover event listener, adds iframe when article title gets hovered over
  $('h3').mouseenter(function(e) {
    $('.post-hover').remove();
    var post = $(e.target).parent().parent().parent();
    var postID = post[0].id.split('-')[1];
    link = posts.data[postID].link
    // using iframe eventually seemed to be the most effective way to view article data
    // however it doesn't work for every single post...
    $("<iframe src='"+link+"' class='post-hover'></iframe>+").fadeIn(1000).appendTo('#article-space');
  })
}
//makes an AJAX request for post data, then runs append posts and loads event listeners
function getPosts() {
  $("<div id='posts'><h5 id='recent-posts'>Recent Posts:</h5></br></div>").appendTo('#contents');
  $.getJSON('/posts', function(response) {
    posts = response;
  }).done(function() {
    appendPosts(posts);
  }).done(function() {
    loadListeners();
  })
}
//makes an AJAX request for like data
function getLikes() {
  $("<div id='likes'><h5 id='recent-likes'>Likes: </h5></div>").appendTo('#contents');
  $.getJSON('/likes', function(response) {
    likes = response;
  }).done(function() {
    appendLikes(likes);
  })
}

$( document ).ready(function() {
  getPosts();
  getLikes();
}) // end doc ready
