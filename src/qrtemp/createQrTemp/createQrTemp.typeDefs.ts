import {gql} from "apollo-server";

export default gql`
    type Mutation {
        createQrTemp(qrTemps:String!,userId:Int!):ResponseMutation!
    }
`