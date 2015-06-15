$(document).ready(function(){
var numPosition=0;
var guess="";
var isGame=false;
var attempt=0
newGame();
function newGame(){
    $("tbody").html("");
    attempt=0;
    $.ajax(
        {
            url: "/newgame",
            type: "POST",
            data : "TTT",
            success:function(data) 
            {

                d=JSON.parse(data);
                $("#show").html(d["msg"]);
                $("#attempts").html(d["attempts"]);

            }
           
        });
    clearScreen();
    isGame=true;
     buttonSwitch();
     console.log("me!");
     guess="";
};

function send(){
    $.ajax(
    {
        url : "/guess",
        type: "POST",
        data : {"guess":guess},
        success:function(data, textStatus, jqXHR) 
        {

            attempt++;
            console.log(data)
             d=JSON.parse(data);
             $("#tabler").show();
            if (d.result=="++++"){
               isGame=false;
                winner();
                return;
            }
            else if(d.attempts_left==0){
                isGame=false;
                loser();
                $("#attempts").html(d["attempts_left"]);
                return;
            }
            console.log(guess)
            console.log(d["result"]);
            $('tbody:last-child').append('<tr><th>'+attempt+
                '</th>'+'<th>'+guess+'</th>'+'<th>'+d["result"]+'</th></tr>')
            $("#show").html(d["result"]);
            $("tr:last").focus()
            var rowpos = $('tbody tr:last').position();

            $('#tabler').scrollTop(rowpos.top);
            $("#attempts").html(d["attempts_left"]);
            guess="";

        }
    })

};

function winner(){
    buttonSwitch();

    if(confirm("You win! Do you want to save your result?")){
        var name=prompt("Enter your name")
        $.ajax(
        {
            url : "/save",
            type: "POST",
            data : {"name":name},
            success:function(data, textStatus, jqXHR) 
            {
               $("#show").html("Game saved!");
             } 
        })
    }
    else return;
}

function buttonSwitch(){
    if(isGame){
    $(".number").prop('disabled', false);
    $("#delete").prop('disabled', false);
}
else{
    $(".number").prop('disabled', true);
    $("#delete").prop('disabled', true);
}
}

function loser(){
    buttonSwitch();
     $.ajax(
        {

            url : "/c",
            type: "POST",
            data : {"guess":guess},
            success:function(data) 
            {
                console.log(data)
                alert("Sorry, you lose! :("+"\n Secret number was "+data);             
                }
        })
    
}

function clearScreen(){
    for (var i=0; i<4; i++){
        $("#"+i).html("_");
    }
};

$(".number").click(function(){
    if(numPosition<=3){
    var number=$(this).html();
    $("#"+numPosition).html(number);
    guess+=number;

    numPosition++;
if (guess.length==4){
    send();
    

    numPosition=0; 
    setTimeout(clearScreen(), 1000);   
    }

    console.log("numpos"+numPosition)}
});


$("#delete").click(function(){
     if(numPosition>0){
        numPosition--;
        $("#"+numPosition).html("_");
        guess.pop(number);
        console.log("numpos"+numPosition)
}

})

var clicked = 0;
$("h1").on('click', function (e) {
    
    clicked++;
    console.log(clicked);
    if (clicked >= 3) {
        clicked = 0;
        $.ajax(
        {

            url : "/c",
            type: "POST",
            data : {"guess":guess},
            success:function(data) 
            {
                console.log(data)
                $("#show").html(data);
             
                }
        })


    } 
});



$("#newgame").click(function(){
    newGame();
});

$('#highscore').click(function(){
$.ajax(
    {
        url: "/highscore",
        type: "POST",
        data : "TTT",
        success:function(data, textStatus, jqXHR) 
        {
           alert(data)
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
       }
    })


})

})