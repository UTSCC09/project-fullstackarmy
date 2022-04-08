import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { UserContext } from '../context/UserContext';
import { ALL_SAVED_CONFIGS } from './queries/UserConfigQueries';
import { useQuery } from '@apollo/client';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';
import { DateFilterContext } from '../context/DateFilterContext';
import { CountriesFilterContext } from '../context/CountriesFilterContext';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select/Select';

interface Props {}

const SavedConfigsDropdown: React.FC<Props> = () => {
  const { user } = React.useContext(UserContext);
  const { changeLanguage } = React.useContext(LanguageContext);
  const { updateSelectedDate } = React.useContext(DateFilterContext);
  const { updateSelectedCountries } = React.useContext(CountriesFilterContext);
  console.log(user);

  const handleClick = (cfg) => {
    if (cfg.savedLanguage) {
      changeLanguage(cfg.savedLanguage);
    }
    if (cfg.savedDates) {
      for (let d in cfg.savedDates) {
        updateSelectedDate(cfg.savedDates[d]);
      }
    }
    if (cfg.savedIsoCodes) {
      updateSelectedCountries(cfg.savedIsoCodes);
    }
    return null;
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
  console.log(userConfigs);
  const menuItems = userConfigs.map((cfg) => {
    console.log(cfg);
    return (
      <MenuItem key={userConfigs.indexOf(cfg)} onClick={handleClick(cfg)}>
        {cfg.name}
      </MenuItem>
    );
  });
  return (
    <Select
      value=''
      input={<OutlinedInput label={t('savedConfigs.title')} />}
      color='secondary'
    >
      {menuItems}
    </Select>
  );
};

export default SavedConfigsDropdown;
