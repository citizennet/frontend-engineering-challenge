# Be sure to restart your server when you modify this file.

CodeChallenge::Application.config.session_store :cookie_store, key: '_code_challenge_session'
CodeChallenge::Application.config.session_store :redis_store, key: 'posts'