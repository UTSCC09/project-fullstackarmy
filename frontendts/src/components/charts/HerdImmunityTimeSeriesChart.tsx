import React from 'react'
// from https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/line/default?from-embed=&file=/App.tsx:1134-1173
import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import chartAPI from '../../api/chartAPI';

const HerdImmunityTimeSeriesChart: React.FC = () => {
    ChartJS.register(
        LinearScale,
        CategoryScale,
        PointElement,
        LineElement,
        Title,
        Legend,
        Tooltip
    );
    
    const options: ChartOptions<'line'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'When Will We Reach Herd Immunity?',
        },
      },
    };

    // set up api instance to get data and labels
    const api: chartAPI = new chartAPI();

    const data: ChartData<'line'> = {
      labels: api.getTimeSeriesLabels(),
      datasets: api.getTimeSeriesDataSets(),
    };    
  return <Line options={options} data={data} />;
}

export default HerdImmunityTimeSeriesChart