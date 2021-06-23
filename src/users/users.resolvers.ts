import client from "../client";

export default {
    User: {
        qrcodes: ({id}) => {
            return client.qrcode.findMany({
                where: {
                    userId: id
                }
            })
        },
    }
}