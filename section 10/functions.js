/*function isEven 
	-takes a single number as an arguement
    -checks if the number is even or odd
	-returns true if the number is even and false if not
*/
function isEven(num){
	if(num % 2 === 0){
		return true;
	}else {
		return false;
	}
}
console.log(isEven(3));
/*function factorial
	-takes a single number
	-times the number from 1 to the number
	-0 factorial is 1
*/
function factorial(num){
	var sum = 1;
	if(num === 0){
		return 1;
	}else{
	for(var i = 1; i <= num; i++){
		sum *= i
	}
	}
	return sum;
}
console.log(factorial(0));
/*function kebabToSnake
	-takes a single string arguement that is a kebab case(dashs between words)
	-transforms the kebab string into a snake case string
	-Ex... convert-to-snake-case.....convert_to_snake_case
*/
function kebabToSnake(str){
return str.replace(/-/g, "_");	
}
console.log(kebabToSnake("Its-really-nice-to-meet-you"));