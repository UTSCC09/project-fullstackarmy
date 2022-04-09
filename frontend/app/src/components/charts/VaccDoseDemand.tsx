import React from 'react';
import { faker } from '@faker-js/faker';
// from https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/line/default?from-embed=&file=/App.tsx:1134-1173
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DocumentNode, gql, useQuery } from '@apollo/client';
import Loading from '../elements/Loading/Loading';
import Error from '../elements/Error/Error';
import { CountriesFilterContext } from "../context/CountriesFilterContext";
import { ColorModeContext } from "../context/ColorModeContext";

const VaccDoseDemand = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const GET_LABELS: DocumentNode = gql`
    query isoCodes($isoCodes: [String!]!) {
      isoCodes(isoCodes: $isoCodes) {
        isoCode
        isoCodeName
      }
    }
  `;

  const GET_DEMAND_DATA: DocumentNode = gql`
    query getSupplyDataByIsoCode($isoCodes: [String!]!) {
      getSupplyDataByIsoCode(isoCodes: $isoCodes) {
        dosesDeliveredRequiredPercent
        dosesExpectedRequiredPercent
      }
    }
  `;
  
  // use darkMode state to set chart colors
  const {darkMode} = React.useContext(ColorModeContext);

  // vars come from CountriesFilter Component
  const {selectedCountries} = React.useContext(CountriesFilterContext);
  let vars: String[] = selectedCountries;
  
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
  } = useQuery(GET_DEMAND_DATA, {
    variables: {
      isoCodes: vars,
    },
    notifyOnNetworkStatusChange: true,
  });
  let err = labelErr || chartDataErr;
  let loading = labelLoading || chartDataLoading;
  let data = labelData && chartData;
  if (err) return <Error message={err.message} />;
  if (loading) return <Loading />;

  if (data && vars.length === labelData.isoCodes.length) {
    // update label and chart data.
    let labels: string[] = [];
    let deliveredData: number[] = [];
    let expectedData: number[] = [];
    for (let i in vars) {
      labels.push(
        labelData.isoCodes[i].isoCodeName +
          ' (' +
          labelData.isoCodes[i].isoCode +
          ')'
      );
      deliveredData.push(
        chartData.getSupplyDataByIsoCode[i]
          .dosesDeliveredRequiredPercent
      );
      expectedData.push(
        chartData.getSupplyDataByIsoCode[i]
          .dosesExpectedRequiredPercent
      );
    }

    const options = {
      indexAxis: 'y' as const,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        title: {
          display: true,
          text: 'Demand for Vaccine Doses',
          color: darkMode ? 'white' : '#666',
        },
      },
      scales:{
        x:{
          title: {
            display: true,
            text: '% of Doses',
            color: darkMode ? 'white' : '#666',
            position: 'bottom'
          },
          ticks: {
            color: darkMode ? 'white' : '#666',
          },
          grid: {
            color: darkMode ? '#404040' : '#e5e5e5',
          },
        },
        y:{

          ticks: {
            color: darkMode ? 'white' : '#666',
          },
          grid: {
            color: darkMode ? '#404040' : '#e5e5e5',
          },
        }
      },
      color: darkMode ? 'white' : '#666',
    };
  
  
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Delivered Doses Percentage',
          data: deliveredData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Expected Doses Percentage',
          data: expectedData,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    return <Bar options={options} data={data} />;
  }
  return <></>;
};

export default VaccDoseDemand;
