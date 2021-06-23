import {gql} from "apollo-server";

export default gql `
    type duplicateCompanyNameResult{
        ok : Boolean!
        error : String
    }
    
    type Query{
        duplicateCompanyName(companyName:String!):duplicateCompanyNameResult!
    }
`;