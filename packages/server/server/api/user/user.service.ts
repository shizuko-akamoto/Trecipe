import userModel from './user.model';
import { User } from '../../../../shared/models/user';
import logger from '../../common/logger';
import { UserNotFound, DuplicateUserError } from './user.error';
import { InternalServerError } from 'express-openapi-validator';

class UserService {
    public createUser(userData: User): Promise<User> {
        const newUser = new userModel(userData);
        return this.checkDuplicateUser(userData)
            .then((isDuplicate: string | null) => {
                if (isDuplicate) {
                    return Promise.reject(new DuplicateUserError(isDuplicate));
                } else {
                    return newUser.save();
                }
            })
            .then((created: User) => {
                logger.info(`Created user`);
                return Promise.resolve(created);
            });
    }

    public updateUserByUsername(username: string, userData: Partial<User>): Promise<User> {
        return userModel
            .findOneAndUpdate({ username: username }, userData, { new: true })
            .collation({ locale: 'en', strength: 2 })
            .exec()
            .catch((err) =>
                Promise.reject(
                    new InternalServerError({
                        message: `Failed to update user: ${err.toString()}`,
                    })
                )
            )
            .then((updated) => {
                if (updated) {
                    logger.info(`updated user with username ${username}`);
                    return Promise.resolve(updated);
                } else {
                    logger.warn(`failed to update user with username ${username}`);
                    return Promise.reject(new UserNotFound());
                }
            });
    }

    public checkDuplicateUser(userData: User): Promise<string | null> {
        const duplicateEmail = userModel
            .findOne({ email: userData.email })
            .collation({ locale: 'en', strength: 2 })
            .exec();
        const duplicateUsername = userModel
            .findOne({ username: userData.username })
            .collation({ locale: 'en', strength: 2 })
            .exec();

        return Promise.all([duplicateEmail, duplicateUsername])
            .then(([byEmail, byUsername]: [User, User]) => {
                if (byEmail) {
                    return Promise.resolve('Email');
                } else if (byUsername) {
                    return Promise.resolve('Username');
                } else {
                    return Promise.resolve(null);
                }
            })
            .catch((err) => {
                logger.warn(`Failed to find user`);
                return Promise.reject(
                    new InternalServerError({
                        message: `Failed to find user: ${err.toString()}`,
                    })
                );
            });
    }

    public getUserByEmail(email: string): Promise<User> {
        return userModel
            .findOne({ email: email })
            .collation({ locale: 'en', strength: 2 })
            .exec()
            .catch(() => {
                logger.warn(`Failed to get user using email`);
                return Promise.reject(
                    new InternalServerError({
                        message: `Failed to get user`,
                    })
                );
            })
            .then((user: User) => {
                if (user) {
                    logger.info(`Got user using email`);
                    return Promise.resolve(user);
                } else {
                    logger.warn(`Failed to get user using email`);
                    return Promise.reject(new UserNotFound());
                }
            });
    }

    public getUserByUsername(username: string): Promise<User> {
        return userModel
            .findOne({ username: username })
            .collation({ locale: 'en', strength: 2 })
            .exec()
            .catch(() => {
                logger.warn(`Failed to get user using username`);
                return Promise.reject(
                    new InternalServerError({
                        message: `Failed to get user`,
                    })
                );
            })
            .then((user: User) => {
                if (user) {
                    logger.info(`Got user using username`);
                    return Promise.resolve(user);
                } else {
                    logger.warn(`Failed to get user using username`);
                    return Promise.reject(new UserNotFound());
                }
            });
    }
}

export default new UserService();
