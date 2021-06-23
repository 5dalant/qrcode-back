import {gql} from "apollo-server";

export default gql`
    type Mutation {
        deleteQrCode(requestUrl:String!,userId:Int!):ResponseMutation!
    }
`;