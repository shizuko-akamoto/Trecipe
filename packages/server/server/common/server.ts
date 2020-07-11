import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import mongoose from 'mongoose';
import cors from 'cors';

import installValidator from './openapi';

const app = express();
const exit = process.exit;

export default class ExpressServer {
    private routes: (app: Application) => void;
    constructor() {
        const root = path.normalize(__dirname + '/../..');
        app.set('appPath', root + 'client');
        app.use(cors());
        app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb',
            })
        );
        app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(express.static(`${root}/public`));

        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        mongoose.connection.once('open', () => {
            l.info(`connected to MongoDB vis Mongoose`);
        });
        mongoose.connection.on('error', (err) => {
            l.error(`unable to connect to Mongo via Mongoose`, err);
            exit(1);
        });
    }

    router(routes: (app: Application) => void): ExpressServer {
        this.routes = routes;
        return this;
    }

    listen(port: number): Application {
        const welcome = (p: number) => (): void =>
            l.info(
                `up and running in ${
                    process.env.NODE_ENV || 'development'
                } @: ${os.hostname()} on port: ${p}}`
            );

        installValidator(app, this.routes)
            .then(() => {
                http.createServer(app).listen(port, welcome(port));
            })
            .catch((e) => {
                l.error(e);
                exit(1);
            });

        return app;
    }
}
