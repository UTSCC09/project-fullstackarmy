// Adapted from:
// https://codesandbox.io/s/cw86kh?file=/demo.tsx
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ListSubheader from '@mui/material/ListSubheader';

// Lists of countries is taken from: https://gist.github.com/mofesolapaul/236eaaa6f4360dcb03110554f3597b3b
const countries = {
    'Africa': ['Algeria','Angola','Benin','Botswana','Burkina Faso','Burundi','Cabo Verde','Cameroon','Central African Republic','Chad','Comoros','Democratic Republic of the Congo','Republic of the Congo','Cote d\'Ivoire','Djibouti','Egypt','Equatorial Guinea','Eritrea','Ethiopia','Gabon','Gambia','Ghana','Guinea','Guinea Bissau','Kenya','Lesotho','Liberia','Libya','Madagascar','Malawi','Mali','Mauritania','Mauritius','Morocco','Mozambique','Namibia','Niger','Nigeria','Rwanda','Sao Tome and Principe','Senegal','Seychelles','Sierra Leone','Somalia','South Africa','South Sudan','Sudan','Swaziland','Tanzania','Togo','Tunisia','Uganda','Zambia','Zimbabwe'],
    'Asia' : ['Armenia','Azerbaijan','Bahrain','Bangladesh','Bhutan','Brunei', 'Cambodia','China','Cyprus','Georgia','India','Indonesia','Iran','Iraq','Israel', 'Japan','Jordan','Kazakhstan','Kuwait','Kyrgyzstan','Laos','Lebanon','Malaysia','Maldives','Mongolia','Myanmar','Nepal','North Korea','Oman','Pakistan','Palestine','Philippines','Qatar','Russia','Saudi Arabia','Singapore','South Korea','Sri Lanka','Syria','Taiwan','Tajikistan','Thailand','Timor Leste','Turkey','Turkmenistan','United Arab Emirates','Uzbekistan','Vietnam','Yemen'],
    'Europe': ['Albania','Andorra','Armenia','Austria','Azerbaijan','Belarus','Belgium','Bosnia and Herzegovina','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Georgia','Germany','Greece','Iceland','Ireland','Italy','Kazakhstan','Kosovo','Latvia','Liechtenstein','Lithuania','Luxembourg','Macedonia','Malta','Moldova','Monaco','Montenegro','Netherlands','Norway','Poland','Portugal','Romania','Russia','San Marino','Serbia','Slovakia','Slovenia','Spain','Sweden','Switzerland','Turkey','Ukraine','United Kingdom','Vatican City'],
    'North America': ['Antigua and Barbuda','Bahamas','Barbados','Belize','Canada','Costa Rica','Cuba','Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Trinidad and Tobago','United States of America'],
    'Oceania': ['Australia','Federated Islands of Micronesia','Fiji','French Polynesia','Guam','Kiribati','Marshall Islands','Nauru','New Zealand','Paulau','Papua New Guinea','Samoa','Solomon Islands','Tonga','Tuvala','Vanuata'],
    'South America': ['Argentina', 'Bolivia','Brazil','Chile','Colombia','Ecuador','Guyana','Paraguay','Peru','Suriname','Uruguay','Venezuela']
};

export const CountriesFilter = () => {
    const [selectedCountries, setSelectedCountries] = React.useState<string[]>([]);

    const addCountry = (country: string) => {
        setSelectedCountries([...selectedCountries, country]);
    };
    const removeCountry = (country: string) => {
        var updatedCountries = [...selectedCountries];
        var index = selectedCountries.indexOf(country);
        updatedCountries.splice(index, 1);
        setSelectedCountries(updatedCountries);
    };

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
          {Object.keys(countries).map((key, i) => (
            <div>
                <ListSubheader key={key} >{key}</ListSubheader>
                {countries[key].map((country: string, j: number) => (
                    <MenuItem key={i+country+j} value={country} >
                        <Checkbox onChange={selectedCountries.indexOf(country) === -1 ? () => {addCountry(country)} : () => {removeCountry(country)}} checked={selectedCountries.indexOf(country) > -1} color="secondary"/>
                        <ListItemText primary={country} primaryTypographyProps={{fontSize: '12px'}}/>
                    </MenuItem>
                ))}
            </div>
          ))}
        </Select>
      </FormControl>

    );
}