import AWS from 'aws-sdk';
import QRCode from "qrcode";
import fs from "fs";

AWS.config.update({
    credentials: {
        accessKeyId: "AKIATBFYXYLEWOIBKMXD",
        secretAccessKey: "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",
    },
});

export const uploadQrcode = async (randomString, userId,ext) => {
    await QRCode.toFile(`${__dirname}/qrimg/${userId}/${randomString}.${ext}`,"www.naver.com",{width:300,type:ext});
    return `/qrimg/${userId}/${randomString}.${ext}`;
};

export const fileExist = (userId) => {
    if(!fs.existsSync(`${__dirname}/qrimg/${userId}`)){
        fs.mkdir(`${__dirname}/qrimg/${userId}`);
    }
}



