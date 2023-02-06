var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var isGameStarted = false;
var level = 0;

$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keydown", function(event) {
    if (!isGameStarted) {
        isGameStarted = true;
        nextSequence();
    } 
});

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    //animatePress(randomChosenColour);
    $("#level-title").text("Level " + level);
    level++;
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
        $("." + currentColour).removeClass("pressed");
    }, 100);
    
};

function checkAnswer(currentLevel) {    
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
};

function startOver() {
    level = 0;
    isGameStarted = false;
    gamePattern = [];
};
