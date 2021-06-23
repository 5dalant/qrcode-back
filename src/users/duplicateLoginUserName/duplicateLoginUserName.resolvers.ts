import {Resolver, Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        duplicateLoginUserName: (async (_,{userName},{client}) => {

            const duplicateResult = await client.user.findUnique({
                where : {
                    userName
                }
            })

            if(!duplicateResult){
                return {
                    ok : false,
                    error: "해당하는 아이디가 없습니다."
                }
            }
            return {
                ok : true,
            }
        })
    }
}

export default resolvers;