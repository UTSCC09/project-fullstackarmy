// Adapted from:
// https://codesandbox.io/s/cw86kh?file=/demo.tsx
import { DocumentNode, gql, useQuery } from '@apollo/client';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Error from '../../elements/Error/Error';
import Loading from '../../elements/Loading/Loading';

const currentDate = new Date();
const prevDate = new Date(new Date().setDate(currentDate.getDate() - 90));

const formatDate = (date) => {
  let d = new Date(Date.parse(date));
  return d.toISOString().split('T')[0];
};

const getAverage = (data) => {
  return 0;
  let first = data.getVaccDataByDateRangeAndIsoCode[0][0];
  let last = data.getVaccDataByDateRangeAndIsoCode[0][-1];
  let rate = last - first / 30;

  let months = (85 - last) / rate;
  return months;
};

export const RatesEstimator = ({ isoCode }) => {
  const GET_DATA: DocumentNode = gql`
    query getVaccDataByDateRangeAndIsoCode(
      $startDate: String!
      $endDate: String!
      $isoCodes: [String!]!
    ) {
      getVaccDataByDateRangeAndIsoCode(
        startDate: $startDate
        endDate: $endDate
        isoCodes: $isoCodes
      ) {
        peopleVaccinatedPerHundred
      }
    }
  `;

  const { t } = useTranslation();

  const { error, loading, data } = useQuery(GET_DATA, {
    variables: {
      startDate: prevDate,
      endDate: currentDate,
      isoCodes: [isoCode],
    },
  });
  if (error) return <Error message={error.message} />;
  if (loading) return <Loading />;
  if (data) {
    return (
      <Typography variant='body1' sx={{ m: 2 }}>
        Estimated # of Months to Reach Herd Immunity: {getAverage(data)}
      </Typography>
    );
  }
};
