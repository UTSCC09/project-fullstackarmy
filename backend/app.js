const express = require('express');
//TODO: get rid of this later
const cors = require(`cors`);
const bodyParser = require('body-parser');
const session = require('express-session');
const schema = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/rootResolver');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

// For security
// const bcrypt = require('bcrypt');

// For uploads 
// const path = require('path');
// const fs = require('fs');
// const multer  = require('multer');

const app = express();

// For uploads 
// let upload = multer({ dest: path.join(__dirname, 'uploads')});
// app.use(bodyParser.urlencoded({ extended: false }));

// TODO: Need to get rid of this later. Using this so I can call graphQL for now
app.use(cors());

app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers, 
  pretty: true,
  graphiql: true,
}));

app.use(session({
    secret: 'this is a secure secret amirite?',
    resave: false,
    saveUninitialized: true,
}));

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.14jgs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const http = require('http');
const PORT = 8000;

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