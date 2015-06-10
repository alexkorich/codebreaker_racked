use Rack::Static, :urls => ["/stylesheets", "/scripts"]
use Rack::Session::Cookie, :key => 'rack.session',
                           :path => '/',
                           :expire_after => 2592000,
                           :secret => 'hallo'
require "codebreaker_racked"
run CodebreakerRacked::WebController.new