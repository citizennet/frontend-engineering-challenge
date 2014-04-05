class PostsController < ApplicationController
  def index
    @posts = get_data('http://rack1.citizennet.com/interviewtest/api?file=posts.json&access_token=AAAAAL2uajO8BAPcqOwZB6')
    binding.pry
    @likes = get_data('http://rack1.citizennet.com/interviewtest/api?file=likes.json&access_token=AAAAAL2uajO8BAPcqOwZB6')
  end

  private

  def get_data(api_url)
    Rails.cache.fetch(:data) { HTTParty.get(api_url).to_s }
  end
end