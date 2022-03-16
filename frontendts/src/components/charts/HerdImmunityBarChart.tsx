import React from 'react'
import { faker } from '@faker-js/faker';
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
// import chartAPI from '../../api/chartAPI';
import { 
  DocumentNode,
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
          text: 'Share of Population Vaccinated',
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

  // important stuff: https://graphql.org/graphql-js/passing-arguments/
  const GET_LABELS: DocumentNode = gql`
  query isoCodes($isoCodes: [String!]!){
      isoCodes(isoCodes:$isoCodes){
      isoCode
      isoCodeName
    }
  }
  `;

  const GET_DATA: DocumentNode = gql`
    query getMostRecentVaccDataByIsoCode($isoCodes:[String!]!) {
      getMostRecentVaccDataByIsoCode(isoCodes:$isoCodes) {
        peopleVaccinatedPerHundred
        peopleFullyVaccinatedPerHundred
      }
    }
  `;

  // TODO: vars will come from Filter Component, remember vars need to be ""
  let vars: String[] = ["CAN", "AFG"];

  const { error: labelErr, data: labelData } = useQuery(GET_LABELS,
    {
      variables: {
        isoCodes: vars
      }
    }
  );

  const { error: chartErr, data: chartData } = useQuery(GET_DATA,
    {
      variables: {
        isoCodes: vars
      }
    }
  );

  let err = labelErr || chartErr;
  if (err) return <h1>Error {err.message}</h1>
  // Something causes this to print 2x
  if (labelData && chartData) {
    // update label data
    const res = labelData.isoCodes;
    let labels = []
    for (let d in res) {
      labels.push(res[d].isoCodeName + " (" + res[d].isoCode + ")");
    }
    // update chart data
    const chartRes = chartData.getMostRecentVaccDataByIsoCode;
    let vaccData = [];
    let fullyVaccData = [];
    for (let i in chartRes) {
      vaccData.push(chartRes[i].peopleVaccinatedPerHundred);
      fullyVaccData.push(chartRes[i].peopleFullyVaccinatedPerHundred);
    }
    console.log(fullyVaccData)
    const data: ChartData<'bar'> = {
      labels: labels,
      datasets: [
        {
          type: 'bar' as const,
          label: 'People Fully Vaccinated',
          backgroundColor: '#0F6889',
          data: labels.map(() => faker.datatype.float({ min: 0, max: 100.0})),
          // data: fullyVaccData
        },
        {
          type: 'bar' as const,
          label: 'People Vaccinated',
          backgroundColor: '#2C9DBF',
          data: vaccData
        },
      ]
    };

    return <Bar options={options} data={data} />;
  }
    // TODO: Figure out why it does this
    return <></>;
}

export default HerdImmunityBarChart