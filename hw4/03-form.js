const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
  let userName = req.body.name;
  let userEmail = req.body.email;
  let userComment = req.body.comment;
  let userLetter = req.body.newsletter;
  let letterOut = '';
  if (!userComment) userComment = 'n/a';
  if (!userLetter) letterOut = 'No, thank you';
  else letterOut = 'Yes, sign me up for the newsletter';
  res.send(
    `Name: ${userName} <br/> Email: ${userEmail} <br/> Comments: ${userComment} <br/> Newsletter: ${letterOut}`
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
