CodeChallenge::Application.routes.draw do
  root 'posts#index'
  get 'posts' => 'posts#api_call'
  get 'likes' => 'search#api_call'
end
