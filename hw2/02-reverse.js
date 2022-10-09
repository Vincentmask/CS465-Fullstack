/** Exercise 02 - Reverse **/

// Add your code here
function reverse() {
  const Userinput = document.getElementById("input").value;
  const backward = Userinput.split("").reverse().join("");
  if (backward.toString().length !== 8)
    document.getElementById("display").innerHTML =
      "Error: Please input an 8-digit number";
  else
    document.getElementById("display").innerHTML =
      Userinput + " --> " + backward;
}
