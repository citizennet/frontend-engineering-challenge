CodeChallenge::Application.routes.draw do
  root 'posts#index'
  get 'posts' => 'posts#get_posts'
  get 'likes' => 'likes#get_likes'
end
