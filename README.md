# Challenge for Frontend Engineer
To better assess a candidates development skills, we would like to provide the following challenge.  You have as much time as you'd like (though we ask that you not spend more than a few hours).

## Submission Instructions
1. First, fork this project on github.  You will need to create an account if you don't already have one.
1. Next, complete the project as described below within your fork.
1. Finally, push all of your changes to your fork on github and submit a pull request.  Email us at info@citizennet.com to review your solution.

## Project Description
A large part of our company is retrieving data from various APIs and representing this data directly or indirectly to the user. One problem with coding for any API is you have to plan for outage. Your task is to write a program to reliably pull Posts and Likes json files from the provided API, and represent this data in a web app for the user.

Here's what your web-based application must do:

1. Write two separate programs that can be run nightly to pull the API information and cache the results to disk. Plan for more programs to be developed that will follow the same pattern, so code it modularity and in sound OOP design. Additionally, code for redundancy, the below API resources are on an commodore 64 with bad wiring, so you might experience 503 errors.
1. Develop an interactive, user friendly web page to display the Post and Like data that was pulled and cached to disk. The direction is left to you, but it has to be creative and interactive. Additional external API usage only adds points

## Programming Requirements and Limits:
1. php 5.3+
1. javascript
1. jquery
1. html
1. css

## API Resources:
1. http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6
1. http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6

## How To Run? 
Install node js; run npm install; run node server/server.js from the project directory; go to http://localhost:8080
