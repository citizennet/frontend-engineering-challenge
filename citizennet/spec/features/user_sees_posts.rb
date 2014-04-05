require_relative '../spec_helper.rb'

describe 'user sees posts' do 

  it "shows a list of recent posts (which are stored in cache memory)" do 
    visit '/'
    expect(page).to have_css('#posts')
  end
end