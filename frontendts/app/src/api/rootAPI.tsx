import { GraphQLClient, } from 'graphql-request'
export default class rootAPI  {
    client: GraphQLClient;

    constructor(){
        this.client = new GraphQLClient('http://localhost:8000/api', { headers: {} })
    }
}