/** Exercise 02 - Reverse **/

// Add your code here
function reverse() {
  var Userinput = document.getElementById("input").value;
  var backward = Userinput.split("").reverse().join("");
  if (backward.toString().length != 8)
    document.getElementById("display").innerHTML =
      "Error: Please input an 8-digit number";
  else
    document.getElementById("display").innerHTML =
      Userinput + " --> " + backward;
  console.log("bla");
}
