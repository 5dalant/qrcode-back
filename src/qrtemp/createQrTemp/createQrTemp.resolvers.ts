import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";

const resolvers : Resolvers = {

    Mutation : {
        createQrTemp : protectedResolver(async (_, {qrTemps,userId},{loggedUser,client})=>{


            if (loggedUser.id != 2) {
                return {
                    ok: false,
                    error: "qr코드 삭제는 관리자 또는 해당 사용자만 가능합니다."
                }
            }

            const parseQrTemps = JSON.parse(qrTemps);

            await client.qrtemp.deleteMany({
                where : {
                    userId,
                }
            })

            parseQrTemps.map(async qrTemp =>{
                if(qrTemp.qrName != "" && qrTemp.url != ""){
                    await client.qrtemp.create({
                        data : {
                            qrTempName : qrTemp.qrTempName,
                            forwardUrl : qrTemp.forwardUrl,
                            userId
                        }
                    })
                }
            });

            return {
                ok : true,
            }
        })
    }
}

export default resolvers;