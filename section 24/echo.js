// NODE EXERCISE

// Using the command line, create a file called "echo.js"
// Inside the file write a function named echo that takes 2 arguements:
// - A String 
// - A Number
// It should print out the string, number of times

echo("Echo!!!", 10); //should print "Echo!!!" 10 times
echo("Tater Tots", 3); //should print "Tater Tots" 3 Times

function echo (string, number){
    for(let num = 0; num < number; num++){
        console.log(string);
    }
}