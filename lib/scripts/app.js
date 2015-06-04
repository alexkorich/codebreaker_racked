$(document).ready(function(){
$("#guess").submit(function(event){
	var postData = $(this).serializeArray();
    var formURL = $(this).attr("action");
    $.ajax(
    {
        url : "/guess",
        type: "POST",
        data : postData,
        success:function(data, textStatus, jqXHR) 
        {
            $("#show").html(data)
        }
    })

	event.preventDefault()
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

$('#highscore').click(function(){
$.ajax(
    {
        url: "/highscore",
        type: "POST",
        data : "TTT",
        success:function(data, textStatus, jqXHR) 
        {
            $("#table").html(data)
        },
        error: function(jqXHR, textStatus, errorThrown) 
        {
       }
    })


})



})