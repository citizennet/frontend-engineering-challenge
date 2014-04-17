$(function() {
    // get posts
    var posts = new Posts();
    posts.render();
    // get likes
    var likes = new Likes();
    likes.render();
});