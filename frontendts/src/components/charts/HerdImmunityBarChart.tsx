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

  const GET_LABELS = gql`
    query {
      isoCodes{
        isoCode
        name
      }

    }
  `;
  // NOTE: Can't change these vars
  // const { loading, error, data } = useQuery(GET_LABELS);

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;
  // const labels = data;
  
  const chartData: ChartData<'bar'> = {
      labels: api.getBarLabels(),
      datasets: api.getBarDataSets(),
      // labels,
      // datasets,
  };

  return <Bar options={options} data={chartData} />;

}

export default HerdImmunityBarChart