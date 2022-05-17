import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { ReactNode } from 'react';

export const UserContext = React.createContext({
  user: {
    userId: null,
    token: null,
    tokenExpiration: null,
  },
  setUser: ({ userId, token, tokenExpiration }) => {},
});

interface Props {
  children: ReactNode;
}

// User state
const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<{ userId; token; tokenExpiration }>(
    null
  );

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authLink = setContext((_, { headers }) => {
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: user.token ? `Bearer ${user.token}` : '',
      },
    };
  });

  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: user ? authLink.concat(httpLink) : httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider
        value={React.useMemo(() => ({ user, setUser }), [user, setUser])}
      >
        {children}
      </UserContext.Provider>
    </ApolloProvider>
  );
};

export default UserProvider;
