// Adapted from:
// https://codesandbox.io/s/cw86kh?file=/demo.tsx
import React, { isValidElement } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Loading from '../../elements/Loading/Loading';
import Error from '../../elements/Error/Error';
import { CountriesFilterContext } from '../../context/CountriesFilterContext';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';

const currentDate = new Date();
const prevDate = new Date(new Date().setDate(currentDate.getDate() - 90));

const formatDate = (date) => {
    let d = new Date(Date.parse(date));
    return d.toISOString().split('T')[0];
};

const getAverage = (data) => {
    let total = 0;
    return total;
}

export const RatesEstimator = ({isoCode}) => {
    const GET_DATA: DocumentNode = gql`
    query getVaccDataByDateRangeAndIsoCode($startDate: String!, $endDate: String!, $isoCodes: [String!]!) {
      getVaccDataByDateRangeAndIsoCode(startDate: $startDate, endDate: $endDate, isoCodes: $isoCodes) {
        peopleVaccinatedPerHundred
      }
    }
    `;
  
    const { t } = useTranslation();

    const {
        error,
        loading,
        data,
    } = useQuery(GET_DATA, {
        variables: {
          startDate: prevDate,
          endDate: currentDate,
          isoCodes: [isoCode],
        },
    });
    if (error) return <Error message={error.message} />;
    if (loading) return <Loading />;
    if (data){
        console.log(data)
        return (
            <Typography variant='body1' sx={{ m: 2}} >
                Estimated # of Months to Reach Herd Immunity: {getAverage(data)}
            </Typography>
        );
    }
};
