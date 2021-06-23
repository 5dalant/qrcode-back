import {Resolvers} from "../../types";
import {protectedResolver} from "../users.utils";

const resolvers: Resolvers = {
    Query: {
        duplicateUserName: protectedResolver(async (_, {userName}, {loggedUser, client}) => {

            if (loggedUser.id != 2) {
                return {
                    ok: false,
                    error: "중복확인은 관리자만 가능합니다."
                }
            }

            const countResult = await client.user.count({
                where: {
                    userName
                }
            })

            if (countResult == 0) {
                return {ok: true}
            } else {
                return {
                    ok: false,
                    error : "중복된 계정입니다."
                }
            }


        })
    }
}

export default resolvers;