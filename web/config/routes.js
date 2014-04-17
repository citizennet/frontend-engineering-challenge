var  express = require('express')
module.exports = function (app) {
    // user route handlers
    var posts = require('../controllers/postHandlers')

    app.get('/posts',posts.findAll);
    app.get('/post/:id',posts.findById);
    app.get('/post/find',posts.find);
    //app.post('/post',users.create);
    //app.put('/users/:id',users.update);
    //app.delete('/users/:id',users.delete);
}
