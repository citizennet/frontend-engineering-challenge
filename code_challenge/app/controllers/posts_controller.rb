class PostsController < ApplicationController
  
  def index
  end


  def get_posts
    posts = Rails.cache.fetch(:posts) { HTTParty.get('http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6').to_json }
    if posts.include?("error")
      Rails.cache.delete(:posts)
      get_posts
    else
      render json: posts
    end
  end
end