gamePattern = [];
userClickedPattern = [];
buttonColours = ["red", "blue", "green", "yellow"];
level = 0;

function nextSequence(){
    //returns number between 0 and 3
    level +=1;
    $("h1").text("Level "+level);
    num = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playAudio(randomChosenColour);
}

//Animations
function animateButton(ChosenColour){
    $("#"+ChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ChosenColour).removeClass("pressed");
    },150);
    playAudio(ChosenColour);
}

function playAudio(ChosenColour){
    var audio = new Audio("sounds/" + ChosenColour + ".mp3");
    audio.play();
}

function gameOver(){
    $("h1").html("Game Over! <br> Press any key to try again");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
}

//Check Answers
function checkAnswers(userLevel){
    //console.log(userClickedPattern[userLevel-1] +" vs "+ gamePattern[userLevel-1])
    if (userClickedPattern[userLevel-1] != gamePattern[userLevel-1]){
        gameOver();
        return;
    }
    if(userLevel == level){
        //check and next level
        userClickedPattern = [];
        nextSequence();
    }
}


//Press a key to begin the game
$(document).keydown(function(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    nextSequence();
})


$(".btn").on("click",function(){
    
    userChosenColour = this.id;
    animateButton(userChosenColour);
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern)
    checkAnswers(userClickedPattern.length);
    
})



