import destiantionModel from './destination.model';
import Destination from './destination.interface';
import logger from '../../common/logger';

import { DestinationNotFound } from './destination.error';


export class DestinationService {

    // for crud, why do we need cud? 
    public getDestinationById(uuid: string): Promise<Destination> {
        return destiantionModel.findOne({ uuid: uuid }).then((destination: Destination) => {
            if (destination) {
                logger.info(`got destinatoin with uuid ${uuid}`);
                return Promise.resolve(destination);
            } else {
                logger.warn(`failed to get destination with uuid ${uuid}`);
                return Promise.reject(new DestinationNotFound(uuid));
            }
        });
    }
}