var createPostHtml = function(post) {
    var $post = $("<div class='post'></div>");

    $post.append($("<div class='message'></div>").text(post.message));

    // $post.append($("<img class='picture' src='" + post.picture + "' />"));

    if (post.status_type.indexOf('status') === -1) {
        $post.append($("<h2 class='name'><a href='" + post.link + "'>" + post.name + "</a></h2>"));
    }
    
    $post.append($("<p class='description'></p>").text(post.description));

    var $stats = $("<div class='stats'></div>");
    $stats.append(
        $("<div class='action'><a href='" + post.actions[1].link + "'>" + post.actions[1].name + "</a> " +
         ((post.likes !== undefined) ? post.likes.count : 0) + "</div>"));

    $stats.append(
        $("<div class='action'><a href='" + post.actions[0].link + "'>" + post.actions[0].name + "</a> " +
            post.comments.count + "</div>"));
    $post.append($stats);

    return $post;
};

$(function() {
    var $posts = [];

    $.getJSON("http://localhost:8888/frontend-engineering-challenge/Api.php?api=posts", function(data) {
        var posts = data.data;

        var $header = $("<div class='header'></div>");
        $header.append($("<h1 class='from'></h1>").text(posts[0].from.name + "'s Facebook Page"));
        $header.append($("<h3 class='category'></h3>").text(posts[0].from.category));

        $.each(posts, function(key, value) {
            $posts.push(createPostHtml(value));
        });

        $('.header').append($header.html());
        $('.posts').append($posts);
    });

    $.getJSON("http://localhost:8888/frontend-engineering-challenge/Api.php?api=likes", function(data) {
        var likes = data.data;
        var $list = $('<ul></ul>');
        var $likes = [];

        $.each(likes, function(key, value) {
            console.log(value);
            $likes.push($('<li></li>').text(value.name));
        });
        $('.likes').append($likes);
    });

});