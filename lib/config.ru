use Rack::Static, :urls => ["/stylesheets", "/scripts"]
require "codebreaker_racked"
run CodebreakerRacked::WebController.new