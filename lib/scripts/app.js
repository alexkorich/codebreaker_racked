$(document).ready(function(){

var numPosition=0;
var guess="";
function send(){
	
    $.ajax(
    {
        url : "/guess",
        type: "POST",
        data : {"guess":guess},
        success:function(data, textStatus, jqXHR) 
        {
            $("#show").html(data);

        }
    })

	event.preventDefault()
};

function clearScreen(){
for (var i=0; i<4; i++){
$("#"+i).html("_");

}

}
$(".number").click(function(){
    if(numPosition<=3){
    var number=$(this).html();
    $("#"+numPosition).html(number);
    guess+=number;

    numPosition++;
if (guess.length==4){
    send();
    guess="";

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
$("#newgame").click(function(){
    $.ajax(
    {
        url: "/newgame",
        type: "POST",
        data : "TTT",
        success:function(data, textStatus, jqXHR) 
        {
            $("#show").html(data)
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
       }
    })
    $("#guess").find("input[type=number]").val("");
});

// $('#highscore').click(function(){
// $.ajax(
//     {
//         url: "/highscore",
//         type: "POST",
//         data : "TTT",
//         success:function(data, textStatus, jqXHR) 
//         {
//             $("#table").html(data)
//         },
//         error: function(jqXHR, textStatus, errorThrown) 
//         {
//        }
//     })


// })

})