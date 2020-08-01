import Controller from '../../common/controller';
import { NextFunction, Request, Response, Router } from 'express';
import Destination, { Rating } from '../../../../shared/models/destination';
import { DestWithStatus } from '../../../../shared/models/trecipe';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import DestinationService from './destination.service';
import { uuid } from 'uuidv4';
import { passportAuth } from '../../common/passport/passportUtils';

class DestinationController implements Controller {
    public readonly path = '/destinations';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(this.path, passportAuth, this.createDestination.bind(this));
        this.router.get(this.path, this.getDestinationByPlaceId.bind(this));
        this.router.get(
            `${this.path}/in`,
            passportAuth,
            this.getDestinationsByTrecipeId.bind(this)
        );
        this.router.get(`${this.path}/:id`, this.getDestinationById.bind(this));
    }

    private createDestination(req: Request, res: Response, next: NextFunction) {
        const dest: CreateNewDestinationDTO = req.body;
        const newDest: Destination = {
            uuid: uuid(),
            userRatings: [] as Rating[],
            photoRefs: [],
            name: dest.name,
            description: '',
            category: dest.category,
            geometry: dest.geometry,
            formattedPhoneNumber: dest.formattedPhoneNumber,
            formattedAddress: dest.formattedAddress,
            rating: dest.rating,
            placeId: dest.placeId,
            website: dest.website,
        };
        DestinationService.createDestination(newDest)
            .then((createdDest: Destination) => {
                res.status(201).json(createdDest);
            })
            .catch((err) => next(err));
    }

    private getDestinationsByTrecipeId(req: Request, res: Response, next: NextFunction) {
        const trecipeUUID: string = req.query.id as string;
        DestinationService.getDestinationsByTrecipeId(trecipeUUID)
            .then((destsWithStatus: Array<DestWithStatus>) => {
                res.status(200).json(destsWithStatus);
            })
            .catch((err) => next(err));
    }

    private getDestinationByPlaceId(req: Request, res: Response, next: NextFunction) {
        const placeId: string = req.query.placeId as string;
        DestinationService.getDestinationByPlaceId(placeId)
            .then((dest: Destination) => {
                res.status(200).json(dest);
            })
            .catch((err) => next(err));
    }

    private getDestinationById(req: Request, res: Response, next: NextFunction) {
        DestinationService.getDestinationById(req.params.id)
            .then((dest: Destination) => {
                res.status(200).json(dest);
            })
            .catch((err) => next(err));
    }
}

export default DestinationController;
