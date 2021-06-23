import {gql} from "apollo-server";

export default gql `
    type seeQrCodesResult{
        totalPages : Int!
        qrCodes : [Qrcode]
    }
    
    type Query{
        seeQrCodes(userId:Int!,keywordOption:String,page:Int!,keyword:String,countOption:Int!):seeQrCodesResult!
    }
`;
