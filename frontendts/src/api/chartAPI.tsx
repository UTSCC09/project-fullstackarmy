import rootAPI from "./rootAPI";
// import { 
//     gql, 
//     useQuery
// } from "@apollo/client";
import { faker } from '@faker-js/faker';

export default class chartAPI extends rootAPI  {
    // TODO: Update constructor accordingly
    // constructor(parentField: any){
    //     super(parentField);
    // }

    // TODO: Should these labels go based off of dates or months
    timeSeriesLabels: Array<String> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    getTimeSeriesLabels() {
        return this.timeSeriesLabels;
    }

    // TODO: labels are countries/ISO-codes
    // will need to update according to chosen countries
    // can query at IsoCode schema
    // can query isoCodeName: 'World' (is of isoCodeType: 'world')
    // can query isoCodeName: 'Europe' (is of isoCodeType: 'continent')
    // can query isoCodeName: 'European Union' (is of isoCodeType: 'internationalAggregates')
    // can query isoCodeName: 'United Kingdom' (is of isoCodeType: 'country')
    // can query isoCodeName: 'England' (is of isoCodeType: 'subRegion')
    barLabels: Array<String> = [
        'World (OWID_WRL)',
        // 'Europe (OWID_EUR)', 
        // 'European Union (OWID_EUN)', 
        // 'United Kingdom (GBR)', 
        // 'England (OWID_ENG)' 
    ];

    getBarLabels() {
    
        // const GET_LABELS = gql`
        //     query isoCode {

        //     }
        // `;

        // TODO: Can't use useQuery in a class, needs to be function or custom react hook

        // const { loading, error, data } = useQuery(GET_LABELS);

        // if (loading) return 'Loading...';
        // if (error) return `Error! ${error.message}`;

        // need to call api based on selected countries from filter
        return this.barLabels;
    }
    
    // TODO: data.datasets[index].data is data from api 
    //       want most recent peopleVaccinated and peopleFullyVaccinated
    // TODO: data.datasets[index].label is data from api
    //       want People Fully Vaccinated to be peopleFullyVaccinatedPerHundred/totalBoostersPerHundred
    //       want People Vaccinated to be peopleVaccinatedPerHundred
    getBarDataSets() {
        return [
            {
              type: 'bar' as const,
              label: 'People Fully Vaccinated',
              backgroundColor: '#0F6889',
              data: this.barLabels.map(() => faker.datatype.float({ min: 0, max: 100.0})),
            },
            {
              type: 'bar' as const,
              label: 'People Vaccinated',
              backgroundColor: '#2C9DBF',
              data: this.barLabels.map(() => faker.datatype.float({ min: 0, max: 100.0 })),
            },
        ];
    }

    // TODO: Figure out how to plot continuous data
    getTimeSeriesDataSets(){
        return [
            {
              label: 'Dataset 1',
              data: this.timeSeriesLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: this.timeSeriesLabels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ];
    }

    
}