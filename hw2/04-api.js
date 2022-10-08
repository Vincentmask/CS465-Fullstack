/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";

let nf = new Intl.NumberFormat("en-US");

// 2
// const name = [];
// const popu = [];

const map = new Map();
var pop = 0;
let getData = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // 1
      // data.next !== null && getData(data.next);
      // console.log(data);
      // console.log("Name: " + data.altSpellings);
      // return data.results;
      // for (let i = 0; i < data.length; i += 1) {
      //   str +=
      //     i +
      //     1 +
      //     ". " +
      //     data[i].name.official +
      //     " - " +
      //     data[i].population +
      //     "\n";
      // }

      // 2
      // for (let i = 0; i < data.length; i += 1) {
      //   str.push(data[i].name.official);
      //   pop = nf.format(data[i].population);
      //   str.push(pop);
      // }
      for (let i = 0; i < data.length; i += 1) {
        pop = nf.format(data[i].population);
        map.set(data[i].name.common, pop);
      }
      var mapAsc = new Map([...map.entries()].sort());
      var count = 1;
      var str = "";
      for (const [key, value] of mapAsc) {
        str += count++ + `. ${key} = ${value} ` + "<br>";
      }
      document.getElementById("results").innerHTML = str;
    })
    .catch((error) => console.error("Error here", error));
};

getData(url);
