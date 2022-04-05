import randomColor from 'randomcolor';

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
import Loading from '../elements/Loading';
import QueryError from '../elements/QueryError';

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

  // TODO: vars will come from Filter Component, remember vars need to be ""
  let vars: string[] = ['USA', 'GBR'];
  // TODO: These values should come from Slider Component
  const startDate = '2020-12-12';
  const endDate = '2022-03-17';

  const {
    error,
    loading,
    data: chartData,
  } = useQuery(GET_DATA, {
    variables: {
      startDate: startDate,
      endDate: endDate,
      isoCodes: vars,
    },
  });
  if (error) return <QueryError message={error.message} />;
  if (loading) return <Loading />;
  if (chartData) {
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
        // Adapted from: https://stackoverflow.com/questions/67322201/chart-js-v3-x-time-series-on-x-axis
        x: {
          type: 'time',
          min: new Date(startDate).getTime(),
          suggestedMin: new Date('2020-01-01').getTime(),
          max: new Date(endDate).getTime(),
          suggestedMax: Date.now(),
          time: {
            unit: 'month',
            displayFormats: {
              hour: 'Y-M-D',
            },
            tooltipFormat: 'Y-M-D',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Total % of Population (Fully Vaccinated)',
          },
        },
      },
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
      // TODO: Replace with actual colours for lines
      let borderColor = randomColor({
        format: 'rgba',
        alpha: 0,
      });
      let bgColor = borderColor.replace(', 0)', ', 0.5)');
      let dataObj = {
        label: vars[i],
        data: data,
        borderColor: borderColor,
        backgroundColor: bgColor,
      };
      datasets.push(dataObj);
    }
    const data: ChartData<'line'> = {
      datasets: datasets,
    };
    return <Line options={options} data={data} />;
  }
};

export default HerdImmunityTimeSeriesChart;
