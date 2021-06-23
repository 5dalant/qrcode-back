import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

type Context = {
    loggedUser: User;
    client: PrismaClient;
};

export type Resolver = (root: any, arg: any, context: Context, info: any) => any;

export type Resolvers = {
    [key: string]: {
        [key: string]: Resolver;
    };
};
