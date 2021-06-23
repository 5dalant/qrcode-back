import {gql} from "apollo-server";

export default gql`
    type Mutation{
        qrcodeTest(qrCodes:String):ResponseMutation
    }
`;