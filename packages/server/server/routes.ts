import { Application } from 'express';
import TrecipeController from './api/trecipes/trecipe.controller';
import Controller from './common/controller';
import DestinationController from './api/destinations/destination.controller';
import UserController from './api/user/user.controller';
import UploadController from './api/upload/upload.controller';

export default function routes(app: Application): void {
    const controllers = [
        new TrecipeController(),
        new DestinationController(),
        new UserController(),
        new UploadController(),
    ];
    controllers.forEach((controller: Controller) => {
        app.use('/api/v1', controller.router);
    });
}
