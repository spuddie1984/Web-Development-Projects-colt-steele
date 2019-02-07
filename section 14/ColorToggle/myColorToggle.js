var isPurple = false;
//listen to button 
document.querySelector("button").addEventListener("click", function(){

	if(isPurple){
		document.querySelector("body").classList.remove("bkg-color");
		isPurple = false;

 	} else{
 		document.querySelector("body").classList.add("bkg-color");
 		isPurple = true;
 	}

 });