import destinationModel from './destination.model';
import Destination from '../../../../shared/models/destination';
import logger from '../../common/logger';
import { DestinationNotFound } from './destination.error';
import { InternalServerError } from 'express-openapi-validator/dist';
import trecipeModel from '../trecipes/trecipe.model';
import Trecipe, { DestWithStatus } from '../../../../shared/models/trecipe';
import { TrecipeNotFound } from '../trecipes/trecipe.error';
import { User } from '../../../../shared/models/user';

class DestinationService {
    public createDestination(destData: Destination) {
        return destinationModel
            .findOne({ placeId: destData.placeId })
            .exec()
            .then((res) => {
                if (res) {
                    logger.info(`destination with placeId: ${res.placeId} already exists`);
                    return this.updateDestinationById(res.uuid, destData);
                } else {
                    const newDestination = new destinationModel(destData);
                    return newDestination.save();
                }
            })
            .then((created: Destination) => {
                logger.info(
                    `created destination with name: ${created.name}, uuid: ${created.uuid}`
                );
                return Promise.resolve(created);
            })
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to create destination: ${err.toString()}`,
                    })
                )
            );
    }

    public getDestinationsByTrecipeId(trecipeUuid: string, owner?: User): Promise<Array<DestWithStatus>> {
        const populateField = 'destinations.destination';
        const filter = owner
            ? { uuid: trecipeUuid, owner: owner.username }
            : { uuid: trecipeUuid, isPrivate: false };
        return trecipeModel
            .findOne(filter)
            .populate(populateField)
            .exec()
            .catch((err) => {
                logger.info(`failed to get destinations for trecipe with uuid: ${trecipeUuid}`);
                return Promise.reject(
                    new InternalServerError({
                        message: `Failed to get destinations for trecipe: ${err.toString()}`,
                    })
                );
            })
            .then((populatedTrecipe: Trecipe) => {
                if (populatedTrecipe) {
                    logger.info(`populated destinations for trecipe with uuid: ${trecipeUuid}`);
                    return Promise.resolve(populatedTrecipe.destinations);
                } else {
                    logger.warn(`failed to get destinations for trecipe with uuid: ${trecipeUuid}`);
                    return Promise.reject(new TrecipeNotFound(trecipeUuid));
                }
            });
    }

    public getDestinationById(uuid: string): Promise<Destination> {
        return destinationModel
            .findOne({ uuid: uuid })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to get destination: ${err.toString()}`,
                    })
                )
            )
            .then((destination: Destination) => {
                if (destination) {
                    logger.info(`got destination with uuid ${uuid}`);
                    return Promise.resolve(destination);
                } else {
                    logger.warn(`failed to get destination with uuid ${uuid}`);
                    return Promise.reject(new DestinationNotFound(uuid));
                }
            });
    }

    public getDestinationByPlaceId(placeId: string): Promise<Destination> {
        return destinationModel
            .findOne({ placeId: placeId })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to get destination: ${err.toString()}`,
                    })
                )
            )
            .then((destination: Destination) => {
                if (destination) {
                    logger.info(`got destination with placeId ${placeId}`);
                    return Promise.resolve(destination);
                } else {
                    logger.warn(`failed to get destination with placeId ${placeId}`);
                    return Promise.reject(new DestinationNotFound(placeId));
                }
            });
    }

    public updateDestinationById(uuid: string, destData: Destination): Promise<Destination> {
        return destinationModel
            .findOneAndUpdate({ uuid: uuid }, destData, { new: true })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to update destination: ${err.toString()}`,
                    })
                )
            )
            .then((updated) => {
                if (updated) {
                    logger.info(`updated destination with uuid ${uuid}`);
                    return Promise.resolve(updated);
                } else {
                    logger.warn(`failed to update destination with uuid ${uuid}`);
                    return Promise.reject(new DestinationNotFound(uuid));
                }
            });
    }
}

export default new DestinationService();
