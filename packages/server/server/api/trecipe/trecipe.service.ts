import trecipeModel from './trecipe.model';
import Trecipe from './trecipe.interface';
import logger from '../../common/logger';
import { TrecipeNotFound } from './trecipe.error';

export class TrecipeService {
    public getAll(): Promise<Array<Trecipe>> {
        return trecipeModel.find().then((trecipes: Array<Trecipe>) => {
            logger.info('fetch all trecipes');
            return Promise.resolve(trecipes);
        });
    }

    public createTrecipe(trecipeData: Trecipe): Promise<Trecipe> {
        const newTrecipe = new trecipeModel(trecipeData);
        return newTrecipe.save().then((created: Trecipe) => {
            logger.info(`created trecipe with name: ${created.name}, uuid: ${created.uuid}`);
            return Promise.resolve(created);
        });
    }

    public getTrecipeById(uuid: string): Promise<Trecipe> {
        return trecipeModel.findOne({ uuid: uuid }).then((trecipe: Trecipe) => {
            if (trecipe) {
                logger.info(`got trecipe with uuid ${uuid}`);
                return Promise.resolve(trecipe);
            } else {
                logger.warn(`failed to get trecipe with uuid ${uuid}`);
                return Promise.reject(new TrecipeNotFound(uuid));
            }
        });
    }

    public deleteTrecipeById(uuid: string): Promise<number> {
        return trecipeModel.deleteOne({ uuid: uuid }).then((result) => {
            if (result.deletedCount > 0) {
                logger.info(`deleted ${result.deletedCount} trecipes with uuid ${uuid}`);
                return Promise.resolve(result.deletedCount);
            } else {
                logger.warn(`failed to delete trecipe with uuid ${uuid}`);
                return Promise.reject(new TrecipeNotFound(uuid));
            }
        });
    }

    public updateTrecipeById(uuid: string, trecipeData: Trecipe): Promise<Trecipe> {
        return trecipeModel
            .findOneAndUpdate({ uuid: uuid }, trecipeData, { new: true })
            .then((updated) => {
                if (updated) {
                    logger.info(`updated trecipe with uuid ${uuid} to ${trecipeData}`);
                    return Promise.resolve(updated);
                } else {
                    logger.warn(`failed to update trecipe with uuid ${uuid}`);
                    return Promise.reject(new TrecipeNotFound(uuid));
                }
            });
    }
}

export default new TrecipeService();
