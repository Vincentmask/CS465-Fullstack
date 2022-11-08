const http = require('http');
const port = process.env.PORT || 5001;
let cookie = require('cookie');

// http://localhost:5001/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5001/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5001/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5001/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// http://localhost:5001/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie

// For other routes, such as http://localhost:5001/other, this exercise should return a status code 404 with '404 - page not found' in html format

function parseCookies(request) {
  const list = {};
  const cookieHeader = request.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    let [name, ...rest] = cookie.split(`=`);
    name = name.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}

const server = http.createServer((req, res) => {
  const routes = [
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  } else if (req.url === '/welcome') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Hello there! Welcome!</h1>`);
    res.end();
  } else if (req.url === '/redirect') {
    res.redirect(302, `http://localhost:${port}/redirected`);
    res.end();
  } else if (req.url === '/redirected') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Redirected</h1>`);
    res.end();
  } else if (req.url === '/cache') {
    res.setHeader('Cache-control', 'public, max-age=86400');
    res.setHeader('content-type', 'text/html');
    res.write(`<h1>this resource was cached</h1>`);
    res.end();
  } else if (req.url === '/cookie') {
    res.setHeader('Set-Cookie', cookie.serialize('hello', 'world'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>cookies... yummm</h1>`);
    res.end();
  } else if (req.url === '/check-cookies') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const cookies = parseCookies(req);
    if (cookies.hasOwnProperty('hello')) {
      res.write(`<h1>yes</h1>`);
    } else {
      res.write(`<h1>no</h1>`);
    }
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(`<h1>404 Page Not Found</h1>`);
  }

  // Add your code here
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
