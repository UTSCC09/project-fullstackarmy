const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const multer  = require('multer');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
// const schema = require('./schema');
const mongoose = require('mongoose');

const app = express();
let upload = multer({ dest: path.join(__dirname, 'uploads')});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    schema, 
    pretty: true,
    graphiql: true,
}))

app.use(session({
    secret: 'this is a secure secret amirite?',
    resave: false,
    saveUninitialized: true,
}));

const uri = `
    mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD
    }@cluster0.14jgs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority
`;
const http = require('http');
const { captureRejectionSymbol } = require('events');
const { argsToArgsConfig } = require('graphql/type/definition');
const PORT = 3000;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    http.createServer(app).listen(PORT, function (err) {
      if (err) console.log(err);
      else console.log("HTTP server on http://localhost:%s", PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
