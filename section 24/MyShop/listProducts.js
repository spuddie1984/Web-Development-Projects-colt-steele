// NPM EXERCISE

// Install the "faker" package
// https://www.npmjs.com/package/faker
// Read the faker docs and fiqure out how it works
// Use faker to print out 10 random product names and prices
// BE RESOURCEFULL! DON'T CHEAT AND FAST FORWARD!!!!
// Run your file with node and make sure it works!

const printNamesPrices = require("faker");

// loop through and console.log the product name and its price
for(let amt = 0; amt < 10; amt ++){
    console.log(printNamesPrices.commerce.productName());
    console.log(printNamesPrices.commerce.price());
}