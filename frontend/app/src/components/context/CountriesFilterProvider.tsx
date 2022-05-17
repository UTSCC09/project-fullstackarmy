import React, { ReactNode } from 'react';

export const CountriesFilterContext = React.createContext({
  selectedCountries: [],
  setSelectedCountries: (countries) => {},
});

interface Props {
  children: ReactNode;
}

// Filter countries included in the charts based on the selectedCountries state
const CountriesFilterProvider: React.FC<Props> = ({ children }) => {
  const [selectedCountries, setSelectedCountries] = React.useState([
    'CAN',
    'AFG',
    'AND',
    'CHL',
    'PRT',
  ]);

  return (
    <CountriesFilterContext.Provider
      value={React.useMemo(
        () => ({ selectedCountries, setSelectedCountries }),
        [selectedCountries, setSelectedCountries]
      )}
    >
      {children}
    </CountriesFilterContext.Provider>
  );
};
export default CountriesFilterProvider;
