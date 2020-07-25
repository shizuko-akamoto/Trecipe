import { Application } from 'express';
import TrecipeController from './api/trecipe/trecipe.controller';
import Controller from './common/controller';
import DestinationController from './api/destinations/destination.controller';
import UploadController from './api/upload/upload.controller';
import * as path from "path";
export default function routes(app: Application): void {
    const controllers = [
        new TrecipeController(),
        new DestinationController(),
        new UploadController(),
    ];
    controllers.forEach((controller: Controller) => {
        app.use('/api/v1', controller.router);
    });
    if (process.env.NODE_ENV === 'production') {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../build/index.html'));
        });
    }
}
