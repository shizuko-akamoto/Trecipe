import { NotFound } from 'express-openapi-validator/dist';
import { HttpError } from 'express-openapi-validator/dist/framework/types';

export class UserNotFound extends NotFound {
    constructor() {
        super({ path: 'users', message: 'User not found' });
    }
}

export class DuplicateUserError extends HttpError {
    constructor(duplicate: string) {
        super({
            status: 409,
            path: 'users',
            name: 'User conflict',
            message: `${duplicate} already existed`,
        });
    }
}
