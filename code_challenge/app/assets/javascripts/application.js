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

function getPosts() {
  $("<div id='posts'></div>").appendTo('#contents');
  $.getJSON('/posts', function(response) {
    posts = response;
  }).done(function() {
    appendPosts(posts);
  }).done(function() {
    loadListeners();
  })
}
function appendPosts(posts) {
  for(var i = 0; i < posts.data.length; i++) {
    if(posts.data[i].description !== undefined){
      $("<div class='post' id='post-"+i+"'><div id='name'><a href='"+posts.data[i].link+"'><h3>"+posts.data[i].name+"</h3></a></div></div></br>").appendTo('#posts');
    }
  }
}

function loadListeners() {
  $('h3').mouseenter(function(e) {
    $('.post-hover').remove();
    var post = $(e.target).parent().parent().parent()
    var postID = post[0].id.split('-')[1]
    $(this).parent().parent().append("<div class='post-hover'>"+posts.data[postID]+"<p>"+posts.data[postID].description<br?+"</p></div>")
  })
}

$( document ).ready(function() {
  getPosts();
}) // end doc ready
