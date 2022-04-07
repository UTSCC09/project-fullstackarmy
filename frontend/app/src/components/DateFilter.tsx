// Adapted from:
// https://codesandbox.io/s/5y1d9w?file=/demo.tsx:32-671
import React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import { DateFilterContext } from './context/DateFilterContext';

export const DateFilter = () => {
  const { selectedDate, updateSelectedDate } = React.useContext(
    DateFilterContext
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} >
      <Stack spacing={2} sx={{padding: 2}}>
        <DatePicker
          label="From:"
          value={selectedDate[0]}
          onChange={(newValue) => {
            updateSelectedDate([newValue, selectedDate[1]]);
          }}
          renderInput={(params) => <TextField color='secondary' {...params} />}
          
        />
        <DatePicker
          label="To:"
          value={selectedDate[1]}
          onChange={(newValue) => {
            updateSelectedDate([selectedDate[0], newValue]);
          }}
          renderInput={(params) => <TextField color='secondary' {...params} />}
          minDate={selectedDate[0]}
        />
      </Stack>
    </LocalizationProvider>
  );
};