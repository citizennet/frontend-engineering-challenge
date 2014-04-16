class LikesController < ApplicationController
  def get_likes
    likes = Rails.cache.fetch(:likes) { HTTParty.get('http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6').to_json }
    if likes.include?("error")
      Rails.cache.delete(:likes)
      get_likes
    else
      render json: likes
    end
  end
end