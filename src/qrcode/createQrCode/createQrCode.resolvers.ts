import {Resolvers} from "../../types";
import {protectedResolver} from "../../users/users.utils";
import {fileExist, uploadQrcode} from "../../shared.util";
import fs from "fs";

const resolvers: Resolvers = {
    Mutation: {
        createQrCode: protectedResolver(async (_, {userId, qrCodes}, {
            loggedUser, client
        }) => {

            if (loggedUser.id != 2 && userId != loggedUser.id) {
                return {
                    ok: false,
                    error: "qr코드 조회는 관리자 또는 해당 사용자만 가능합니다."
                }
            }

            const parseQrCodes = JSON.parse(qrCodes);
            console.log(parseQrCodes);
            try {

                let checkUrl;

                fileExist(userId);
                parseQrCodes.map(async qrCode => {
                    let randomString = Math.random().toString(36).substr(2, 11);

                    let randomStringResult = await client.qrcode.count({
                        where: {
                            img: {
                                startsWith: randomString
                            }
                        }
                    });
                    if (randomStringResult != 0) {
                        while (true) {
                            randomString = Math.random().toString(36).substr(2, 11);
                            randomStringResult = await client.qrcode.count({
                                where: {
                                    img: {
                                        startsWith: randomString
                                    }
                                }
                            });
                            if (randomStringResult == 0) {
                                break;
                            }
                        }
                    }

                    if(qrCode.forwardUrl.includes("http://")){
                        checkUrl = qrCode.forwardUrl;
                    }else if(qrCode.forwardUrl.includes("https://")){
                        checkUrl = qrCode.forwardUrl;
                    }else{
                        checkUrl = "https://" + qrCode.forwardUrl;
                    }

                    const fileUrl = await uploadQrcode(randomString, userId, 'svg');
                    await uploadQrcode(randomString, userId, 'png');
                    await client.qrcode.create({
                        data: {
                            userId,
                            qrCodeName: qrCode.qrCodeName,
                            forwardUrl: checkUrl,
                            requestUrl: randomString,
                            img: fileUrl,
                        }
                    });

                })

                await client.qrtemp.deleteMany({
                    where : {
                        userId
                    }
                })

                return {
                    ok: true,
                }

            } catch (e) {
                return {
                    ok: false,
                    error: "QR등록 도중 오류가 발생하얐습니다."
                }
            }
        }),
    }
}

export default resolvers;
