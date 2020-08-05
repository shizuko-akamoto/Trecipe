import Controller from '../../common/controller';
import { NextFunction, Request, Response, Router } from 'express';
import trecipeModel from '../trecipes/trecipe.model';
import Trecipe from '../../../../shared/models/trecipe';
import userModel from '../user/user.model';
import { User } from '../../../../shared/models/user';
import destinationModel from '../destinations/destination.model';
import Destination from '../../../../shared/models/destination';
import logger from '../../common/logger';
import { mapToSearchResult } from './search.interface';

class SearchController implements Controller {
    public readonly path = '/search';
    public readonly destinationPath = '/destinations';
    public readonly trecipePath = '/trecipes';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:keyword`, this.performSearch.bind(this));
        this.router.get(
            `${this.path + this.trecipePath}/:keyword`,
            this.performTrecipeSearch.bind(this)
        );
        this.router.get(
            `${this.path + this.destinationPath}/:keyword`,
            this.performDestinationSearch.bind(this)
        );
    }

    private performSearch(req: Request, res: Response, next: NextFunction) {
        const keyword = req.params.keyword;
        const offset = Number(req.query.offset as string);
        const limit = Number(req.query.limit as string);

        logger.info('performing search with keyword' + keyword);

        Promise.all([
            this.searchTrecipe(keyword, offset, limit),
            this.searchDestination(keyword, offset, limit),
            this.searchUser(keyword, offset, limit),
        ])
            .then((results: [Trecipe[], Destination[], User[]]) => {
                res.status(200).json(mapToSearchResult(results));
            })
            .catch((err) => next(err));
    }

    private performTrecipeSearch(req: Request, res: Response, next: NextFunction) {
        const keyword = req.params.keyword;
        const limit = Number(req.query.limit);

        // No offset for drop-down search
        this.searchTrecipe(keyword, 0, limit)
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => next(err));
    }

    private performDestinationSearch(req: Request, res: Response, next: NextFunction) {
        const keyword = req.params.keyword;
        const limit = Number(req.query.limit);

        this.searchDestination(keyword, 0, limit)
            .then((results) => {
                res.status(200).json(results);
            })
            .catch((err) => next(err));
    }

    private searchTrecipe(keyword: string, offset: number, limit: number): Promise<Trecipe[]> {
        return trecipeModel
            .find({
                $and: [
                    {
                        $or: [
                            { name: { $regex: '.*(?i)' + keyword + '.*' } },
                            { description: { $regex: '.*' + keyword + '.*' } },
                        ],
                    },
                    {
                        isPrivate: false,
                    },
                ],
            })
            .skip(offset)
            .limit(limit)
            .then((trecipes: Trecipe[]) => {
                // always resolve.
                return Promise.resolve(trecipes);
            });
    }

    private searchUser(keyword: string, offset: number, limit: number): Promise<User[]> {
        return userModel
            .find({
                $or: [
                    { username: { $regex: '.*(?i)' + keyword + '.*' } },
                    { displayName: { $regex: '.*' + keyword + '.*' } },
                ],
            })
            .skip(offset)
            .limit(limit)
            .then((users: User[]) => {
                // always resolve.
                return Promise.resolve(users);
            });
    }

    private searchDestination(
        keyword: string,
        offset: number,
        limit: number
    ): Promise<Destination[]> {
        return destinationModel
            .find({ name: { $regex: '.*(?i)' + keyword + '.*' } })
            .skip(offset)
            .limit(limit)
            .then((destinations: Destination[]) => {
                // always resolve.
                return Promise.resolve(destinations);
            });
    }
}

export default SearchController;
