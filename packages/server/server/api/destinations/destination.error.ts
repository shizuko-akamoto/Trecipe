import { NotFound } from 'express-openapi-validator/dist';

export class DestinationNotFound extends NotFound {
    constructor(uuid: string) {
        super({ path: uuid, message: 'Destination not found' });
    }
}
