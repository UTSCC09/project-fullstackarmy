import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const reactAPIEnv = process.env.REACT_APP_API_URL
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  // uri: reactAPIEnv,
  uri: 'http://localhost:3001/api',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
