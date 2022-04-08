import React from 'react';

// from https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/line/default?from-embed=&file=/App.tsx:1134-1173
import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  TimeScale,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js';
import 'chartjs-adapter-moment';
import { Line } from 'react-chartjs-2';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';
import { CountriesFilterContext } from '../context/CountriesFilterContext';
import { DateFilterContext } from '../context/DateFilterContext';
import { ColorModeContext } from '../context/ColorModeContext';

const formatDate = (date) => {
  let d = new Date(Date.parse(date));
  return d.toISOString().split('T')[0];
};

const currentDate = new Date();

const mapCountryCodeToColor = (code: String) => {
  // Taken from:
  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = code.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

const HerdImmunityTimeSeriesChart = () => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    TimeScale,
    PointElement,
    LineElement,
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
        date
        peopleFullyVaccinatedPerHundred
      }
    }
  `;

  // use darkMode state to set chart colors
  const { darkMode } = React.useContext(ColorModeContext);

  // vars  come from CountriesFilter Component
  const { selectedCountries } = React.useContext(CountriesFilterContext);
  let vars: string[] = selectedCountries;

  // date range comes from DateFilter Component
  const { selectedDate } = React.useContext(DateFilterContext);
  let selectedStartDate =
    selectedDate[0] === null
      ? formatDate('2020-12-02')
      : formatDate(selectedDate[0]);
  let selectedEndDate =
    selectedDate[1] === null
      ? formatDate(currentDate)
      : formatDate(selectedDate[1]);

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
    error: chartDataErr,
    loading: chartDataLoading,
    data: chartData,
  } = useQuery(GET_DATA, {
    variables: {
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      isoCodes: vars,
    },
  });
  let err = labelErr || chartDataErr;
  let loading = labelLoading || chartDataLoading;
  // let data = labelData && chartData;
  if (err) return <Error message={err.message} />;
  if (loading) return <Loading />;
  if (
    chartData &&
    vars.length === chartData.getVaccDataByDateRangeAndIsoCode.length
  ) {
    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        title: {
          display: true,
          text: 'Vaccination Rates Over Time',
          color: darkMode ? 'white' : '#666',
        },
      },
      scales: {
        // Adapted from: https://stackoverflow.com/questions/67322201/chart-js-v3-x-time-series-on-x-axis
        x: {
          type: 'time',
          min: new Date(selectedStartDate).getTime(),
          suggestedMin: new Date('2020-01-01').getTime(),
          max: new Date(selectedEndDate).getTime(),
          suggestedMax: Date.now(),
          time: {
            unit: 'month',
            displayFormats: {
              hour: 'Y-M-D',
            },
            tooltipFormat: 'Y-M-D',
          },
          ticks: {
            color: darkMode ? 'white' : '#666',
          },
          grid: {
            color: darkMode ? '#404040' : '#e5e5e5',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Total % of Population (Fully Vaccinated)',
            color: darkMode ? 'white' : '#666',
          },
          ticks: {
            color: darkMode ? 'white' : '#666',
          },
          grid: {
            color: darkMode ? '#404040' : '#e5e5e5',
          },
        },
      },
      color: darkMode ? 'white' : '#666',
    };

    // update chart data
    let res;
    if (chartData) res = chartData.getVaccDataByDateRangeAndIsoCode;
    let datasets = [];
    for (let i in vars) {
      let data = res[i].map(
        (resObj: { date: string; peopleFullyVaccinatedPerHundred: number }) => {
          return {
            x: new Date(resObj.date).getTime(),
            y: resObj.peopleFullyVaccinatedPerHundred,
          };
        }
      );
      // get colour based on country name
      let borderColor = mapCountryCodeToColor(
        labelData.isoCodes[i].isoCodeName.repeat(i + 50)
      );
      let bgColor = borderColor;
      let dataObj = {
        label:
          labelData.isoCodes[i].isoCodeName +
          '  (' +
          labelData.isoCodes[i].isoCode +
          ')',
        data: data,
        borderColor: borderColor,
        backgroundColor: bgColor,
        tesion: 0.9,
        pointRadius: 0.5,
      };
      datasets.push(dataObj);
    }
    const data: ChartData<'line'> = {
      datasets: datasets,
    };
    return <Line options={options} data={data} />;
  }
  return <></>;
};

export default HerdImmunityTimeSeriesChart;
