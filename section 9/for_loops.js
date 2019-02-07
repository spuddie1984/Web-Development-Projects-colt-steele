//Print all the numbers between -10 and 19
console.log("Print all the numbers between -10 and 19");
for(var i = -10; i <= 19; i++){
	console.log(i);
}
//Print all even numbers between 10 and 40
console.log("Print all even numbers between 10 and 40");
for(var j = 10; j <= 40; j+=2){
	console.log(j);
}
// Print all odd numbers between 300 and 333
console.log("Print all odd numbers between 300 and 333");
for(var h = 300; h <= 333; h++){
	if(h % 2 !== 0){
		console.log(h);
	}
}
// Print all numbers Divisible by 5 AND 3 between 5 and 50
console.log("Print all numbers Divisible by 5 AND 3 between 5 and 50");
for(var g = 5; g <= 50; g++){
	if(g % 5 === 0 && g % 3 === 0){
		console.log(g);
	}
}