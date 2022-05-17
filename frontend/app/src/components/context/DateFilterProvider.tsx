import React, { ReactNode } from 'react';

export const DateFilterContext = React.createContext({
  selectedDate: [],
  setSelectedDate: (date) => {},
});

interface Props {
  children: ReactNode;
}

// Filter date based on the selectedDate state
const DateFilterProvider: React.FC<Props> = ({ children }) => {
  const [selectedDate, setSelectedDate] = React.useState([null, null]);

  return (
    <DateFilterContext.Provider
      value={React.useMemo(
        () => ({ selectedDate, setSelectedDate }),
        [selectedDate, setSelectedDate]
      )}
    >
      {children}
    </DateFilterContext.Provider>
  );
};

export default DateFilterProvider;
