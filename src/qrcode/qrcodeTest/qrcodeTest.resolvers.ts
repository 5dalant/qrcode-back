import {Resolvers} from "../../types";

const resolvers : Resolvers = {

    Mutation : {
        qrcodeTest: async (_,{qrCodes}) => {
            const Hello = JSON.parse(qrCodes);
            Hello.map(qrCode => {
                console.log(qrCode.qrCodeName);
            })
            return {
                ok : true,
            }
        }
    }
}

export default resolvers;