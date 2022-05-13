const express = require('express');
const cors = require(`cors`);
const bodyParser = require('body-parser');
const session = require('express-session');
const schema = require('./graphql/schema/schema');
const resolvers = require('./graphql/resolvers/rootResolver');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const http = require('http');
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
const isAuthorized = require('./middleware/isAuthorized');
//test
const app = express();

Sentry.init({
  dsn: process.env.BACKEND_SENTRY_URL,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 0.3,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.14jgs.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const PORT = 3000;

app.use(isAuthorized);

// From https://medium.com/zero-equals-false/using-cors-in-express-cac7e29b005b
let allowedOrigins = [
  `http://localhost:3000`,
  `http://localhost:3001`,
  `http://localhost:80`,
  `http://localhost`,
  'https://api.covid19vaxtracker.live',
  'https://www.covid19vaxtracker.live',
  'https://mohamedtayeh.com',
  'https://www.mohamedtayeh.com',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      if (!origin) {
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) === -1) {
        let msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.json());

app.use(
  '/',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    pretty: true,
    graphiql: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(Sentry.Handlers.errorHandler());

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    http.createServer(app).listen(PORT, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Running server on port ' + PORT);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
