import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";

const resolvers: Resolvers = {

    Mutation: {
        deleteQrCode: protectedResolver(async (_, {requestUrl,userId}, {loggedUser, client}) => {

            const userResult = await client.qrcode.findUnique({
                where: {
                    id : userId,
                }
            })

            if (loggedUser.id != 2 && userResult.userId != loggedUser.id) {
                return {
                    ok: false,
                    error: "qr코드 삭제는 관리자 또는 해당 사용자만 가능합니다."
                }
            }

            try{
                if(requestUrl == "all"){
                    await client.qrcode.deleteMany({
                        where : {
                            userId
                        }
                    })
                }else{
                    const requestUrlArray = JSON.parse(requestUrl);
                    requestUrlArray.map(async deleteUrl => {
                        await client.qrcode.delete({
                            where : {
                                requestUrl : deleteUrl,
                            }
                        })
                    })
                }
                return {
                    ok: true,
                }
            }catch (e){
                return {
                    ok : false,
                    error : e
                }
            }
        })
    }
}

export default resolvers;