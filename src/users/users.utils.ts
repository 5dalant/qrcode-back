import * as jwt from 'jsonwebtoken';
import client from '../client';
import { Resolver } from '../types';

export const getUser = async authorization => {
    try {
        if (!authorization) {
            return null;
        }
        const verifiedAuth: any = await jwt.verify(authorization, process.env.SECRET_KEY);
        if ('id' in verifiedAuth) {
            const user = await client.user.findUnique({ where: { id: verifiedAuth['id'] } });
            if (user) {
                return user;
            }
        }
    } catch {
        return null;
    }
};

export function protectedResolver(ourResolver: Resolver) {
    return function(root, args, context, info) {
        const query = info.operation.operation === 'query';
        if (!context.loggedUser) {
            if (query) {
                return null;
            } else {
                return {
                    ok: false,
                    error: 'You need to login.',
                };
            }
        }
        return ourResolver(root, args, context, info);
    };
}
