import {gql} from "apollo-server";

export default gql`
    type Query{
        duplicateLoginUserName(userName:String!):ResponseMutation!
    }
`;