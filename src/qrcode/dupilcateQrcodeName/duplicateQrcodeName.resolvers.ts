import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        duplicateQrcodeName: protectedResolver(async (_, {userId,qrCodeName}, {loggedUser, client}) => {
            const qrCodeValid = await client.qrcode.count({
                where : {
                    userId,
                    qrCodeName,
                }
            })

            if(qrCodeValid == 0){
                return {
                    ok : true
                }
            }else{
                return {
                    ok : false,
                    error : "사용중인 qrCodeName 입니다."
                }
            }
        }),
    }

}

export default resolvers