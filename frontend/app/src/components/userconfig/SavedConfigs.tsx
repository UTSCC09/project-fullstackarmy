<<<<<<< HEAD
import Divider from '@mui/material/Divider';
import React from 'react';
import SavedConfigDropdown from './SavedConfigDropdown';
import SavedConfigForm from './SavedConfigForm';
=======
import { useLazyQuery } from '@apollo/client';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import React, { useEffect } from 'react';
import { CountriesFilterContext } from '../context/CountriesFilterContext';
import { DateFilterContext } from '../context/DateFilterContext';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import Error from '../elements/Error/Error';
import Loading from '../elements/Loading/Loading';
import { ALL_SAVED_CONFIGS } from './queries/UserConfigQueries';
>>>>>>> main

interface Props {}

const SavedConfigs: React.FC<Props> = () => {
  return (
    <>
      <SavedConfigDropdown />
      <Divider sx={{ marginTop: '14px' }} />
      <SavedConfigForm />
    </>
  );
};

export default SavedConfigs;
