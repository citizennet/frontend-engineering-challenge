Citizennet::Application.routes.draw do
  root 'posts#index'
  resources :posts, only: [:index]
end
