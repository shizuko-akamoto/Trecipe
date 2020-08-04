import trecipeModel from './trecipe.model';
import Trecipe from '../../../../shared/models/trecipe';
import logger from '../../common/logger';
import { TrecipeNotFound } from './trecipe.error';
import { InternalServerError } from 'express-openapi-validator/dist';
import CreateNewTrecipeDTO from '../../../../shared/models/createNewTrecipeDTO';
import { uuid } from 'uuidv4';
import DestinationService from '../destinations/destination.service';
import Destination from '../../../../shared/models/destination';
import { User } from '../../../../shared/models/user';
import { DestinationNotFound } from '../destinations/destination.error';

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

    public getTrecipeById(uuid: string, user?: User): Promise<Trecipe> {
        const filter = user
            ? { uuid: uuid, owner: user.username }
            : { uuid: uuid, isPrivate: false }; 
        return trecipeModel
            .findOne(filter)
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
            .findOne({ uuid: srcTrecipeId })
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
                    const isOwner = trecipeToCopy.owner === user.username;
                    if (isOwner || !trecipeToCopy.isPrivate) {
                        const copy: Trecipe = {
                            uuid: uuid(),
                            name: trecipeToCopy.name,
                            description: trecipeToCopy.description,
                            isPrivate: trecipeToCopy.isPrivate,
                            owner: user.username,
                            collaborators: [],
                            image: trecipeToCopy.image,
                            destinations: trecipeToCopy.destinations.map((dest) => {
                                return {
                                    destUUID: dest.destUUID,
                                    completed: isOwner
                                        ? dest.completed
                                        : false,
                                };
                            }),
                            createdAt: '',
                            updatedAt: '',
                        };
                        return new trecipeModel(copy).save();
                    } else {
                        Promise.reject(
                            new InternalServerError({
                                message: `Failed to duplicate trecipe`,
                            })
                        )
                    }
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

    public getAssociatedTrecipes(placeId: string, limit: number, owner?: User) {
        return DestinationService.getDestinationByPlaceId(placeId)
            .then((destination: Destination) => {
                // if owner is defined, return associated trecipes for that owner, otherwise, return all public associated trecipes
                const filter = owner
                    ? { 'destinations.destUUID': destination.uuid, owner: owner.username }
                    : { 'destinations.destUUID': destination.uuid, isPrivate: false };
                return trecipeModel.find(filter).limit(limit).exec();
            })
            .catch((err) => {
                if (err instanceof DestinationNotFound) {
                    return Promise.resolve([] as Array<Trecipe>);
                } else {
                    throw err;
                }
            })
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to get associated trecipes: ${err.toString()}`,
                    })
                )
            )
            .then((associated: Array<Trecipe>) => {
                logger.info(`got associated trecipes (count: ${associated.length})`);
                return Promise.resolve(associated);
            });
    }
}

export default new TrecipeService();
