import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";

const resolvers: Resolvers = {

    Mutation: {
        updateQrCodes: protectedResolver(async (_, {qrCodeName, forwardUrl, requestUrl}, {loggedUser, client}) => {

            try {

            }catch (e){
                return {
                    ok : false,
                    error : e
                }
            }

            await client.qrcode.update({
                where: {
                    requestUrl,
                },
                data: {
                    qrCodeName,
                    forwardUrl,
                }
            })

            return {
                ok : true
            }
        }),
    }
}

export default resolvers;