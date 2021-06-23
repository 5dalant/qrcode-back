import {gql} from "apollo-server";

export default gql`
    type Query{
        linkToPage(requestUrl:String!):Qrcode!
    }
`;