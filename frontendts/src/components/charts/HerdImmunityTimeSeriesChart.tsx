import React from 'react'
import { faker } from '@faker-js/faker';
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
// import chartAPI from '../../api/chartAPI';
import { 
  DocumentNode,
  gql, 
  useQuery
} from "@apollo/client";

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

  const GET_DATA: DocumentNode = gql`
    query getVaccDataByDateRangeAndIsoCode($startDate:String!, $endDate:String!, $isoCodes:[String!]!) {
      getVaccDataByDateRangeAndIsoCode(startDate:$startDate, endDate:$endDate, isoCodes:$isoCodes) {
        date
        peopleFullyVaccinatedPerHundred
      }
    }
  `;

  // TODO: vars will come from Filter Component, remember vars need to be ""
  let vars: String[] = ["CAN", "AFG"];
  // TODO: These values should come from graphQL
  const startDate = '2020-01-01'
  const endDate = '2022-12-31'

  const { error: err, data: chartData } = useQuery(GET_DATA,
    {
      variables: {
        startDate: startDate,
        endDate: endDate,
        isoCodes: vars
      }
    }
  );

  if (err) return <h1>Error {err.message}</h1>
  // Something causes this to print 2x
  if (chartData) {
    // update chart data
    const res = chartData.getVaccDataByDateRangeAndIsoCode;
    console.log(res);

    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' as const,
        },
        title: {
          display: true,
          text: 'Vaccination Rates Over Time',
        },
      },
      scales: {
        x: {
          type: 'time',
          min: new Date(startDate).getTime(),
          max: new Date(endDate).getTime(),
          time: {
            unit: "month",
            displayFormats: {
              hour: "Y-M-D H:00:00"
            },
            tooltipFormat: "Y-M-D H:00:00"// <-- same format for tooltip
          }
        },
        y: {
          title: {
            display: true,
            text: 'Total % of Population (Fully Vaccinated)'
          }
        }
      }
    };

    // set up api instance to get data
    // const api: chartAPI = new chartAPI();
    

    // TODO: Each dataset is a country, which comes in through a filter
    // x is the date, need to get date as string, convert to Date and call getTime()
    // y is the peopleFullyVaccinatedPerHundred
    // each point should come from a query of peopleFullyVaccinatedPerHundred != null
    const datasets = [
      {
        label: 'World',
        data: [{x: new Date('2020-01-01').getTime(), y:0.0},{x: new Date('2022-03-13').getTime(),y:37.9}],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Afghanistan',
        data: [{x: new Date('2020-01-01').getTime(), y:0.0},{x: new Date('2022-03-13').getTime(),y:12.10}],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ]
    const data: ChartData<'line'> = {
      datasets: datasets,
    };    
  return <Line options={options} data={data} />;
  }
  // TODO: Figure out why it gets printed out twice
  return <></>
}

export default HerdImmunityTimeSeriesChart