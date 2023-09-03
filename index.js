var buttonColors = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var lvl = 0;
var userClickedPattern = [];
var started = false;

function nextSequence() {
  gamePattern.push(buttonColors[Math.round(Math.random() * 3)]);
  lvl++;
  $("h1").html("Level " + lvl);
  $("#" + gamePattern[lvl - 1])
    .fadeOut(100)
    .fadeIn(100);
  playSound(gamePattern[lvl - 1]);
  $(document).unbind();
}

function playSound(col) {
  var a = new Audio("sounds/" + col + ".mp3");
  a.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLvl) {
  if (gamePattern[currentLvl] == userClickedPattern[currentLvl]) {
    if (gamePattern.length == userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    var a = new Audio("sounds/wrong.mp3");
    a.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  lvl = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  $(document).keypress(function (e) {
    if (started == false) {
      $(document).keypress(function (e) {
        nextSequence();
      });
    } else {
      $(document).unbind();
    }
  });
}

$(".btn").click(function () {
  userClickedPattern.push($(this).attr("id")); //missing 1 var
  playSound($(this).attr("id"));
  animatePress($(this).attr("id"));

  checkAnswer(userClickedPattern.length - 1);
});

if (started == false) {
  $(document).keypress(function (e) {
    if (e.key.toLowerCase() === "a") {
      nextSequence();
    }
  });
} else {
  $(document).unbind();
}
