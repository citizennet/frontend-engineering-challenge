require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module CodeChallenge
  class Application < Rails::Application
    config.cache_store = :redis_store, 'redis://localhost:6379/0/cache', { expires_in: 1440.minutes }
  end
end
