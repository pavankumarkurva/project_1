
var buttonColours=["red" , "blue" ,"green" , "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level =0;

var started = false;

$(document).keydown(function(){
   if(!started)
   {
     $("h1").text("level "+level);
     nextSequence();
     started = true;
   }
})
$(".btn").click(function(){
   var userChosenColour = $(this).attr("id");

   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currLevel)
{
  if(userClickedPattern[currLevel] === gamePattern[currLevel])
  {
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else
  {
    $("body").addClass("game-over");

    $("h1").text("game over! Press any KEY to Restart!!");

    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 1000);
    startagain();
  }
  if(currLevel === 10)
  {
      $("h1").text("WOW You are a GENIUS! You WON");
      playSound("congo");
      $("body").addClass("success");
      setTimeout(function () {
        $("body").removeClass("success");
      }, 3000);
      startagain();
  }
}

function nextSequence(){

  level++;

  userClickedPattern = [];

  $("h1").text("level "+level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(snd){
  var audio = new Audio("sounds/"+ snd +".mp3");
  audio.play();
}

function animatePress(clr)
{
  $("#"+clr).addClass("pressed");
  setTimeout(function () {
     $("#"+clr).removeClass("pressed");
  }, 100);
}

function startagain(){
  level = 0;
  started = false;
  gamePattern=[];
}
