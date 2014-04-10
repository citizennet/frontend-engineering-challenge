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
  $.getJSON('/posts', function(response) {
    posts = response;
  }).done(function() {
    appendPosts(posts);
  })
}
function appendPosts(posts) {
  for(var i = 0; i < posts.data.length; i++) {
    if(posts.data[i].description !== undefined){
      $("<div class='post' id='post-"+i+"'><div id='name'><h3>"+posts.data[i].name+"</h3></div></div>").appendTo('#posts');
    }
  }
}

$( document ).ready(function() {
  getPosts()
  $("<div id='posts'></div>").appendTo('#contents');
  $('div').on("mouseover", function(e) {
    if(e.target.class === 'post') {
      console.log('hi');
    }
  })
}) // end doc ready
