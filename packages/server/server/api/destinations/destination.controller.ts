import Controller from '../../common/controller';
import { NextFunction, Request, Response, Router } from 'express';
import Destination from './destination.interface';
import { CreateNewDestinationDTO } from './destination.dto';
import DestinationService from './destination.service';
import { uuid } from 'uuidv4';
import { InternalServerError } from 'express-openapi-validator/dist';
import { DestWithStatus } from '../trecipe/trecipe.interface';

class DestinationController implements Controller {
    public readonly path = '/destinations';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, this.createDestination.bind(this));
        this.router.get(this.path, this.getDestinationsByTrecipeId.bind(this));
    }

    private createDestination(req: Request, res: Response, next: NextFunction) {
        const dest: CreateNewDestinationDTO = req.body;
        const newDest: Destination = {
            uuid: uuid(),
            userRatings: [],
            photoRefs: [],
            ...dest,
        };
        DestinationService.createDestination(newDest)
            .then((createdDest: Destination) => {
                res.status(201).json(createdDest);
            })
            .catch((err) => {
                next(
                    new InternalServerError({
                        path: this.path,
                        message: `Failed to create destination ${err.toString()}`,
                    })
                );
            });
    }

    private getDestinationsByTrecipeId(req: Request, res: Response, next: NextFunction) {
        const trecipeUUID: string = req.query.id as string;
        DestinationService.getDestinationsByTrecipeId(trecipeUUID)
            .then((destsWithStatus: Array<DestWithStatus>) => {
                res.status(200).json({ destinations: destsWithStatus });
            })
            .catch((err) => {
                next(new InternalServerError({ path: this.path, message: err.toString() }));
            });
    }
}

export default DestinationController;
