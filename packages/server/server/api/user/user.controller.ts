import Controller from '../../common/controller';
import { NextFunction, Request, Response, Router } from 'express';
import UserService from './user.service';
import { User, CreateUserDTO, LoginDTO, UserResponse } from '../../../../shared/models/user';
import Bcrypt from 'bcryptjs';
import { passportAuth, signJwt } from '../../common/passport/passportUtils';
import { Unauthorized } from 'express-openapi-validator';

class UserController implements Controller {
    public readonly path = '/users';
    public readonly router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, this.signup.bind(this));
        this.router.post(`${this.path}/login`, this.login.bind(this));
        this.router.post(`${this.path}/logout`, passportAuth, this.logout.bind(this));
        this.router.put(`${this.path}`, passportAuth, this.updateUser.bind(this));
        this.router.get(`${this.path}`, passportAuth, this.getUser.bind(this));
    }

    private signup(req: Request, res: Response, next: NextFunction) {
        const createNewDTO: CreateUserDTO = req.body;
        const newUser: User = {
            ...createNewDTO,
            trecipes: [],
            profilePic: '',
        };

        Bcrypt.hash(newUser.password, 12, function (err, hash) {
            if (err) {
                return next(err);
            }
            newUser.password = hash;
            UserService.createUser(newUser)
                .then((createdUser: User) => {
                    const responseJson: UserResponse = {
                        isAuthenticated: false,
                        user: {
                            username: createdUser.username,
                            displayName: createdUser.displayName,
                            trecipes: createdUser.trecipes,
                            profilePic: createdUser.profilePic,
                        },
                    };
                    res.status(201).json(responseJson);
                })
                .catch((err) => next(err));
        });
    }

    // Get user > Compare password > Set token in cookie
    private login(req: Request, res: Response, next: NextFunction) {
        const userDTO: LoginDTO = req.body;
        let retreivedUser: User = null;

        UserService.getUserByEmail(userDTO.email)
            .then((user: User) => {
                retreivedUser = user;
                return Bcrypt.compare(userDTO.password, user.password);
            })
            .then((passwordMatch: boolean) => {
                if (passwordMatch) {
                    return signJwt(retreivedUser);
                } else {
                    return Promise.reject();
                }
            })
            .then((token) => {
                const responseJson: UserResponse = {
                    isAuthenticated: true,
                    user: {
                        username: retreivedUser.username,
                        displayName: retreivedUser.displayName,
                        trecipes: retreivedUser.trecipes,
                        profilePic: retreivedUser.profilePic,
                    },
                };

                res.status(200)
                    .cookie('access_token', token, {
                        httpOnly: true,
                        sameSite: 'strict',
                        // TODO: enable this when we enabled https
                        //secure: true,
                    })
                    .json(responseJson);
            })
            .catch(() =>
                next(
                    new Unauthorized({
                        path: this.path,
                        message: `Email or password is incorrect`,
                    })
                )
            );
    }

    private logout(req: Request, res: Response) {
        const responseJson: UserResponse = {
            isAuthenticated: false,
            user: {
                username: '',
                displayName: '',
                trecipes: [],
                profilePic: '',
            },
        };
        res.clearCookie('access_token', {
            httpOnly: true,
            sameSite: 'strict',
            // TODO: enable this when we enabled https
            //secure: true,
        });
        res.status(200).json(responseJson);
    }

    private getUser(req: Request, res: Response) {
        const user = req.user as User;
        const responseJson: UserResponse = {
            isAuthenticated: true,
            user: {
                username: user.username,
                displayName: user.displayName,
                trecipes: user.trecipes,
                profilePic: user.profilePic,
            },
        };
        res.status(200).json(responseJson);
    }

    private updateUser(req: Request, res: Response, next: NextFunction) {
        const requestData: Partial<User> = req.body;
        const user = req.user as User;
        const updateData: Partial<User> = {
            displayName: requestData.displayName ? requestData.displayName : user.displayName,
            profilePic: requestData.profilePic ? requestData.profilePic : user.profilePic,
            trecipes: requestData.trecipes ? requestData.trecipes : user.trecipes,
        };
        UserService.updateUserByUsername(user.username, updateData)
            .then((updated: User) => {
                const updatedUser: UserResponse = {
                    isAuthenticated: true,
                    user: {
                        username: updated.username,
                        displayName: updated.displayName,
                        trecipes: updated.trecipes,
                        profilePic: updated.profilePic,
                    },
                };
                res.status(200).json(updatedUser);
            })
            .catch((err) => next(err));
    }
}

export default UserController;
