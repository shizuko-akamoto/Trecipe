import { Application } from 'express';
import TrecipeController from './api/trecipe/trecipe.controller';
import Controller from './common/controller';
import DestinationController from './api/destinations/destination.controller';
import UploadController from './api/upload/upload.controller';
import SearchController from './api/search/search.controller';
export default function routes(app: Application): void {
    const controllers = [
        new TrecipeController(),
        new DestinationController(),
        new UploadController(),
        new SearchController(),
    ];
    controllers.forEach((controller: Controller) => {
        app.use('/api/v1', controller.router);
    });
}
