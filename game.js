var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound(name){
    audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    console.log(gamePattern);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").on("click", function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".start-btn").on("click", function() {
    if (!started) {
        $("h1").text("Level " + level);
        nextSequence();
        started = true;
        $(this).hide();
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press to Restart");
        $(".start-btn").text("Play Again");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
    userClickedPattern = [];
    $(".start-btn").show();
}
