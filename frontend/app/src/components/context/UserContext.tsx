import React from 'react';

export const UserContext = React.createContext({
  user: {
    userId: null,
    token: null,
    tokenExpiration: null,
  },
  updateUser: ({ _id: number, username: string }) => {},
});
