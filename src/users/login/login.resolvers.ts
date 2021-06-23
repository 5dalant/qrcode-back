import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Resolvers} from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
    Mutation: {
        login: async (_, {userName, password}) => {
            const user = await client.user.findUnique({where: {userName}});
            if (!user) {
                return {
                    ok: false,
                    error: "해당하는 아이디가 없습니다."
                }
            }

            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "잘못된 비밀번호를 입력 하였습니다.",
                }
            }

            const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
                userId : user.id,
                userName : user.userName
            }
        }
    }
}
export default resolvers;