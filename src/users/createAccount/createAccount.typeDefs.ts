import {gql} from "apollo-server";

export default gql`
    type Mutation{
        createAccount(userName:String!,password:String!,companyName:String!,siteUrl:String!,userActivate:Boolean!):ResponseMutation!
    }
`;