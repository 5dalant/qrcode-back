import {gql} from "apollo-server";

export default gql`
    type Mutation {
        updateQrCodes(qrCodeName:String!,forwardUrl:String!,requestUrl:String!):ResponseMutation
    }
`;