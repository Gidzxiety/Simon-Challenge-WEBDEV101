var buttonColours = ["red", "blue", "green", "yellow"],
  gamePattern = [],
  userClickedPattern = [],
  level = 0,
  started = false;

const playSound = name => new Audio(`sounds/${name}.mp3`).play();

function animatePress(currentColour) {
  const btn = $("#" + currentColour).addClass("pressed");
  setTimeout(() => btn.removeClass("pressed"), 100);
}

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + ++level);
  const randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeTo(100, 0).fadeTo(100, 1);
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) setTimeout(nextSequence, 1000);
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function () {
  if (!started || userClickedPattern.length >= gamePattern.length) return;
  const userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keydown(() => {
  if (!started) {
    started = true;
    nextSequence();
  }
});
