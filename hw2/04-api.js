/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";

let nf = new Intl.NumberFormat("en-US");

// 2
// const name = [];
// const popu = [];

const map = new Map();
let pop = 0;
let getData = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        pop = nf.format(data[i].population);
        map.set(data[i].name.common, pop);
      }
      let mapAsc = new Map([...map.entries()].sort());
      let count = 1;
      let str = "";
      for (const [key, value] of mapAsc) {
        str += count++ + `. ${key} - ${value} ` + "<br>";
      }
      document.getElementById("results").innerHTML = str;
    })
    .catch((error) => console.error("Error here", error));
};

getData(url);
