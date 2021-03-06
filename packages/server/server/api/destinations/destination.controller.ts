import Controller from '../../common/controller';
import { NextFunction, Request, Response, Router } from 'express';
import Destination, { UserRating } from '../../../../shared/models/destination';
import { DestWithStatus } from '../../../../shared/models/trecipe';
import { CreateNewDestinationDTO } from '../../../../shared/models/createNewDestinationDTO';
import DestinationService from './destination.service';
import { uuid } from 'uuidv4';
import axios from 'axios';
import logger from '../../common/logger';
import { passportAuth, passportAuthAnon } from '../../common/passport/passportUtils';

/**
 * Destination Controller
 */
class DestinationController implements Controller {
    public readonly path = '/destinations';
    public readonly router = Router();
    private photosEndpoint = `/${process.env.API_VERSION}/photos`;

    constructor() {
        this.initializeRoutes();
    }

    /**
     * Registers each path in destination routes
     */
    private initializeRoutes() {
        this.router.post(this.path, passportAuth, this.createDestination.bind(this));
        this.router.post(`${this.path}/rate/:id`, this.updateDestinationUserRating.bind(this));
        this.router.get(this.path, this.getDestinationByPlaceId.bind(this));
        this.router.get(
            `${this.path}/in`,
            passportAuthAnon,
            this.getDestinationsByTrecipeId.bind(this)
        );
        this.router.get(`${this.path}/:id`, this.getDestinationById.bind(this));
    }

    /**
     * Queries google place photo api to fetch photo reference strings
     * @param placeId: place id to fetch photos for
     */
    private fetchPhotoRefs(placeId: string) {
        const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
        const urlParams = new URLSearchParams({
            place_id: `${placeId}`,
            key: `${process.env.GOOGLE_MAPS_API_KEY}`,
            fields: 'photo',
        });
        url.search = `?${urlParams.toString()}`;
        return axios.get(url.toString()).then((response) => {
            const { status, result } = response.data;
            if (status !== 'OK') {
                return Promise.reject(`Response's status is not OK : ${status}`);
            }
            return Promise.resolve(result.photos.map((photo) => photo.photo_reference));
        });
    }

    /**
     * Creates a new destination record.
     * Fills in photoRefs with urls client can query to retreive photos.
     * Initialize userRatings, uuid, and description with default values.
     */
    private createDestination(req: Request, res: Response, next: NextFunction) {
        const dest: CreateNewDestinationDTO = req.body;
        this.fetchPhotoRefs(dest.placeId)
            .catch((err) => {
                logger.warn(`Failed to get photo references: ${err.toString()}`);
                return Promise.resolve([]);
            })
            .then((photoRefs: string[]) => {
                logger.info(photoRefs);
                const newDest: Destination = {
                    uuid: uuid(),
                    userRatings: [] as UserRating[],
                    photoRefs: photoRefs.map((ref) => `${this.photosEndpoint}/${ref}`),
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
                return DestinationService.createDestination(newDest);
            })
            .then((createdDest: Destination) => {
                res.status(201).json(createdDest);
            })
            .catch((err) => next(err));
    }

    /**
     * Retrieves all destinations contained in a trecipe of given uuid
     */
    private getDestinationsByTrecipeId(req: Request, res: Response, next: NextFunction) {
        const trecipeUUID: string = req.query.id as string;
        DestinationService.getDestinationsByTrecipeId(trecipeUUID, req.user)
            .then((destsWithStatus: Array<DestWithStatus>) => {
                res.status(200).json(destsWithStatus);
            })
            .catch((err) => next(err));
    }

    /**
     * Gets a destination by its google place id
     */
    private getDestinationByPlaceId(req: Request, res: Response, next: NextFunction) {
        const placeId: string = req.query.placeId as string;
        DestinationService.getDestinationByPlaceId(placeId)
            .then((dest: Destination) => {
                res.status(200).json(dest);
            })
            .catch((err) => next(err));
    }

    /**
     * Gets a destination by its uuid
     */
    private getDestinationById(req: Request, res: Response, next: NextFunction) {
        DestinationService.getDestinationById(req.params.id)
            .then((dest: Destination) => {
                res.status(200).json(dest);
            })
            .catch((err) => next(err));
    }

    /**
     * Update a destination of given uuid with new user rating entry
     */
    private updateDestinationUserRating(req: Request, res: Response, next: NextFunction) {
        DestinationService.getDestinationById(req.params.id)
            .then((dest: Destination) => {
                const newRatingArray = dest.userRatings.filter(
                    (rating) => rating.userId != req.body.userId
                );
                dest.userRatings = newRatingArray.concat({
                    userId: req.body.userId,
                    rating: req.body.rating,
                });
                DestinationService.updateDestinationById(req.params.id, dest).then(
                    (dest: Destination) => {
                        res.status(200).json(dest);
                    }
                );
            })
            .catch((err) => next(err));
    }
}

export default DestinationController;
