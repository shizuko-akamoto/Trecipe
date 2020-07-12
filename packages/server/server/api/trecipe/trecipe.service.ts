import trecipeModel from './trecipe.model';
import Trecipe from './trecipe.interface';
import logger from '../../common/logger';
import { TrecipeNotFound } from './trecipe.error';
import { InternalServerError } from "express-openapi-validator/dist";

export class TrecipeService {
    public getAll(): Promise<Array<Trecipe>> {
        return trecipeModel.find().exec().then((trecipes: Array<Trecipe>) => {
            logger.info('fetch all trecipes');
            return Promise.resolve(trecipes);
        }).catch(err =>
            Promise.reject(new InternalServerError({
                message: `Failed to fetch all trecipes: ${err.toString()}`,
            }))
        );
    }

    public createTrecipe(trecipeData: Trecipe): Promise<Trecipe> {
        const newTrecipe = new trecipeModel(trecipeData);
        return newTrecipe.save().then((created: Trecipe) => {
            logger.info(`created trecipe with name: ${created.name}, uuid: ${created.uuid}`);
            return Promise.resolve(created);
        }).catch(err =>
          Promise.reject(new InternalServerError({
              message: `Failed to create trecipe: ${err.toString()}`,
          }))
        );
    }

    public getTrecipeById(uuid: string): Promise<Trecipe> {
        return trecipeModel.findOne({ uuid: uuid }).exec().then((trecipe: Trecipe) => {
            if (trecipe) {
                logger.info(`got trecipe with uuid ${uuid}`);
                return Promise.resolve(trecipe);
            } else {
                logger.warn(`failed to get trecipe with uuid ${uuid}`);
                return Promise.reject(new TrecipeNotFound(uuid));
            }
        }).catch(err =>
          Promise.reject(new InternalServerError({
              message: `Failed to get trecipe: ${err.toString()}`
          }))
        );
    }

    public deleteTrecipeById(uuid: string): Promise<number> {
        return trecipeModel.deleteOne({ uuid: uuid }).exec().then((result) => {
            if (result.deletedCount > 0) {
                logger.info(`deleted ${result.deletedCount} trecipes with uuid ${uuid}`);
                return Promise.resolve(result.deletedCount);
            } else {
                logger.warn(`failed to delete trecipe with uuid ${uuid}`);
                return Promise.reject(new TrecipeNotFound(uuid));
            }
        }).catch(err =>
          Promise.reject(new InternalServerError({
              message: `Failed to get trecipe: ${err.toString()}`
          }))
        );
    }

    public updateTrecipeById(uuid: string, trecipeData: Trecipe): Promise<Trecipe> {
        return trecipeModel
            .findOneAndUpdate({ uuid: uuid }, trecipeData, { new: true }).exec()
            .then((updated) => {
                if (updated) {
                    logger.info(`updated trecipe with uuid ${uuid} to ${trecipeData}`);
                    return Promise.resolve(updated);
                } else {
                    logger.warn(`failed to update trecipe with uuid ${uuid}`);
                    return Promise.reject(new TrecipeNotFound(uuid));
                }
            }).catch(err =>
            Promise.reject(new InternalServerError({
                message: `Failed to get trecipe: ${err.toString()}`
            }))
          );
    }
}

export default new TrecipeService();
