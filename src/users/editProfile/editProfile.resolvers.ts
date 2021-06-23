import {Resolvers} from "../../types";
import {protectedResolver} from "../users.utils";
import bcrypt from 'bcrypt';

const resolvers : Resolvers = {
    Mutation : {
        editProfile : protectedResolver(async (_, {id, password,companyName,siteUrl,userActivate},{loggedUser,client}) => {

            if (loggedUser.id != 2 && id != loggedUser.id) {
                return {
                    ok: false,
                    error: "프로필 변경은 관리자 및 본인만 가능합니다."
                }
            }

            const uglyPassword = await bcrypt.hash(password, 10);


            const updateResult = await client.user.update({
                where : {
                    id
                },
                data:{
                    companyName,
                    password : uglyPassword,
                    siteUrl,
                    userActivate,
                }
            });
            if(updateResult.id) {
                return {
                    ok: true,
                }
            }else{
                return {
                    ok: false,
                    error: '프로필 변경에 실패하였습니다',
                };
            }
        })
    }
}

export default resolvers;