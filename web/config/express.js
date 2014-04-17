/*!
 * Module dependencies.
 */

 var express = require('express')
 var env = process.env.NODE_ENV || 'development'

/*!
 * Expose
 */

 module.exports = function (app, config) {

  app.set('showStackError', true)
  app.use(express.static('public'))
  // all environments
  app.set('port', process.env.PORT || 5000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  //app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.cookieParser());
  
  // bodyParser should be above methodOverride
  app.use(express.bodyParser())
  app.use(express.methodOverride())

  // routes should be at the last
  app.use(app.router)

  // custom error handler
  app.use(function (err, req, res, next) {
    console.log('in custom error handler')
    console.error(err.stack)
    res.send(500, { error: 'Something blew up!' });
  })


  app.use(function (req, res, next) {
    res.status(404);
  })

}
