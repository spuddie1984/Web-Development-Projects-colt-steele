// Check if the script is linked to the html file
console.log("CONNTECTED");

// Print out an array in reverse to the console
function printReverse(num){
	console.log("printReverse");
	for (var i = num.length - 1; i >= 0; i--) {
		console.log(num[i]);
	}
	console.log("printReverse is Finished")
}

// return true if all the array items are the same else return false
function isUniform(num){
	console.log("isUniform");
	let count = num[0];
	for (var i = 1; i <= num.length -1; i++) {
		if(num[i] !== count){
			return false;
		}
	}
	return true;
}

// Print the sum of an Array
function sum(arr){
	console.log("Sum of an Array");
	var sum = 0;
	for (var i = 0; i <= arr.length - 1; i++) {
			sum += arr[i];
	}
	console.log(sum);
	console.log("Sum of an Array Finished");
}

// Find the maximum number in a array
function max(arr){
	console.log("Find the maximum number in a array");
	let varMax = arr[0];
	for (var i = 1; i <= arr.length -1; i++) {
		if(arr[i] > varMax){
			varMax = arr[i];
		}
	}
	console.log("The biggest number is " + varMax);
}

printReverse(["A","b","C","D","E"]);

console.log(isUniform([1,1,1,1]));

sum([-5,100,-56,154,235]);

max([5,100,100,150,-100]);