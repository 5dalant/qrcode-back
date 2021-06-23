import {Resolvers} from "../../types";
import {protectedResolver} from "../users.utils";

const resolvers: Resolvers = {

    Query: {
        seeProfile: protectedResolver(async (_, {id}, {loggedUser, client}) => {

                if (loggedUser.id != 2 && id != loggedUser.id) {
                     return {
                         error: "관리자 및 해당유저 계정만 열람 가능합니다."
                     }
                }

                return await client.user.findUnique({
                    where: {
                        id
                    }
                });
            }
        ),
    },
};

export default resolvers;