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

function appendPosts(posts) {
  for(var i = 0; i < posts.data.length; i++) {
    //adds posts to page
    if(posts.data[i].description !== undefined){
      $("<div class='post' id='post-"+i+"'><div id='name'><a href='"+posts.data[i].link+"'><h3>"+posts.data[i].name+"</h3></a></div></div></br>").appendTo('#posts');
    }
  }
}

function appendLikes(likes) {
  // adds likes to page
  for(var i = 0; i < likes.data.length; i++) {
    $("<div id='like'>"+likes.data[i].name+': '+likes.data[i].category+"</div>").appendTo('#likes');
  }
}

function loadListeners() {
  // loads hover event listener, adds iframe when article title gets hovered over
  $('h3').mouseenter(function(e) {
    $('.post-hover').remove();
    var post = $(e.target).parent().parent().parent()
    var postID = post[0].id.split('-')[1]
    var message = posts.data[postID].message.split('http')[0]
    var description = posts.data[postID].description
    var picture = posts.data[postID].picture
    link = posts.data[postID].link
    $("<iframe src='"+link+"' class='post-hover'></iframe>+").fadeIn(1000).appendTo('#article-space');
  })
}

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



function getLikes() {
  $("<div id='likes'></div>").appendTo('#contents');
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
