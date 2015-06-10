require 'rack'
require 'rubygems'
require 'bundler'

use Rack::Static, :urls => ["lib/stylesheets", "lib/scripts"]
use Rack::Session::Cookie, :key => 'rack.session',
                           :path => '/',
                           :expire_after => 2592000,
                           :secret => 'hallo'
require_relative "lib/codebreaker_racked.rb"
run CodebreakerRacked::WebController.new