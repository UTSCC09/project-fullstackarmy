// Adapted from:
// https://codesandbox.io/s/ylmzg0?file=/demo.tsx
import React from 'react';
import TextField from '@mui/material/TextField';
import { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';


export const DateFilter = () => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateRangePicker
        startText="From:"
        endText="To:"
        value={value}
        clearable
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} size="small" color="secondary" sx={{marginLeft:'14px', marginTop: '14px'}}/>
            <Box sx={{ mx: 0.2}}> </Box>
            <TextField {...endProps} size="small" color="secondary" sx={{marginRight:'14px', marginTop: '14px'}}/>
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
