import Controller from '../../common/controller';
import { NextFunction, Request, Response, Router } from 'express';
import TrecipeService from './trecipe.service';
import Trecipe from './trecipe.interface';
import CreateNewTrecipeDTO from './trecipe.dto';
import { uuid } from 'uuidv4';
import { InternalServerError } from 'express-openapi-validator/dist/framework/types';

class TrecipeController implements Controller {
    public readonly path = '/trecipes';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, this.getAllTrecipes);
        this.router.post(this.path, this.createTrecipe);
        this.router.get(`${this.path}/:id`, this.getTrecipeById);
        this.router.delete(`${this.path}/:id`, this.deleteTrecipeById);
        this.router.put(`${this.path}/:id`, this.updateTrecipeById);
    }

    private getAllTrecipes(req: Request, res: Response, next: NextFunction) {
        TrecipeService.getAll().then((trecipes: Array<Trecipe>) => {
            res.json(trecipes);
        });
    }

    private createTrecipe(req: Request, res: Response, next: NextFunction) {
        const createNewDTO: CreateNewTrecipeDTO = req.body;
        const newTrecipe: Trecipe = {
            ...createNewDTO,
            uuid: uuid(),
            owner: '',
            collaborators: [],
            image: '',
            destinations: [],
        };
        TrecipeService.createTrecipe(newTrecipe)
            .then((createdTrecipe: Trecipe) => {
                res.status(201).json(createdTrecipe);
            })
            .catch((err) =>
                next(
                    new InternalServerError({
                        path: this.path,
                        message: `Failed to create trecipe: ${err.toString()}`,
                    })
                )
            );
    }

    private getTrecipeById(req: Request, res: Response, next: NextFunction) {
        const uuid: string = req.params.id;
        TrecipeService.getTrecipeById(uuid)
            .then((foundTrecipe: Trecipe) => {
                res.status(200).json(foundTrecipe);
            })
            .catch((err) => next(err));
    }

    private deleteTrecipeById(req: Request, res: Response, next: NextFunction) {
        const uuid: string = req.params.id;
        TrecipeService.deleteTrecipeById(uuid)
            .then((deletedCount) => {
                res.status(200).json({ deletedCount: deletedCount });
            })
            .catch((err) => next(err));
    }

    private updateTrecipeById(req: Request, res: Response, next: NextFunction) {
        const uuid: string = req.params.id;
        const updateData: Trecipe = req.body;
        TrecipeService.updateTrecipeById(uuid, updateData)
            .then((updated: Trecipe) => {
                res.status(200).json(updated);
            })
            .catch((err) => next(err));
    }
}

export default TrecipeController;
