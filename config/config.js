module.exports = {
  development: {
    db: 'mongodb://heroku:heroku@paulo.mongohq.com:10067/app21312780',//'mongodb://xx.xxx.xx.xxx/dbname:27017',
    redis:{ url:'162.242.228.108',port:'6379',password:'new1pass'},
    api:[
      {
        name:'posts',
        processor: 'default',
        options:{
            hostname: 'http://rack1.citizennet.com',
            path: '/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6',
            method: 'GET'
        }
      },
      {
        name:'likes',
        processor: 'likesProcessor',
        options:{
            hostname: 'http://rack1.citizennet.com',
            path: '/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6',
            method: 'GET'
        }
      }
    ]
  },
  test: {
    db: 'mongodb://localhost/dev'
  },
  staging: {
    db: process.env.MONGOHQ_URL
  },
  production: {
    db: process.env.MONGOHQ_URL
  }
}
