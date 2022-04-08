import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CountriesFilterContext } from '../context/CountriesFilterContext';
import { DateFilterContext } from '../context/DateFilterContext';
import { LanguageContext } from '../context/LanguageContext';
import { UserContext } from '../context/UserContext';
import { SAVE_CONFIG } from './queries/UserConfigQueries';
import Error from '../elements/Error/Error';

const SavedConfigForm = () => {
  const [errorPanel, setErrorPanel] = React.useState<string | null>(null);
  const { user } = React.useContext(UserContext);
  const { currentLanguage } = React.useContext(LanguageContext);
  const { selectedDate } = React.useContext(DateFilterContext);
  const { selectedCountries } = React.useContext(CountriesFilterContext);
  const navigate = useNavigate();

  const [saveConfig] = useMutation(SAVE_CONFIG, {
    onCompleted: (data) => {
      // TODO: reload page.
      // navigate('/');
    },
    onError: (error) => {
      console.log(error);
      setErrorPanel(error.message);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');

    setErrorPanel(null);

    let startDate = null;
    let endDate = null;
    if (Array.isArray(selectedDate) && selectedDate.length === 2) {
      startDate = selectedDate[0] ? selectedDate[0].toString() : null;
      endDate = selectedDate[1] ? selectedDate[1].toString() : null;
    }
    saveConfig({
      variables: {
        userConfigInput: {
          name,
          user: user.userId,
          savedStartDate: startDate,
          savedEndDate: endDate,
          savedIsoCodes: selectedCountries,
          savedLanguage: currentLanguage,
        },
      },
    });
  };
  return (
    <div>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name of Your Configuaration'
          name='name'
          color='secondary'
          autoComplete='none'
        />
        <Button type='submit' variant='contained'>
          Save Configuration
        </Button>
      </Box>
      {errorPanel && <Error message={errorPanel} />}
    </div>
  );
};

export default SavedConfigForm;
