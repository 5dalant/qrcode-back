import {gql} from "apollo-server";

export default gql`
    type Mutation {
        editProfile(id:Int!,password:String!,companyName:String!, siteUrl:String!,userActivate:Boolean!):ResponseMutation!
    }
`;