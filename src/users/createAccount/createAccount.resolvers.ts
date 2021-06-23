import {Resolvers} from "../../types";
import bcrypt from 'bcrypt';
import {protectedResolver} from "../users.utils";

const resolvers: Resolvers = {
    Mutation: {
        createAccount: protectedResolver(async (_, {userName, password, companyName,siteUrl,userActivate}, {loggedUser, client}) => {
            try {
                if(loggedUser.id != 2){
                    throw new Error('아이디 생성은 관리자만 가능합니다');
                }

                const existingUser = await client.user.findFirst({
                    where : {
                        userName
                    }
                });
                if(existingUser){
                    throw new Error('이미 중복된 계정이 있습니다.');
                }
                const uglyPassword = await bcrypt.hash(password, 10);

                await client.user.create({
                    data: {
                        userName,
                        password : uglyPassword,
                        companyName,
                        siteUrl,
                        userActivate,
                    },
                });
                return {
                    ok:true,
                }
            }catch (e){
                return {
                    ok: false,
                    error: '계정을 생성 할 수 없습니다.',
                };
            }
        })
    }
}

export default resolvers;