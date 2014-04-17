
/*!
 * Module dependencies.
 */

var path = require('path')
var rootPath = path.resolve(__dirname + '../..')

/**
 * Expose config
 */

module.exports = {
  development: {
    root: rootPath,
    db: 'mongodb://heroku:heroku@paulo.mongohq.com:10067/app21312780'//'mongodb://xx.xxx.xx.xxx/dbname:27017'
  },
  test: {
    root: rootPath,
    db: 'mongodb://localhost/dev'
  },
  staging: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  },
  production: {
    root: rootPath,
    db: process.env.MONGOHQ_URL
  }
}
