var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var highScore = 0;
var delayTime = 600;

$("#start-btn").click(function () {
  if (!started) {
    startGame();
  }
});

$(".btn").click(function () {
  if (!started) return;

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function startGame() {
  setDifficulty();
  level = 0;
  gamePattern = [];
  started = true;
  $("#start-btn").hide();
  $("#level-title").text("Level " + level);
  nextSequence();
}

function setDifficulty() {
  let difficulty = $("#difficulty").val();
  if (difficulty === "easy") delayTime = 1000;
  else if (difficulty === "medium") delayTime = 600;
  else delayTime = 300;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  updateScore();
  $("#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  setTimeout(() => {
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, delayTime);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, delayTime);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Press Start to Retry");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    endGame();
  }
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function updateScore() {
  $("#score").text("Score: " + (level - 1));
  if (level - 1 > highScore) {
    highScore = level - 1;
    $("#high-score").text("High Score: " + highScore);
  }
}

function endGame() {
  started = false;
  $("#start-btn").show();
}

