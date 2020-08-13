import { Strategy as JWTStrategy, StrategyOptions } from 'passport-jwt';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import fs from 'fs';
import path from 'path';
import passport, { PassportStatic } from 'passport';
import Jwt, { SignOptions } from 'jsonwebtoken';
import { User } from '../../../../shared/models/user';
import UserService from '../../api/user/user.service';
import { Request } from 'express';
import logger from '../logger';

// Middleware for authenticating user, use this function for all protected routes
export const passportAuth = passport.authenticate('jwt', { session: false, failWithError: true });

// Middleware for optional authentication
export const passportAuthAnon = passport.authenticate(['jwt', 'anonymous'], {
    session: false,
    failWithError: true,
});

// Setup passport to extract jwt token from cookie
export function setupPassport(passport: PassportStatic): void {
    const pathToPublicKey = path.join(__dirname, 'id_rsa_pub.pem');
    logger.info(`reading public key: ${pathToPublicKey}`);
    const PUB_KEY = fs.readFileSync(pathToPublicKey, 'utf8');

    const cookieExtractor = (req: Request) => {
        return req && req.cookies ? req.cookies['access_token'] : null;
    };

    const options: StrategyOptions = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: PUB_KEY,
        algorithms: ['RS256'],
    };

    /**
     * Add a jwt strategy to passport
     * This will be used when passport.authenticate('jwt') is called
     */
    passport.use(
        new JWTStrategy(options, (jwtPayload, done) => {
            UserService.getUserByUsername(jwtPayload.username)
                .then((user: User) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect username or password' });
                    }
                })
                .catch((err) => {
                    return done(err, false);
                });
        })
    );

    passport.use(new AnonymousStrategy());
}

export function signJwt(user: User): Promise<string> {
    const JwtPayload = {
        username: user.username,
    };

    const JwtOptions: SignOptions = {
        expiresIn: '1d',
        algorithm: 'RS256',
    };

    return new Promise<string>((resolve, reject) => {
        Jwt.sign(
            JwtPayload,
            process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
            JwtOptions,
            (err, token) => {
                if (err) {
                    logger.warn(`JWT sign failed: ${err.message}`);
                    return reject(err);
                }
                logger.info(`JWT sign success`);
                resolve(token);
            }
        );
    });
}
