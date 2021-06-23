import {gql} from 'apollo-server';

export default gql`
    type Qrtemp{
        id : Int!
        qrTempName : String!
        forwardUrl : String!
        createAt : String!
        updateAt : String!
        userId : Int!
        user : User!
    }
`;