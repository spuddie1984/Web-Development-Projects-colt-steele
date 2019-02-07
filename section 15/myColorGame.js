// variables for the game 
let mode = 6;
let rgbDisplayColor;
let navSelector = document.getElementsByTagName("nav")[0];
let messageSelector = document.getElementById("message");
let modeSelector = document.querySelectorAll(".mode");
let resetSelector = document.querySelector("#reset");
let colorSquares = document.querySelectorAll(".color");

// function calls
colorAssigner();
rgbDisplayColor = rgbPicker();


// returns a randomly selected rgb number ranging from 0 to 255 ex..rgb(0, 125, 255)
function	rgbRandomizer () {
	var randomRgb = "rgb(";
	// add a random number upto 255 to the randomRgb variable
	for(var i = 0 ; i < 3 ; i++){
		// generate a random number (1-255)
		var rgbColor	= Math.floor(Math.random() * 255);
		if (i < 2) {
			randomRgb += rgbColor + ",";
		} else {
			randomRgb += rgbColor + ")";
		}
	}
	return randomRgb;
}

// pick a random square and assign its color to the rgb display span element
function rgbPicker () {
	var getRandomId = "color-" + Math.ceil(Math.random() * mode);
	var randomPicker = document.getElementById(getRandomId).style.background;
	document.getElementById("rgbDisplay").innerHTML = randomPicker ;
	return randomPicker;
}

// assign random colors with the rgbrandomizer function to each square using a for loop
function colorAssigner () {
	for( var i = 1; i <= mode; i++ ) {
		document.getElementById("color-" + i).style.background = rgbRandomizer();
	}	
}

/*  get new random colors and assign them randomly to each of the squares,
 *  reset messages display and background of heading
 */
function reset () {
	rgbPicker();
	colorAssigner();
	rgbDisplayColor = rgbPicker();
	navSelector.style.backgroundColor = "steelblue";
	message.innerHTML = "";
	resetSelector.innerHTML = "new colors";
}

// reset button
document.getElementById("reset").addEventListener("click", function () {
	reset();
});

/*  loop through each square assigning event listeners to each one of them
 *  when clicked each one will respond according to the if/else statement 
 */
	for( var i = 1; i <= mode; i++ ) {
		var idSelect = "color-" + i;
		document.getElementById(idSelect).addEventListener("click", function () {
			if ( this.style.backgroundColor !== rgbDisplayColor ) {
				this.style.backgroundColor = "black";
				message.innerHTML = "Try Again";

			} else if ( this.style.backgroundColor === rgbDisplayColor ) {
				for( var i = 1; i <= mode; i ++ ) {
					document.getElementById("color-" + i).style.backgroundColor = rgbDisplayColor;
				}
				message.innerHTML = "Correct!";
				resetSelector.innerHTML = "Play Again ?";
				navSelector.style.backgroundColor = rgbDisplayColor;
			}
		
		});
	}

/*  loop through the mode selectors adding event listeners to each one 
 *	when clicked each one will respond according to the if/else statement
 */
	for ( var i = 0; i <= modeSelector.length - 1; i ++ ) {
		modeSelector[i].addEventListener("click", function () {
		if ( this.innerHTML === "Easy" ) {
			this.classList.add("selected");
			modeSelector[1].classList.remove("selected");
			for ( var i = 3; i <= colorSquares.length - 1; i++ ) {
				colorSquares[i].style.display = "none";
			}
			mode = 3;
			reset();
		} else if ( this.innerHTML === "Hard" ) {
			this.classList.add("selected");
 			modeSelector[0].classList.remove("selected");
			for ( var i = 3; i <= colorSquares.length - 1; i++ ) {
				colorSquares[i].style.display = "flex";
			}
			mode = 6;
			reset();
			}
		});
	}
//  -------Finished----------
	





	

