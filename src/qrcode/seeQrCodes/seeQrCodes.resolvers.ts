import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";
import {fileExist} from "../../shared.util";

const resolvers: Resolvers = {
    Query: {
        seeQrCodes: protectedResolver(async (_, {userId, keywordOption, keyword, page, countOption}, {
            loggedUser,
            client
        }) => {

            console.log(keyword);
            console.log(keywordOption);

            if (loggedUser.id != 2 && userId != loggedUser.id) {
                return {
                    ok: false,
                    error: "QR코드는 관리자 또는 자신만 볼 수 있습니다."
                }
            }

            let qrcodes;
            let totalPages;

            if (keyword == "" || keyword == null) {
                qrcodes = await client.qrcode.findMany({
                    where: {
                        userId,
                    },
                    take: countOption,
                    skip: (page - 1) * countOption
                })
                totalPages = await client.qrcode.count({
                    where: {
                        userId
                    }
                })
            } else {
                if (keywordOption == "qrCodeName") {
                    qrcodes = await client.qrcode.findMany({
                        where: {
                            userId,
                            qrCodeName: {
                                startsWith: keyword.toLowerCase(),
                            }
                        },
                        take: countOption,
                        skip: (page - 1) * countOption,
                    })
                    totalPages = await client.qrcode.count({
                        where: {
                            userId,
                            qrCodeName: {
                                startsWith: keyword.toLowerCase()
                            }
                        }
                    })
                } else {
                    qrcodes = await client.qrcode.findMany({
                        where: {
                            userId,
                            requestUrl: {
                                startsWith: keyword.toLowerCase(),
                            }
                        },
                        take: countOption,
                        skip: (page - 1) * countOption,
                    })
                    totalPages = await client.qrcode.count({
                        where: {
                            userId,
                            requestUrl: {
                                startsWith: keyword.toLowerCase()
                            }
                        }
                    })
                }
            }

            return {
                totalPages,
                qrCodes: qrcodes
            }
        })
    }
};

export default resolvers;