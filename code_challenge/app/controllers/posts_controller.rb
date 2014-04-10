class PostsController < ApplicationController
  
  def index
  end


  def api_call
    posts = Rails.cache.fetch(:posts) { HTTParty.get('http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6').to_json }
    if posts.include?("error")
      Rails.cache.delete(:posts)
      api_call
    else
      render json: posts
    end
  end
end