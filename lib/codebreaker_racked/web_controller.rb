module CodebreakerRacked
  require "json"
  class WebController
    attr_reader :game, :game_init, :request
    def initialize
      
      @game_init=false
    end
    def call(env)
      @request = Rack::Request.new(env)
      case @request.path
      when "/" then Rack::Response.new(render("index.html.erb"))
      when "/newgame"
        new_game
        puts "cls"
        puts ({msg:"Game started!", attempts:"10"}.to_json.class)
        Rack::Response.new([{msg:"Game started!", attempts:"10"}.to_json], 200)
      when "/guess"
        puts(@request.params)
        # puts game
        Rack::Response.new([game.submit_guess(@request.params["guess"].to_i).to_json], 200)
        when "/c"
          Rack::Response.new(game.zzz, 200)
        when "/save"
         Rack::Response.new([Codebreaker::Game.save(@request.params["name"], game.attempts)], 200)
           
        when "/highscore" then Rack::Response.new(Codebreaker::Game.load_score.to_json, 200)
      else Rack::Response.new("Not Found", 404)
      end
      
      end

    def render(template)
        path = File.expand_path("../../views/#{template}", __FILE__)
        ERB.new(File.read(path)).result(binding)
      end
    def game
    @request.session[:game]
    end
    def new_game
      puts "HAHA"
      @game_init=true
      @request.session.clear
      @request.session[:game]= Codebreaker::Game.new
      puts @request.session[:game]
    end


  end
end
