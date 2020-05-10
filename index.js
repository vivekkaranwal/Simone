
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var  start = false;
var level = 0;
var totalButton = [];
document.getElementById("playButton").addEventListener("click",playButton);
function playButton(){
   if(!start){
     $("#level-title").text("Level " + level);
     nextSequence();
     start = true;
   }
}

$(".btn").click(function(){
      var chossenButton = $(this).attr("id");
      playSound(chossenButton);
      animatePress(chossenButton);
      totalButton.push(chossenButton);
      lastButtonPress(totalButton.length-1);

});
function lastButtonPress(lastButtonPress1) {
    if(gamePattern[lastButtonPress1]===totalButton[lastButtonPress1]){
      if (totalButton.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("press button to play again");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }

}
function nextSequence() {
   totalButton = [];
   level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(200).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
function animatePress(chossenButton){
  $("#"+chossenButton).addClass("pressed");
  setTimeout(function(){
      $("#"+chossenButton).removeClass("pressed");
  },100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  start= false;
}
