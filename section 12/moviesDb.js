var movies = [
{
	title:"Men In Black",
	rating: 8,
	hasWatched: true,
},
{
	title: "Back To The Future 2",
	rating: 10,
	hasWatched: true,

},
{
	title: "Jurassic World: Fallen Kingdom",
	rating: 8,
	hasWatched: false,

},
{
	title: "Jurassic World",
	rating: 8,
	hasWatched: true,

}];
for(var i = 0; i <= movies.length - 1; i++){
	var str = "You have ";
	if(movies[i].hasWatched === true){
		str += "watched ";
	}else if(movies[i].hasWatched === false){
		str+= "not seen ";
	} 
	str += "\"" + movies[i].title + "\"" + " - " + movies[i].rating + " stars";
	console.log(str);
}