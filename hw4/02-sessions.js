const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5001;

app.use(
  session({
    store: new session.MemoryStore(),
    secret: 'a secret to sign the cookie',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/favicon.ico', (req, res) => {
  res.end();
});

app.get('*', (req, res) => {
  res.status(200);
  res.set({ 'Content-Type': 'text/plain' });
  if (req.session.results === undefined) {
    req.session.results = [];
    req.session.results.push('/');
    res.send(
      `Currently on route : / \n\n\nWellcome to http://localhost:${port}`
    );
  } else {
    const output = req.originalUrl;
    if (!req.session.results.includes(output)) req.session.results.push(output);
    result = req.session.results.slice(0, -1);
    res.send(
      `Currently on route : ${output} \n\n\nPreviously visted:\n${result.join(
        '\n'
      )}`
    );
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
