const http = require('http');
const port = process.env.PORT || 5001;

config = {
  columns: {
    0: {
      width: 5, // Column 0 of width 5
    },
    1: {
      width: 5, // Column 1 of width 5
    },
  },
};
const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const queryObj = url.search;
    const params = new URLSearchParams(queryObj);
    const map = new Map();
    params.forEach((value, key) => {
      map.set(key, value);
    });
    let data = Array.from(map);
    for (const [key, value] of map) {
      res.write('<span>' + key + ' | ' + value + '</span><br/>');
    }
    res.end();
  }

  // Add your code here

  res.end();
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
