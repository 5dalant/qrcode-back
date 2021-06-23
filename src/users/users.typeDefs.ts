import {gql} from 'apollo-server';

export default gql`
    type User{
        id : Int!
        userName : String!
        password : String!
        createAt : String!
        updateAt : String!
        siteUrl : String!
        userActivate : Boolean!
        qrcodes : [Qrcode]
        qrcodeCount : Int
        companyName : String!
    }
`;