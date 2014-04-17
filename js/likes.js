function Likes() {
    var render = function() {
        $.getJSON("http://localhost:8888/frontend-engineering-challenge/Api.php?api=likes", function(data) {
            var likes = data.data;
            var $list = $('<ul></ul>');
            var $likes = [];

            $.each(likes, function(key, value) {
                $likes.push($('<li></li>').text(value.name));
            });
            $('.likes').append($likes);
        });
    };

    return {
        render: render
    };
}