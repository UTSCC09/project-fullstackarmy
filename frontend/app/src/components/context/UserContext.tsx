import React from 'react';

export const UserContext = React.createContext({
  user: {
    userId: null,
    token: null,
    tokenExpiration: null,
  },
  updateUser: ({ userId, token, tokenExpiration }) => {},
});
