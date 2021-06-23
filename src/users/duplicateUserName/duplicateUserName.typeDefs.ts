import {gql} from "apollo-server";

export default gql `
    type duplicateUserNameResult{
        ok : Boolean!
        error : String
    }
    
    type Query{
        duplicateUserName(userName:String!):duplicateUserNameResult!
    }
`;