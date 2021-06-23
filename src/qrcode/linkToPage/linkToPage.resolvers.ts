import {Resolvers} from "../../types";
import client from "../../client";

const resolvers: Resolvers = {
    Query: {
        linkToPage: (async (_, {requestUrl},) => {
            return await client.qrcode.findUnique(
                {
                    where: {
                        requestUrl,
                    }
                }
            )
        })
    }
}
export default resolvers;