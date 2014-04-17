
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
, Schema = mongoose.Schema;


/**
 * User Schema
 */

var PostSchema = new Schema({
         "from": {
            "name": String,
            "category": String,
            "id": Number
         },
         "message": String,
         "picture": String,
         "link": String,
         "name": String,
         "caption": String,
         "description": String,
         "actions": [
            {
               "name": String,
               "link": String
            },
            {
               "name": String,
               "link": String
            }
         ],
         "type": String,
         "status_type": String,
         "application": {
            "name": String,
            "id": Number
         },
         "created_time": String,
         "updated_time": String,
         "likes": {
            "data": [
               {
                  "name": String,
                  "category": String,
                  "id": String
               }
            ],
            "count": Number
         },
         "comments": {
            "count": Number
         }

})


module.exports=PostSchema;

