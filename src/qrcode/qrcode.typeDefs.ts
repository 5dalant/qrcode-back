import {gql} from 'apollo-server';

export default gql`
    type Qrcode{
        id : Int!
        qrCodeName : String!
        forwardUrl : String!
        requestUrl : String!
        img : String!
        createAt : String!
        updateAt : String!
        userId : Int!
        user : User!
    }
`;