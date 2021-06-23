require('dotenv').config();
import { getUser } from './users/users.utils';
import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schema';
import logger from 'morgan';
import client from './client';
import path from "path";
import cors from "cors";

const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ctx => {
        if (ctx.req) {
            return {
                loggedUser: await getUser(ctx.req.headers.token),
                client,
            };
        } else {
            const {
                connection: {context},
            } = ctx;
            return {
                loggedUser: context.loggedUser,
            };
        }
    },
    subscriptions: {
        onConnect: async ({token}: { token?: string }) => {
            if (!token) {
                throw new Error("You can't listen");
            }
            const loggedUser = await getUser(token);
            return {
                loggedUser,
            };
        },
    },
});

const PORT = process.env.PORT;

const app = express();
app.use(logger('tiny'));
app.use(cors());
apollo.applyMiddleware({ app });
app.use('/qrimg',express.static(path.join(__dirname, "/qrimg")));
//app.use('/qrimg',express.static(__dirname+"/qrimg"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
    console.log(`😜Server is running http://localhost:${PORT}/`);
});