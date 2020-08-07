import { Application } from 'express';
import TrecipeController from './api/trecipes/trecipe.controller';
import Controller from './common/controller';
import DestinationController from './api/destinations/destination.controller';
import UserController from './api/user/user.controller';
import UploadController from './api/upload/upload.controller';
import PhotoController from './api/photos/photo.controller';
import SearchController from './api/search/search.controller';
import * as path from 'path';

export default function routes(app: Application): void {
    const controllers = [
        new TrecipeController(),
        new DestinationController(),
        new UserController(),
        new UploadController(),
        new PhotoController(),
        new SearchController(),
    ];
    // register each routes in controllers
    controllers.forEach((controller: Controller) => {
        app.use(`/${process.env.API_VERSION}` || '/api/v1', controller.router);
    });
    if (process.env.NODE_ENV === 'production') {
        // catch all - if path does not match any of the defined routes in prod, we serve our react frontend
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../build/index.html'));
        });
    }
}
