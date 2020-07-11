import destinationModel from './destination.model';
import Destination from './destination.interface';
import logger from '../../common/logger';
import { DestinationNotFound } from './destination.error';
import trecipeModel from '../trecipe/trecipe.model';
import Trecipe, { DestWithStatus } from '../trecipe/trecipe.interface';

class DestinationService {
    public createDestination(destData: Destination) {
        return destinationModel.findOne({ placeId: destData.placeId }).then((res) => {
            if (res) {
                logger.info(`destination with placeId: ${res.placeId} already exists`);
                return Promise.resolve(res);
            } else {
                const newDestination = new destinationModel(destData);
                return newDestination.save().then((created: Destination) => {
                    logger.info(
                        `created destination with name: ${created.name}, uuid: ${created.uuid}`
                    );
                    return Promise.resolve(created);
                });
            }
        });
    }

    public getDestinationById(uuid: string): Promise<Destination> {
        return destinationModel.findOne({ uuid: uuid }).then((destination: Destination) => {
            if (destination) {
                logger.info(`got destination with uuid ${uuid}`);
                return Promise.resolve(destination);
            } else {
                logger.warn(`failed to get destination with uuid ${uuid}`);
                return Promise.reject(new DestinationNotFound(uuid));
            }
        });
    }

    public getDestinationsByTrecipeId(trecipeUuid: string): Promise<Array<DestWithStatus>> {
        const populateField = 'destinations.destination';
        return trecipeModel
            .findOne({ uuid: trecipeUuid })
            .populate(populateField)
            .then((populatedTrecipe: Trecipe) => {
                logger.info(`populated destinations for trecipe with uuid: ${trecipeUuid}`);
                return Promise.resolve(populatedTrecipe.destinations);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    public updateDestinationById(uuid: string, destData: Destination): Promise<Destination> {
        return destinationModel
            .findOneAndUpdate({ uuid: uuid }, destData, { new: true })
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
