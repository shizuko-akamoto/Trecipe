import { Application } from 'express';
import TrecipeController from './api/trecipe/trecipe.controller';
import Controller from './common/controller';
import UploadController from './api/upload/upload.controller';
export default function routes(app: Application): void {
    const controllers = [new TrecipeController(), new UploadController()];
    controllers.forEach((controller: Controller) => {
        app.use('/api/v1', controller.router);
    });
}
