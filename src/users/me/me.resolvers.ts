import {Resolvers} from "../../types";
import {protectedResolver} from "../users.utils";

const reslovers : Resolvers = {

    Query : {
        me:protectedResolver(async (_,__,{loggedUser,client}) => {
            return await client.user.findUnique({
                where : {
                    id : loggedUser.id
                }
            })
        })
    }
}

export default reslovers