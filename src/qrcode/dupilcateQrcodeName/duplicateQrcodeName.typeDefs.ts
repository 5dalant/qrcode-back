import {gql} from "apollo-server";

export default gql`
    type Query{
        duplicateQrcodeName(userId:Int!,qrCodeName:String!):ResponseMutation!
    }
`;