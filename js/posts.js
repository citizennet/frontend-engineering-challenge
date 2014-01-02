function Posts() {
    var createPostHtml = function(post) {
        var $post = $("<div class='post'></div>");

        $post.append($("<div class='message'></div>").text(post.message));

        // $post.append($("<img class='picture' src='" + post.picture + "' />"));

        if (post.status_type.indexOf('status') === -1) {
            $post.append($("<h2 class='name'><a href='" + post.link + "'>" + post.name + "</a></h2>"));
        }
        
        $post.append($("<p class='description'></p>").text(post.description));

        var $actions = $("<div class='actions'></div>");
        $actions.append(
            $("<div class='action'><a href='" + post.actions[1].link + "'>" + post.actions[1].name + "</a> " +
             ((post.likes !== undefined) ? post.likes.count : 0) + "</div>"));

        $actions.append(
            $("<div class='action'><a href='" + post.actions[0].link + "'>" + post.actions[0].name + "</a> " +
                post.comments.count + "</div>"));
        $post.append($actions);

        return $post;
    };

    var render = function() {
        $.getJSON("http://localhost:8888/frontend-engineering-challenge/Api.php?api=posts", function(data) {
            var posts = data.data;
            var $posts = [];

            var $header = $("<div class='header'></div>");
            $header.append($("<h1 class='from'></h1>").text(posts[0].from.name + "'s Facebook Page"));
            $header.append($("<h3 class='category'></h3>").text(posts[0].from.category));

            var mostLiked;
            var mostCommented;

            $.each(posts, function(key, value) {
                // find most liked and most commented
                if (key === 0) {
                    mostLiked = value;
                    mostCommented = value;
                } else {
                    if (value.likes !== undefined) {
                        if (value.likes.count > mostLiked.likes.count) {
                            mostLiked = value;
                        }
                    }

                    if (value.comments.count > mostCommented.comments.count) {
                        mostCommented = value;
                    }
                }

                $posts.push(createPostHtml(value));
            });

            $('.header').append($header.html());
            $('.posts').append($posts);
            $('.mostlikes').append($("<a href='" + mostLiked.link + "'>" + mostLiked.message + ": " + mostLiked.likes.count + "</a>"));
            $('.mostcomments').append($("<a href='" + mostCommented.link + "'>" + mostCommented.message + ": " + mostCommented.comments.count + "</a>"));
        });
    };

    return {
        render: render
    };
}