import React from 'react';

export const DateFilterContext = React.createContext({
  selectedDate: [],
  updateSelectedDate: (date) => {},
});
