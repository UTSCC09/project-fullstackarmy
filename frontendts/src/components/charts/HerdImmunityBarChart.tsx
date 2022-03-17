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
      scales: { // TODO: Fix theses scales
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

  // important stuff: https://graphql.org/graphql-js/passing-arguments/
  const GET_LABELS: DocumentNode = gql`
  query isoCodes($isoCodes: [String!]!){
      isoCodes(isoCodes:$isoCodes){
      isoCode
      isoCodeName
    }
  }
  `;

  const GET_FIRST_VACC_DATA: DocumentNode = gql`
    query getMostRecentFirstVaccDataByIsoCode($isoCodes:[String!]!) {
      getMostRecentFirstVaccDataByIsoCode(isoCodes:$isoCodes) {
        peopleVaccinatedPerHundred
      }
    }
  `;

  const GET_SECOND_VACC_DATA: DocumentNode = gql`
    query getMostRecentFullyVaccDataByIsoCode($isoCodes:[String!]!) {
      getMostRecentFullyVaccDataByIsoCode(isoCodes:$isoCodes) {
        peopleFullyVaccinatedPerHundred
      }
    }
  `;

  const GET_BOOSTER_VACC_DATA: DocumentNode = gql`
    query getMostRecentBoosterVaccDataByIsoCode($isoCodes:[String!]!) {
      getMostRecentBoosterVaccDataByIsoCode(isoCodes:$isoCodes) {
        totalBoostersPerHundred
      }
    }
  `;

  // TODO: vars will come from Filter Component, remember vars need to be ""
  let vars: String[] = ["CAN", "AFG", "AND"];

  const { error: labelErr, data: labelData } = useQuery(GET_LABELS,
    {
      variables: {
        isoCodes: vars
      }
    }
  );

  const { error: firstVaccErr, data: firstVaccData } = useQuery(GET_FIRST_VACC_DATA,
    {
      variables: {
        isoCodes: vars
      }
    }
  );

  const { error: secondVaccErr, data: secondVaccData } = useQuery(GET_SECOND_VACC_DATA,
    {
      variables: {
        isoCodes: vars
      }
    }
  );

  const { error: boosterVaccErr, data: boosterVaccData } = useQuery(GET_BOOSTER_VACC_DATA,
    {
      variables: {
        isoCodes: vars
      }
    }
  );
  let err = labelErr || firstVaccErr || secondVaccErr || boosterVaccErr;
  if (err) return <h1>Error {err.message}</h1>
  // Something causes this to print 2x
  if (labelData && firstVaccData && secondVaccData && boosterVaccData) {
    // update label and chart data. assumption same number of labels as data
    // const res = labelData.isoCodes;
    let labels = []
    let vaccData = []
    let fullyVaccData = []
    let boosterData = []
    console.log(secondVaccData)
    for (let i in vars) {
      labels.push(labelData.isoCodes[i].isoCodeName + " (" + labelData.isoCodes[i].isoCode + ")");
      vaccData.push(firstVaccData.getMostRecentFirstVaccDataByIsoCode[i].peopleVaccinatedPerHundred);
      fullyVaccData.push(secondVaccData.getMostRecentFullyVaccDataByIsoCode[i].peopleFullyVaccinatedPerHundred);
      boosterData.push(boosterVaccData.getMostRecentBoosterVaccDataByIsoCode[i].totalBoostersPerHundred);
    }
    // update chart data
    const data: ChartData<'bar'> = {
      labels: labels,
      datasets: [
        {
          type: 'bar' as const,
          label: 'Received Booster',
          backgroundColor: '#85C0DE',
          data: boosterData
        },
        {
          type: 'bar' as const,
          label: 'Fully Vaccinated',
          backgroundColor: '#0F6889',
          data: fullyVaccData
        },
        {
          type: 'bar' as const,
          label: 'Received At Least One Dose',
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