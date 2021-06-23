import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";

const resolvers : Resolvers = {
    Query : {
        seeAllQrCodes : protectedResolver(async (_,{userId},{loggedUser,client}) => {
            const userResult = await client.qrcode.findUnique({
                where: {
                    id : userId,
                }
            });

            if (loggedUser.id != 2 && !userResult) {
                return {
                    ok: false,
                    error: "qr코드 다운로드는 관리자 및 해당 사용자만 가능합니다."
                }
            }

            return await client.qrcode.findMany({
                where : {
                    userId
                }
            })
        })
    }
}

export default resolvers;