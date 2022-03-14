import React from 'react'
// from https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/bar/stacked?from-embed=&file=/App.tsx:315-556
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
import annotationPlugin from 'chartjs-plugin-annotation'
import { Bar } from 'react-chartjs-2';
import chartAPI from '../../api/chartAPI';
import { 
  gql, 
  useQuery
} from "@apollo/client";


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
    
  const options: ChartOptions<'bar'> = {
      plugins: {
        title: {
          display: true,
          text: 'How Far Are We to Reach Herd Immunity?',
        },
        legend: {
          position: 'bottom'
        },
        annotation: {
          annotations: [{
            id: "herdImmThreshold",
            type: 'line',
            value: 90.0,
            scaleID: "y",
            borderWidth: 3,
            borderColor: '#2148C0',
            label: {
              enabled: true,
              content: `Herd Immunity Percentile Threshold`,
              backgroundColor: '#2148C0',
              position: 'start',
            }
          }]
        }
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
          min: 0,
          max: 100.0,
          title: {
            display: true,
            text: '% of Population'
          }
        },
      },
  };

  // set up api instance to get data and labels
  const api: chartAPI = new chartAPI();

  // important stuff: https://graphql.org/graphql-js/passing-arguments/
  const GET_LABELS = gql`
  query isoCodes($isoCodes: [String!]!){
      isoCodes(isoCodes:$isoCodes){
      isoCode
      isoCodeName
    }
  }
  `;

  const GET_DATA = gql`
    query getMostRecentVaccDataByIsoCode($isoCodes:[String!]!) {
      getMostRecentVaccDataByIsoCode(isoCodes:$isoCodes) {
        peopleVaccinatedPerHundred
        peopleFullyVaccinatedPerHundred
      }
    }
  `;

  // TODO: vars will come from Filter Component, remember vars need to be ""
  let vars: String[] = ["CAN"];
  // NOTE: Can't change these vars
  const { error, data } = useQuery(GET_LABELS,
    {
      variables: {
        isoCodes: vars
      }
    }
  );

  if (error) return <h1>Error! {error.message}</h1>;

  if (data) {
    // StrictMode causes this to print 2x
    const res = data.isoCodes;
    let labels = []
    for (let d in res) {
      labels.push(res[d].isoCodeName + " (" + res[d].isoCode + ")");
    }
    console.log(labels)
    const chartData: ChartData<'bar'> = {
      // labels: api.getBarLabels(),
      datasets: api.getBarDataSets(),
      labels: labels,
      // datasets,
    };

    return <Bar options={options} data={chartData} />;
  }
    // TODO: did this bc of strict mode. FIX!
    return <></>;
}

export default HerdImmunityBarChart