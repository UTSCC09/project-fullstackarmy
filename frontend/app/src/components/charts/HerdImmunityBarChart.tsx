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
import annotationPlugin from 'chartjs-plugin-annotation'
import { Bar } from 'react-chartjs-2';

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
  let vars: String[] = [
    "CAN", 
    "AFG", 
    "AND", 
    "CHL",
    "PRT"
  ];

  const { error: labelErr, loading, data: labelData } = useQuery(GET_LABELS,
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
  console.log(labelErr)
  console.log(loading)
  console.log(labelData)
  let err = labelErr || firstVaccErr || secondVaccErr || boosterVaccErr;
  if (err) return <h1>Error {err.message}</h1>

  // For debugging
  console.log(labelData)
  console.log('-')
  console.log(firstVaccData)
  console.log('-')
  console.log(secondVaccData)
  console.log('-')
  console.log(boosterVaccData)

  // TODO: Queries occur multiple times (more than just the 4) and sometimes return undefined values
  if (labelData && firstVaccData && secondVaccData && boosterVaccData) {
    // update label and chart data.
    let labels: string[] = []
    let vaccData: number[] = []
    let fullyVaccData: number[] = []
    let boosterData: number[] = []
    let maxTot: number = 0
    let maxFirstVal =0
    for (let i in vars) {
      labels.push(labelData.isoCodes[i].isoCodeName + " (" + labelData.isoCodes[i].isoCode + ")");
      vaccData.push(firstVaccData.getMostRecentFirstVaccDataByIsoCode[i].peopleVaccinatedPerHundred);
      fullyVaccData.push(secondVaccData.getMostRecentFullyVaccDataByIsoCode[i].peopleFullyVaccinatedPerHundred);
      boosterData.push(boosterVaccData.getMostRecentBoosterVaccDataByIsoCode[i].totalBoostersPerHundred);
      // Justification for this method instead of creating an array of totals is less space used
      let firstVal = firstVaccData.getMostRecentFirstVaccDataByIsoCode[i].peopleVaccinatedPerHundred
      let total = firstVaccData.getMostRecentFirstVaccDataByIsoCode[i].peopleVaccinatedPerHundred +
        secondVaccData.getMostRecentFullyVaccDataByIsoCode[i].peopleFullyVaccinatedPerHundred +
        boosterVaccData.getMostRecentBoosterVaccDataByIsoCode[i].totalBoostersPerHundred
      if (firstVal >= maxFirstVal) maxTot = total
    }
    // TODO: unsure if the comparison btwn CHL and PRT is okay
    // This value is to get the proper scaling of the chart
    // Adapted from https://stackoverflow.com/questions/11142884/fast-way-to-get-the-min-max-values-among-properties-of-object
    const max: number = maxTot / (Math.max(...vaccData) / 100)

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
          value: max * .90,
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
        max: max,
        // Adapted from Wayne F. Kaskie https://stackoverflow.com/questions/40994841/chart-js-bar-graph-with-percentage-values
        ticks: {
          stepSize: max / 10,
          callback: function (value) {
            let numValue: number = +value;
            return (numValue / max * 100).toFixed(0) + '%'; // convert it to percentage
          },
        },
        title: {
          display: true,
          text: '% of Population'
        }
      },
    },
  };
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
    // In some instances where the data returned by the queries are undefined
    return <></>;
}

export default HerdImmunityBarChart