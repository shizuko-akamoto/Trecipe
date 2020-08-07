import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import { setupPassport } from './passport/passportUtils';
import GridFsStorage from 'multer-gridfs-storage';

import installValidator from './openapi';
import multer from 'multer';

const app = express();
const exit = process.exit;

export default class ExpressServer {
    private routes: (app: Application) => void;
    constructor() {
        // after compiling the server side, we get a /dist folder with js files
        // root here refers to the root of that /dist folder
        // /dist
        // -----/build
        // -----/server
        // ----------/server
        // ---------------/api
        // ---------------/common
        // --------------------server.js
        // ----------/shared
        const root = path.normalize(__dirname + '/../../..');
        app.set('appPath', root + 'client');
        app.use(
            cors({
                origin: true,
                credentials: true,
            })
        );
        app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(
            bodyParser.urlencoded({
                extended: true,
                limit: process.env.REQUEST_LIMIT || '100kb',
            })
        );
        app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
        app.use(cookieParser(process.env.SESSION_SECRET));
        app.use(passport.initialize());
        setupPassport(passport);

        // if in prod, we serve react app, otherwise we serve swagger ui
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(`${root}/build`));
        } else {
            app.use(express.static(`${root}/public`));
        }

        // set up mongoose connection
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        const connection = mongoose.connect(
            `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        mongoose.connection.once('open', () => {
            l.info(`connected to MongoDB via Mongoose`);
        });
        mongoose.connection.on('error', (err) => {
            l.error(`unable to connect to Mongo via Mongoose`, err);
            exit(1);
        });

        // initialize grid fs storage for image uploads to MongoDB
        const storage = new GridFsStorage({
            db: connection,
            file: (req, file) => {
                return new Promise((resolve, reject) => {
                    GridFsStorage.generateBytes()
                        .then((res: { filename: string }) => {
                            const filenameWithExt = res.filename + path.extname(file.originalname);
                            const fileInfo = {
                                filename: filenameWithExt,
                                bucketName: 'uploads',
                            };
                            resolve(fileInfo);
                        })
                        .catch((err) => reject(err));
                });
            },
        });
        storage
            .ready()
            .then(() => {
                l.info('gridfs storage setup successful');
            })
            .catch((err) => {
                l.error('gridfs storage setup failed', err);
                exit(1);
            });
        const upload = multer({ storage }).single('file');
        app.use(upload);
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
