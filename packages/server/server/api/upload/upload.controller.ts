import { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import { NotFound } from 'express-openapi-validator/dist';
import logger from '../../common/logger';

class UploadController {
    public readonly path = '/upload';
    public readonly router = Router();
    private gfs;

    constructor() {
        this.initializeRoutes();
        this.createGFSStream();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.uploadFile.bind(this));
        this.router.get(`${this.path}/:filename`, this.getFile.bind(this));
    }

    private createGFSStream() {
        mongoose.connection.once('open', () => {
            this.gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: 'uploads',
            });
            logger.info('GFS stream created');
        });
    }

    private uploadFile(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            logger.warn(`failed to upload file: file not found`);
            next(new NotFound({ path: this.path, message: 'File not found' }));
        } else {
            logger.info(`uploaded file with filename ${req.file.filename}`);
            res.status(201).json({
                file: req.file,
            });
        }
    }

    private getFile(req: Request, res: Response, next: NextFunction) {
        const filename = req.params.filename;
        if (!this.gfs) {
            logger.warn('GFS not initialized');
            next('GFS not initialized');
        }
        this.gfs.find({ filename: filename }).toArray((err, files) => {
            if (!files || files.length === 0) {
                next(
                    new NotFound({
                        path: this.path,
                        message: `File with filename ${filename} not found`,
                    })
                );
            } else {
                this.gfs.openDownloadStreamByName(filename).pipe(res);
            }
        });
    }
}

export default UploadController;
