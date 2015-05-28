module CodebreakerRacked
	class WebController
		attr_reader :game, :game_init
		def initialize
			@game=''
			@game_init=false
		end
		def call(env)
			request = Rack::Request.new(env)
			
			case request.path
			when "/" then Rack::Response.new(render("index.html.erb"))
			when "/newgame"
				new_game
				Rack::Response.new("Game started!", 200)
		    when "/guess"
		    	if @game_init
		    	  	Rack::Response.new(game.submit_guess(request.params["guess"]), 200)
		    	  else Rack::Response.new("Start new game first!", 500)
		    	  end
		    when "/c"
		    	Rack::Response.new(game.zzz, 200)
			else Rack::Response.new("Not Found", 404)
			end
			
  		end

		def render(template)
		    path = File.expand_path("../../views/#{template}", __FILE__)
		    ERB.new(File.read(path)).result(binding)
		  end

		def new_game
			@game=Codebreaker::Game.new
			@game_init = true
		end


	end
end
