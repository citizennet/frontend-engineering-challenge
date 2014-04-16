require_relative '../spec_helper'

describe 'a user visits the home page'do 
  it "should display posts", :js => true do 
    visit '/'
    expect(page).to have_css('#posts')
  end
  it "should display likes", :js => true do 
    visit '/'
    expect(page).to have_css('#likes')
  end
end