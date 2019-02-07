var inputNum = 0;//document.querySelector(".input-win-score").value;  //get number from input
var playerScore1 = 0;  //counter for players score
var playerScore2 = 0;  //counter for players score
var scorePlyr1 = document.querySelector(".player-score-1");
var scorePlyr2 = document.querySelector(".player-score-2");


//get number for score to win from input
document.querySelector(".input-win-score").addEventListener("click",function(){
	inputNum = parseInt(document.querySelector(".input-win-score").value);
});

//listen  to button add to the players score ++ everytime the button is pressed
document.querySelector(".Plyr-1-btn").addEventListener("click",function(){
	if(playerScore2 !== inputNum && playerScore1 < inputNum){
	  	playerScore1 ++;
		scorePlyr1.innerHTML = playerScore1;
	}
		if(playerScore1 === inputNum){
		scorePlyr1.classList.add("player-win");
		}
});

//listen  to button add to the players score ++ everytime the button is pressed
document.querySelector(".Plyr-2-btn").addEventListener("click",function(){
	if(playerScore1 !== inputNum && playerScore2 < inputNum){
		playerScore2 ++;
		scorePlyr2.innerHTML = playerScore2;
	}
		if(playerScore2 === inputNum){
		scorePlyr2.classList.add("player-win");
		}

});

// resets all variables, and removes added classes
function reset(){
	playerScore1 = 0;
	playerScore2 = 0;
	scorePlyr1.innerHTML = 0;
	scorePlyr2.innerHTML = 0;
	scorePlyr1.classList.remove("player-win");
	scorePlyr2.classList.remove("player-win");
}

document.querySelector(".reset-btn").addEventListener("click",function(){
	reset();

});
