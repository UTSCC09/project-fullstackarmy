const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const multer  = require('multer');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcrypt');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

// For uploads 
// const fs = require('fs');
// const multer  = require('multer');


const app = express();

// For uploads 
// let upload = multer({ dest: path.join(__dirname, 'uploads')});
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());



app.use('/api', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            vaccinationData: [String!]!
        }
        
        type RootMutation {
            createVaccinationData(date: String): String
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `), 
    rootValue: {
        vaccinationData: () => {
            return ['Poop', 'pooP', 'PoOp'];
        },
        createVaccinationData: (args) => {
            const vaccinationDataDate = args.date;
            return vaccinationDataDate;
        }
    },
    graphiql: true
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

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

const http = require('http');
const { captureRejectionSymbol } = require('events');
const PORT = 3000;

http.createServer(app).listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});