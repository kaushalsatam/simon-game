var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var isGameStarted = false;

var level = 0;

// This function is for animation of button press.
function animatePress(currentColour){
    $(currentColour).addClass("pressed");
    setTimeout(function (){
        $(currentColour).removeClass("pressed");
    }, 100);
}

// This function will play sound when game shows the sequence and user clicks on any colour.
function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// This function will start the game.
$(document).on("keydown", function (){
    if(!isGameStarted){
        isGameStarted = true;
        nextSequence();
    }
});

// This function will start the sequence.
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level)
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// This function accepts the user input.
$(".btn").on("click", function (e){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(this);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

// This function will check the user input if it is correct or not.
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }

    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// If game gets over. This function will get executed to start game over.
function startOver(){
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}