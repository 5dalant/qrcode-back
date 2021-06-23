import {gql} from "apollo-server";

export default gql`
    type seeAllUsersResult{
        ok: Boolean!
        error: String
        users : [User]
        totalPages: Int
    }
    
    type Query{
        seeAllUsers(keyword:String,page:Int!,keywordOption:String,sortOption:String):seeAllUsersResult
    }
`;