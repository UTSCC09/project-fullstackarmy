import rootAPI from "./rootAPI";
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
        return this.barLabels;
    }
    
    // TODO: data.datasets[index].data is data from api 
    //       want most recent peopleVaccinated and peopleFullyVaccinated
    // TODO: line is the herd immunity line, but see if you can make it stretch across
    //       want: calculate herd immunity per iso_code
    // TODO: data.datasets[index].label is data from api
    //       want dataset2 to be peopleVaccinatedPerHundred
    //       want dataset3 to be peopleFullyVaccinatedPerHundred/totalBoostersPerHundred
    getBarDataSets() {
        return [
            {
              type: 'bar' as const,
              label: 'People Vaccinated',
              backgroundColor: '#0F6889',
              data: this.barLabels.map(() => faker.datatype.float({ min: 0, max: 1})),
            },
            {
              type: 'bar' as const,
              label: 'People Fully Vaccinated',
              backgroundColor: '#2C9DBF',
              data: this.barLabels.map(() => faker.datatype.float({ min: 0, max: 1 })),
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