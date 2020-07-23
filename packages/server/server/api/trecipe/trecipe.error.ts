import { NotFound } from 'express-openapi-validator/dist';

export class TrecipeNotFound extends NotFound {
    constructor(uuid: string) {
        super({ path: uuid, message: `Trecipe with uuid ${uuid} not found` });
    }
}
