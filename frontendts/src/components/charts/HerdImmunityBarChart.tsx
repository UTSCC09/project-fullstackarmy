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

const HerdImmunityBarChart: React.FC = () => {
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
        annotation: {
          annotations: [{
            id: "herdImmThreshold",
            type: 'line',
            // herd immunity is apparently 94% from https://www.mayoclinic.org/diseases-conditions/coronavirus/in-depth/herd-immunity-and-coronavirus/art-20486808#:~:text=quickly%20become%20overwhelmed.-,Vaccines,causing%20illness%20or%20resulting%20complications.
            value: .94,
            scaleID: "y",
            borderWidth: 3,
            label: {
              enabled: true,
              content: `Herd Immunity Percentile Threshold`,
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
        },
      },
  };

  // set up api instance to get data and labels
  const api: chartAPI = new chartAPI();
  
  const data: ChartData<'bar'> = {
      labels: api.getBarLabels(),
      datasets: api.getBarDataSets(),
  };

  return <Bar options={options} data={data} />;

}

export default HerdImmunityBarChart