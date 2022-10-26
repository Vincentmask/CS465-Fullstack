const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const postHTML = `<html><head><title>Form</title></head><body>
  <form method='post' action="/submit">
  <label for="inputemail">Name * </label>
  <br /><input type="name" name="name" id="inputname" required /><br />
  <br /><label for="inputemail">Email * </label>
  <br /><input type="email" name="email" id="inputemail" required /><br />
  <br /><label for="inputmessage">Submit your message: </label>
  <br /><textarea type="conmment" name="comment" id="inputmessage" rows="3"></textarea><br />
  <br /><input type="checkbox" name="newsletter" id="check" />
  <label for="check">Sign up for the newsletter</label>
  <input type='submit'>
  </form></body></html>`;

const server = http.createServer((req, res) => {
  let body = '';
  const routes = ['/form', '/submit'];
  const getRoutes = () => {
    let result = '';
    routes.forEach((elem) => {
      result += `<li><a href="${elem}">${elem}</a></li>`;
    });
    return result;
  };
  req.on('data', (chunk) => {
    body += chunk;
    console.log('on data: ' + body);
  });
  req.on('end', () => {
    if (req.url === '/') {
      const routeResults = getRoutes();
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write('<h1>Form</h1>');
      res.write(`<ul> ${routeResults} </ul>`);
    } else if (req.url === '/form') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(postHTML);
    } else if (req.url === '/submit') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      const params = new URLSearchParams(body);
      res.write(`<h1>Name: ${params.get('name')}</h1>`);
      res.write(`<h1>Email: ${params.get('email')}</h1>`);
      if (!params.get('comment')) {
        res.write(`<h1>Comment: n/a</h1>`);
      } else res.write(`<h1>Name: ${params.get('name')}</h1>`);
      if (!params.get('newsletter')) {
        res.write(`<h1>Newsletter: No, thank you.</h1>`);
      } else
        res.write(`<h1>Newsletter: Yes, sign me up for the newsletter.</h1>`);
    }
    res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
