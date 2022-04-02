import React from 'react';

export const CountriesFilterContext = React.createContext({
    selectedCountries: [],
    updateSelectedCountries: (countries: Array<String>) => {},
});