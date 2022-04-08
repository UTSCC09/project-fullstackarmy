import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../context/UserContext';
import { ALL_SAVED_CONFIGS } from './queries/UserConfigQueries';
import { useQuery } from '@apollo/client';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';
import { DateFilterContext } from '../context/DateFilterContext';
import { CountriesFilterContext } from '../context/CountriesFilterContext';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
interface Props {}

const SavedConfigs: React.FC<Props> = () => {
  const { user } = React.useContext(UserContext);
  const { changeLanguage } = React.useContext(LanguageContext);
  const { updateSelectedDate } = React.useContext(DateFilterContext);
  const { updateSelectedCountries } = React.useContext(CountriesFilterContext);
  console.log('trying to get user');
  console.log(user);

  const handleClick = (cfg) => {
    console.log(cfg.savedLanguage);
    console.log(cfg.savedIsoCodes.toString());
    console.log(cfg.savedDates.toString());
    return null;
    // if (cfg.savedLanguage) {
    //   changeLanguage(cfg.savedLanguage);
    // }
    // if (cfg.savedDates) {
    //   for (let d in cfg.savedDates) {
    //     updateSelectedDate(cfg.savedDates[d]);
    //   }
    // }
    // if (cfg.savedIsoCodes) {
    //   updateSelectedCountries(cfg.savedIsoCodes);
    // }
    // return null;
  };
  const { t } = useTranslation();

  // get data
  const allSavedConfigs = useQuery(ALL_SAVED_CONFIGS, {
    variables: {
      user: '624dad9714daa3e6fd937623',
    },
  });
  if (allSavedConfigs && allSavedConfigs.loading) return <Loading />;
  if (allSavedConfigs && allSavedConfigs.error)
    return <Error message={allSavedConfigs.error.message} />;
  const userConfigs = allSavedConfigs.data.userConfigs;
  const menuItems = userConfigs.map((cfg) => {
    return (
      <MenuItem key={userConfigs.indexOf(cfg)} onClick={handleClick(cfg)}>
        {cfg.name}
      </MenuItem>
    );
  });
  return (
    <FormControl sx={{ m: 2, width: 230 }} size='small'>
      <Select value='' color='secondary'>
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SavedConfigs;
