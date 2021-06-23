import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";

const resolvers : Resolvers = {

    Query : {
        seeQrTemp : protectedResolver(async (_,{userId},{loggedUser,client}) => {

            if (loggedUser.id != 2) {
                return {
                    ok: false,
                    error: "qr코드 삭제는 관리자 또는 해당 사용자만 가능합니다."
                }
            }

            return await client.qrtemp.findMany({
                where : {
                    userId
                }
            });
        })
    }
}

export default resolvers;