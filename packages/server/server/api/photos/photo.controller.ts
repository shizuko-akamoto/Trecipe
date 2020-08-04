import { NextFunction, Request, Response, Router } from 'express';
import axios, { AxiosResponse } from 'axios';
import logger from '../../common/logger';
import { InternalServerError } from 'express-openapi-validator/dist';
import { HttpError } from 'express-openapi-validator/dist/framework/types';

class PhotoController {
    public readonly path = '/photos';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:photoRef`, this.getPhoto.bind(this));
    }

    private getPhoto(req: Request, res: Response, next: NextFunction) {
        const photoRef = req.params.photoRef;
        const { maxHeight, maxWidth } = req.query;
        const url = new URL('https://maps.googleapis.com/maps/api/place/photo');
        const urlParams = new URLSearchParams({
            photoreference: `${photoRef}`,
            key: `${process.env.GOOGLE_MAPS_API_KEY}`,
        });
        if (maxHeight) {
            urlParams.append('maxheight', maxHeight.toString());
        } else if (maxWidth) {
            urlParams.append('maxwidth', maxWidth.toString());
        } else {
            // if no max size is given, set to default, 500px
            urlParams.append('maxheight', '500');
        }
        url.search = `?${urlParams.toString()}`;
        logger.info(`Making google place photo request with photo reference: ${url.toString()}`);
        axios
            .get(url.toString(), { responseType: 'stream' })
            .then((result: AxiosResponse) => {
                if (result.status === 200) {
                    result.data.pipe(res);
                } else {
                    next(
                        HttpError.create({
                            status: result.status,
                            path: `${this.path}/${photoRef}`,
                        })
                    );
                }
            })
            .catch((err) =>
                next(
                    new InternalServerError({
                        path: `${this.path}/${photoRef}`,
                        message: err.toString(),
                    })
                )
            );
    }
}

export default PhotoController;
