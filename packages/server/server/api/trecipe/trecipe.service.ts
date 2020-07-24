import trecipeModel from './trecipe.model';
import Trecipe from '../../../../shared/models/trecipe';
import logger from '../../common/logger';
import { TrecipeNotFound } from './trecipe.error';
import { InternalServerError } from 'express-openapi-validator/dist';
import CreateNewTrecipeDTO from '../../../../shared/models/createNewTrecipeDTO';
import { uuid } from 'uuidv4';
import { User } from '../../../../shared/models/user';

class TrecipeService {
    public getAll(user: User): Promise<Array<Trecipe>> {
        return trecipeModel
            .find({ owner: user.username })
            .exec()
            .then((trecipes: Array<Trecipe>) => {
                logger.info('fetch all trecipes');
                return Promise.resolve(trecipes);
            })
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to fetch all trecipes: ${err.toString()}`,
                    })
                )
            );
    }

    public createTrecipe(trecipeData: CreateNewTrecipeDTO): Promise<Trecipe> {
        const newTrecipe = new trecipeModel(trecipeData);
        return newTrecipe
            .save()
            .then((created: Trecipe) => {
                logger.info(`created trecipe with name: ${created.name}, uuid: ${created.uuid}`);
                return Promise.resolve(created);
            })
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to create trecipe: ${err.toString()}`,
                    })
                )
            );
    }

    public getTrecipeById(uuid: string, user: User): Promise<Trecipe> {
        return trecipeModel
            .findOne({ uuid: uuid, owner: user.username })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to get trecipe: ${err.toString()}`,
                    })
                )
            )
            .then((trecipe: Trecipe) => {
                if (trecipe) {
                    logger.info(`got trecipe with uuid ${uuid}`);
                    return Promise.resolve(trecipe);
                } else {
                    logger.warn(`failed to get trecipe with uuid ${uuid}`);
                    return Promise.reject(new TrecipeNotFound(uuid));
                }
            });
    }

    public deleteTrecipeById(uuid: string, user: User): Promise<number> {
        return trecipeModel
            .deleteOne({ uuid: uuid, owner: user.username })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to delete trecipe: ${err.toString()}`,
                    })
                )
            )
            .then((result) => {
                if (result.deletedCount > 0) {
                    logger.info(`deleted ${result.deletedCount} trecipes with uuid ${uuid}`);
                    return Promise.resolve(result.deletedCount);
                } else {
                    logger.warn(`failed to delete trecipe with uuid ${uuid}`);
                    return Promise.reject(new TrecipeNotFound(uuid));
                }
            });
    }

    public updateTrecipeById(uuid: string, trecipeData: Trecipe, user: User): Promise<Trecipe> {
        return trecipeModel
            .findOneAndUpdate({ uuid: uuid, owner: user.username }, trecipeData, { new: true })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to update trecipe: ${err.toString()}`,
                    })
                )
            )
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

    public duplicateTrecipe(srcTrecipeId: string, user: User): Promise<Trecipe | void> {
        return trecipeModel
            .findOne({ uuid: srcTrecipeId, owner: user.username })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to duplicate trecipe: ${err.toString()}`,
                    })
                )
            )
            .then((trecipeToCopy: Trecipe) => {
                if (trecipeToCopy) {
                    const copy: Trecipe = {
                        uuid: uuid(),
                        name: trecipeToCopy.name,
                        description: trecipeToCopy.description,
                        isPrivate: trecipeToCopy.isPrivate,
                        owner: trecipeToCopy.owner,
                        collaborators: trecipeToCopy.collaborators,
                        image: trecipeToCopy.image,
                        destinations: trecipeToCopy.destinations.map((dest) => {
                            return {
                                destUUID: dest.destUUID,
                                completed: dest.completed,
                            };
                        }),
                        createdAt: '',
                        updatedAt: '',
                    };
                    return new trecipeModel(copy).save();
                } else {
                    return Promise.reject(new TrecipeNotFound(srcTrecipeId));
                }
            })
            .then((copied: Trecipe) => {
                logger.info(`duplicated trecipe with name: ${copied.name}, uuid: ${copied.uuid}`);
                return Promise.resolve(copied);
            })
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to duplicate trecipe: ${err.toString()}`,
                    })
                )
            );
    }
}

export default new TrecipeService();
