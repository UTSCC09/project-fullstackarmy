import rootAPI from "./rootAPI";
import { request, gql } from 'graphql-request';
import { faker } from '@faker-js/faker';

export default class chartAPI extends rootAPI  {
    // TODO: Update constructor accordingly
    // constructor(parentField: any){
    //     super(parentField);
    // }

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

    // getBarLabels: Array<String> = async (vars: String[]) => {
    
    //   const GET_LABELS = gql`
    //     query isoCodes($isoCodes: [String!]!){
    //       isoCodes(isoCodes:$isoCodes){
    //       isoCode
    //       isoCodeName
    //     }
    //   }`;
    //   console.log(vars)
    //   let labels: String[] = [];
    //   const labelData = this.client.request(GET_LABELS, {isoCodes: vars})
    //       .then(res => {
    //         for (let i in res.isoCodes) {
    //           console.log(res.isoCodes[i]);
    //           labels.push(res.isoCodes[i].isoCodeName + " (" + res.isoCodes[i].isoCode + ")");
    //         }
    //       })
    //       .catch(err => console.error(err))
    //   // Something causes this to print 2x
    //   console.log(labelData);
    //   // if (labelData) {
    //   //   // const res = labelData.isoCodes;
        
    //   //   for (let d in res) {
    //   //     labels.push(res[d].isoCodeName + " (" + res[d].isoCode + ")");
    //   //   }
    //   // }
    //   return labels;
    // }
    
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
              data: [],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Dataset 2',
              data: [],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ];
    }

    
}