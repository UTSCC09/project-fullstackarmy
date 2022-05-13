import React from 'react';
// Adapted from https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/bar/stacked?from-embed=&file=/App.tsx:315-556
import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Bar } from 'react-chartjs-2';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';
import { CountriesFilterContext } from "../context/CountriesFilterContext";
import { DateFilterContext } from "../context/DateFilterContext";
import { ColorModeContext } from "../context/ColorModeContext";

const formatDate = (date) => {
  let d = new Date(Date.parse(date));
  return d.toISOString().split('T')[0];
}

const currentDate = new Date();

const HerdImmunityBarChart = () => {
  // Register necessary elements from ChartJS
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    annotationPlugin,
    Title,
    Legend,
    Tooltip
  );

  const GET_LABELS: DocumentNode = gql`
    query isoCodes($isoCodes: [String!]!) {
      isoCodes(isoCodes: $isoCodes) {
        isoCode
        isoCodeName
      }
    }
  `;

  const GET_FIRST_VACC_DATA_BY_DATE: DocumentNode = gql`
    query getFirstVaccDataByDateRangeAndIsoCode($startDate: String!, $endDate: String!, $isoCodes: [String!]!) {
      getFirstVaccDataByDateRangeAndIsoCode(startDate: $startDate, endDate: $endDate, isoCodes: $isoCodes) {
        peopleVaccinatedPerHundred
      }
    }
  `;

  const GET_SECOND_VACC_DATA_BY_DATE: DocumentNode = gql`
    query getFullyVaccDataByDateRangeAndIsoCode($startDate: String!, $endDate: String!, $isoCodes: [String!]!) {
      getFullyVaccDataByDateRangeAndIsoCode(startDate: $startDate, endDate: $endDate, isoCodes: $isoCodes) {
        peopleFullyVaccinatedPerHundred
      }
    }
  `;

  const GET_BOOSTER_VACC_DATA_BY_DATE: DocumentNode = gql`
    query getBoosterVaccDataByDateRangeAndIsoCode($startDate: String!, $endDate: String!, $isoCodes: [String!]!) {
      getBoosterVaccDataByDateRangeAndIsoCode(startDate: $startDate, endDate: $endDate, isoCodes: $isoCodes) {
        totalBoostersPerHundred
      }
    }
  `;

  // use darkMode state to set chart colors
  const {darkMode} = React.useContext(ColorModeContext);

  // vars come from CountriesFilter Component
  const {selectedCountries} = React.useContext(CountriesFilterContext);
  let vars: String[] = selectedCountries;

  // date range comes from DateFilter Component
  const {selectedDate} = React.useContext(DateFilterContext);
  // only selected end date matters here because the chart shows current status as of the end date
  let startDate = '2020-12-02';
  let selectedEndDate = selectedDate[1] === null ? formatDate(currentDate) : formatDate(selectedDate[1]);

  const {
    error: labelErr,
    loading: labelLoading,
    data: labelData,
  } = useQuery(GET_LABELS, {
    variables: {
      isoCodes: vars,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    error: firstVaccErr,
    loading: firstVaccDataLoading,
    data: firstVaccData,
  } = useQuery(GET_FIRST_VACC_DATA_BY_DATE, {
    variables: {
      startDate: startDate,
      endDate: selectedEndDate,
      isoCodes: vars,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    error: secondVaccErr,
    loading: secondVaccDataLoading,
    data: secondVaccData,
  } = useQuery(GET_SECOND_VACC_DATA_BY_DATE, {
    variables: {
      startDate: startDate,
      endDate: selectedEndDate,
      isoCodes: vars,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    error: boosterVaccErr,
    loading: boosterVaccDataLoading,
    data: boosterVaccData,
  } = useQuery(GET_BOOSTER_VACC_DATA_BY_DATE, {
    variables: {
      startDate: startDate,
      endDate: selectedEndDate,
      isoCodes: vars,
    },
    notifyOnNetworkStatusChange: true,
  });
  let err = labelErr || firstVaccErr || secondVaccErr || boosterVaccErr;
  let loading =
    labelLoading ||
    firstVaccDataLoading ||
    secondVaccDataLoading ||
    boosterVaccDataLoading;
  let data = labelData && firstVaccData && secondVaccData && boosterVaccData;
  if (err) return <Error message={err.message} />;
  if (loading) return <Loading />;

  if (data && vars.length === labelData.isoCodes.length) {
    // update label and chart data.
    let labels: string[] = [];
    let vaccData: number[] = [];
    let fullyVaccData: number[] = [];
    let boosterData: number[] = [];
    for (let i in vars) {
      labels.push(
        labelData.isoCodes[i].isoCodeName +
          ' (' +
          labelData.isoCodes[i].isoCode +
          ')'
      );
      vaccData.push(
        firstVaccData.getFirstVaccDataByDateRangeAndIsoCode[i]
          .peopleVaccinatedPerHundred
      );
      fullyVaccData.push(
        secondVaccData.getFullyVaccDataByDateRangeAndIsoCode[i]
          .peopleFullyVaccinatedPerHundred
      );
      boosterData.push(
        boosterVaccData.getBoosterVaccDataByDateRangeAndIsoCode[i]
          .totalBoostersPerHundred
      );
    }

    const options: ChartOptions<'bar'> = {
      plugins: {
        title: {
          display: true,
          text: 'Share of Population Vaccinated',
          color: darkMode ? 'white' : '#666',
        },
        legend: {
          position: 'bottom',
        },
        annotation: {
          annotations: [
            {
              id: 'herdImmThreshold',
              type: 'line',
              value: 85,
              scaleID: 'y',
              borderWidth: 3,
              borderColor: '#2148C0E6',
              label: {
                enabled: true,
                content: `Estimated Herd Immunity Percentile Threshold`,
                backgroundColor: '#2148C0E6',
                position: 'start',
              },
            },
          ],
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: darkMode ? 'white' : '#666',
          },
          grid: {
            color: darkMode ? '#404040' : '#e5e5e5',
          },
        },
        y: {
          stacked: false,
          min: 0,
          max: 100,
          ticks: {
            color: darkMode ? 'white' : '#666',
          },
          grid: {
            color: darkMode ? '#404040' : '#e5e5e5',
          },
          title: {
            display: true,
            text: '% of Population',
            color: darkMode ? 'white' : '#666',
          },
        },
      },
      color: darkMode ? 'white' : '#666',
    };
    // update chart data
    const data: ChartData<'bar'> = {
      labels: labels,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Received Booster',
          backgroundColor: '#85C0DE',
          data: boosterData,
        },
        {
          type: 'bar' as const,
          label: 'Fully Vaccinated',
          backgroundColor: '#0F6889',
          data: fullyVaccData,
        },
        {
          type: 'bar' as const,
          label: 'Received At Least One Dose',
          backgroundColor: '#2C9DBF',
          data: vaccData,
        },
      ],
    };

    return <Bar options={options} data={data} />;
  }
  return <></>;
};

export default HerdImmunityBarChart;
