// Adapted from:
// https://codesandbox.io/s/react-mui-searchable-select-nm3vw?file=/src/App.js:691-708

import { QueryResult, useQuery } from '@apollo/client';
import SearchIcon from '@mui/icons-material/Search';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Select,
  TextField,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CountriesFilterContext } from '../context/CountriesFilterProvider';
import Error from '../elements/Error/Error';
import Loading from '../elements/Loading/Loading';
import { GET_COUNTRY_NAMES } from './queries/ConfigBarQueries';
import { CountryNamesData } from './types/ConfigBartypes';

/**
 * Checks if searchText is in text
 * @param {string} text
 * @param {string} searchText
 * @return {boolean}
 */
const containsText = (text, searchText) => {
  return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
};

export const CountriesFilter = () => {
  const countryNamesData: QueryResult<CountryNamesData> =
    useQuery(GET_COUNTRY_NAMES);

  const { selectedCountries, setSelectedCountries } = React.useContext(
    CountriesFilterContext
  );

  const [searchText, setSearchText] = useState('');

  const { t } = useTranslation();

  const displayedOptions = useMemo(() => {
    if (
      countryNamesData &&
      countryNamesData.data &&
      countryNamesData.data.countryIsoCodes
    ) {
      return countryNamesData.data.countryIsoCodes.filter((countryData) =>
        containsText(countryData.isoCodeName, searchText)
      );
    }
  }, [searchText, countryNamesData]);

  const addCountry = (country: string) => {
    let updatedCountries = [...selectedCountries, country];
    setSelectedCountries(updatedCountries);
  };

  const removeCountry = (country: string) => {
    let updatedCountries = [...selectedCountries];
    let index = selectedCountries.indexOf(country);
    updatedCountries.splice(index, 1);

    setSelectedCountries(updatedCountries);
  };

  const onClickCountry = (isoCode: string) => {
    if (selectedCountries.includes(isoCode)) {
      removeCountry(isoCode);
    } else {
      addCountry(isoCode);
    }
  };

  if (countryNamesData.error)
    return <Error message={countryNamesData.error.message} />;

  if (countryNamesData.loading) return <Loading />;

  if (!countryNamesData) return <Error message={t('error.noData')} />;

  return (
    <FormControl sx={{ m: 2, width: 230 }} size='small'>
      <InputLabel id='countries-filter-label' color='secondary'>
        {t('configbar.countriesfilter')}
      </InputLabel>
      <Select
        id='countries-filter-select'
        MenuProps={{ autoFocus: false }}
        multiple
        value={selectedCountries}
        label={t('configbar.countriesfilter')}
        renderValue={(selected) => selected.join(', ')}
        onClose={() => setSearchText('')}
      >
        <ListSubheader>
          <TextField
            size='small'
            autoFocus
            placeholder='Type to search...'
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Escape') {
                // Prevents autoselecting item while typing (default Select behaviour)
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {displayedOptions.map((countryData, i) => (
          <MenuItem key={i} value={countryData.isoCode}>
            <Checkbox
              checked={selectedCountries.indexOf(countryData.isoCode) > -1}
              color='secondary'
              onClick={() => {
                onClickCountry(countryData.isoCode);
              }}
            />
            <ListItemText
              primary={countryData.isoCodeName}
              primaryTypographyProps={{ fontSize: '12px' }}
              onClick={() => {
                onClickCountry(countryData.isoCode);
              }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
