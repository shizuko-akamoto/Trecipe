import { Application } from 'express';
import TrecipeController from './api/trecipe/trecipe.controller';
import Controller from './common/controller';
export default function routes(app: Application): void {
    const controllers = [new TrecipeController()];
    controllers.forEach((controller: Controller) => {
        app.use('/api/v1', controller.router);
    });
}
