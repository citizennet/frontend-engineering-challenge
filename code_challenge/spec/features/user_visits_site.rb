require_relative '../spec_helper'

describe 'a user visits the home page' do 
  it "should display posts" do 
    visit '/'
    expect(page).to have_css('#posts')
    expect(page).to have_css('#likes')
  end
end