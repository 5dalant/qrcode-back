import {gql} from "apollo-server";

export default gql`
    type Mutation {
        createQrCode(userId:Int!,qrCodes:String!): ResponseMutation!
    }
`;