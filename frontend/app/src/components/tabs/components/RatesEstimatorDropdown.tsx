// Adapted from:
// https://codesandbox.io/s/cw86kh?file=/demo.tsx
import React, { isValidElement } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import { CountriesFilterContext } from '../../context/CountriesFilterContext';
import { useTranslation } from 'react-i18next';
import {RatesEstimator} from './RatesEstimator';

export const RatesEstimatorDropdown = () => {
    const { t } = useTranslation();

    const { selectedCountries, updateSelectedCountries } = React.useContext(
        CountriesFilterContext
    );

    const [val, setVal] = React.useState('');
    const updateSelection = (event) => {
        setVal(event.target.value);
    }

    return (
        <div>
            <FormControl sx={{ m: 2, width: 230 }} size='small'>
            <InputLabel id='countries-filter-label' color='secondary'>
                Select Country
            </InputLabel>
            <Select
                id='estimator-select'
                value={val}
                input={<OutlinedInput label='Select Country' />}
                color='secondary'
                renderValue={(selected) => selected}
                onChange={updateSelection}
            >
                {selectedCountries.map((countryName, index) => (
                <MenuItem key={index} value={countryName}>
                    <ListItemText
                    primary={countryName}
                    primaryTypographyProps={{ fontSize: '12px' }}
                    />
                </MenuItem>
                ))}
            </Select>
            </FormControl>
            <RatesEstimator isoCode={val}/>
        </div>
    );
};
