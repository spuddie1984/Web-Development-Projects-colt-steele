// Node Exercise 2
// AVERAGE GRADE

// Create a new file called "grader.js"

// In the file define a new function named "average"
// It should take a single parameter: an array of test scores(all numbers)
// It should return the average score in the array, rounded to the nearest whole number

const scores = [90,98,89,100,100,86,94];
console.log(average(scores)); //should return 94

const scores2 = [40,65,77,82,80,54,73,63,95,49];
console.log(average(scores2)); //should return 68

function average(sum){
    let total = 0;
    sum.forEach(element => {
        total += element;       
    });
    return Math.round(total / sum.length);
}