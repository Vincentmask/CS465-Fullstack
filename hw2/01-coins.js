/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  let amount = input;
  let output = "$" + input + " ==> ";
  if (input < 0) {
    output += " Error: the number is too small";
    return output;
  } else if (input === 0) {
    output += " 0 coin";
    return output;
  } else if (input > 10) {
    output += " Error: the number is too large";
    return output;
  } else {
    let pluralize = require("pluralize");
    let dollars = Math.floor(amount / 1.0);
    amount -= dollars * 1;
    amount = parseFloat(amount.toFixed(10));
    let quarters = Math.floor(amount / 0.25);
    amount -= quarters * 0.25;
    amount = parseFloat(amount.toFixed(10));
    let dime = Math.floor(amount / 0.1);
    amount -= dime * 0.1;
    amount = parseFloat(amount.toFixed(10));
    let nickel = Math.floor(amount / 0.05);
    amount -= nickel * 0.05;
    amount = parseFloat(amount.toFixed(10));
    let pennies = Math.floor(amount / 0.01);
    if (dollars) output += dollars + " " + pluralize("dollar", dollars) + ", ";
    if (quarters)
      output += quarters + " " + pluralize("quarter", quarters) + ", ";
    if (dime) output += dime + " " + pluralize("dime", dime) + ", ";
    if (nickel) output += nickel + " " + pluralize("nickel", nickel) + ", ";
    if (pennies) output += pennies + " " + pluralize("penny", pennies) + " ";
    return output;
  }
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
console.log(calculateChange(0));
console.log(calculateChange(-10));
// $15.11 ==> Error: the number is too large
