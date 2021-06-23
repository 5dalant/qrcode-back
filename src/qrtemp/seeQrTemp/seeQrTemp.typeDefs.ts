import {gql} from "apollo-server";

export default gql`
    type Query{
        seeQrTemp(userId:Int!):[Qrtemp]!
    }
`;