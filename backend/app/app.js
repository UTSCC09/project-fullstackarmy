const express = require('express');
const cors = require(`cors`);
const bodyParser = require('body-parser');
const session = require('express-session');
const schema = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/rootResolver');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const http = require('http');

// For security
const helmet = require('helmet');

// For uploads 
// const path = require('path');
// const fs = require('fs');
// const multer  = require('multer');

const app = express();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.14jgs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const PORT = 3000;

// For uploads 
// let upload = multer({ dest: path.join(__dirname, 'uploads')});
// app.use(bodyParser.urlencoded({ extended: false }));

// From https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
let allowedOrigins = [
    `http://localhost:3000`,
    `http://localhost:3001`,
    `http://localhost:80`,
    `http://localhost`,
    'https://api.covid19vaxtracker.live',
    'https://www.covid19vaxtracker.live'
];

// Set the proper headers
app.use(helmet());

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.json());

app.use('/', graphqlHTTP({
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

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    http.createServer(app).listen(PORT, function (err) {
      if (err) console.log(err);
      else console.log("Running server on port " + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
