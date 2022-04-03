// Adapted from:
// https://codesandbox.io/s/cw86kh?file=/demo.tsx
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Loading from './elements/Loading';
import QueryError from './elements/QueryError';
import { CountriesFilterContext } from "./context/CountriesFilterContext";
import { 
  DocumentNode,
  gql, 
  useQuery
} from "@apollo/client";

export const CountriesFilter = () => {
  const {selectedCountries, updateSelectedCountries} = React.useContext(CountriesFilterContext);

    const addCountry = (country: string) => {
      var updatedCountries = [...selectedCountries, country];
      updateSelectedCountries(updatedCountries);

  };
  const removeCountry = (country: string) => {
      var updatedCountries = [...selectedCountries];
      var index = selectedCountries.indexOf(country);
      updatedCountries.splice(index, 1);
      updateSelectedCountries(updatedCountries);
  };
    const GET_COUNTRY_NAMES: DocumentNode = gql`
      query countryIsoCodes{
        countryIsoCodes{
          isoCode
          isoCodeName
        }
      }
    `;
    const { error: countryNamesFilterErr, loading: countryNamesLoading, data: countryNamesData } = useQuery(GET_COUNTRY_NAMES,
      {
        variables: {
      },
        notifyOnNetworkStatusChange: true
      }
    );
    if (countryNamesFilterErr) return <QueryError message={countryNamesFilterErr.message} /> 
    if (countryNamesLoading) return <Loading />
    if (countryNamesData){  
      return (
          <FormControl sx={{ m: 2, width: 230 }} size="small">
          <InputLabel id="countries-filter-label" color="secondary">Select Countries</InputLabel>
          <Select
            id="countries-filter-select"
            multiple
            value = {selectedCountries}
            input={<OutlinedInput label="Select Countries" />}
            color="secondary"
            renderValue={(selected) => selected.join(', ')}
          >
            {countryNamesData.countryIsoCodes.map((countryData, index) => (
              <MenuItem key={index} value={countryData.isoCode} >
                <Checkbox onChange={selectedCountries.indexOf(countryData.isoCode) === -1 ? () => {addCountry(countryData.isoCode)} : () => {removeCountry(countryData.isoCode)}} checked={selectedCountries.indexOf(countryData.isoCode) > -1} color="secondary"/>
                <ListItemText primary={countryData.isoCodeName} primaryTypographyProps={{fontSize: '12px'}}/>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }
}