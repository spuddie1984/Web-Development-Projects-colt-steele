
function randomColor(){
	var color = "";
		color = "rgb(";
	for(var i = 1; i <= 3; i++){
		var randomizer = Math.floor(Math.random() * 255);
		if(i < 3){
			color += randomizer + ",";
		}else {
			color += randomizer + ")";
		}
	}
	return color;
}


