import {Resolvers} from "../../types";
import {protectedResolver} from "../users.utils";

const resolvers: Resolvers = {
    Query: {
        searchUsers: protectedResolver(async (_, {keyword, page}, {loggedUser, client}) => {

            if (loggedUser.id != 2) {
                return {
                    ok: false,
                    error: "유저 검색은 관리자만 가능합니다.",
                }
            }

            const users = await client.user.findMany({
                where: {
                    id : {
                        not: loggedUser.id,
                    },
                    companyName: {
                        startsWith: keyword.toLowerCase(),
                    }
                },
                take: 10,
                skip: (page - 1) * 10,
            });

            const totalPages = await client.user.count({
                where: {
                    id : {
                        not: loggedUser.id,
                    },
                    companyName: {
                        startsWith: keyword.toLowerCase(),
                    }
                },
            });

            return {
                ok: true,
                users,
                totalPages:Math.ceil(totalPages / 10),
            }
        })
    }
}

export default resolvers;