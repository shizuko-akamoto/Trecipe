import { CreateUserDTO, UserResponse, LoginDTO, User } from '../../../shared/models/user';
import { AxiosResponse, AxiosError } from 'axios';
import API from '../api';

class UserService {
    private apiEndpoint = 'users';

    /**
     * Sends request to server to create a new user
     * @param userData: partial user model, typically has {email}, {passport}, {username}, {displayName} defined
     * @returns a promise of created user model if successful, otherwise a promise rejection
     */
    public signup(userData: CreateUserDTO): Promise<UserResponse> {
        return API.post<UserResponse>(`${this.apiEndpoint}/signup`, userData)
            .then((res: AxiosResponse<UserResponse>) => {
                return Promise.resolve(res.data);
            })
            .catch((err: AxiosError) => {
                return Promise.reject(err);
            });
    }

    /**
     * Sends request to server to login
     * @param userData: partial user model, typically has {email}, {passport} defined
     * @returns a promise of logged in user if successful, otherwise a promise rejection
     */
    public login(userData: LoginDTO): Promise<UserResponse> {
        return API.post<UserResponse>(`${this.apiEndpoint}/login`, userData)
            .then((res: AxiosResponse<UserResponse>) => {
                return Promise.resolve(res.data);
            })
            .catch((err: AxiosError) => {
                return Promise.reject(err);
            });
    }

    /**
     * Sends request to server to logout
     * @returns a promise resolve if successful, otherwise a promise rejection
     */
    public logout(): Promise<UserResponse> {
        return API.post<UserResponse>(`${this.apiEndpoint}/logout`)
            .then((res: AxiosResponse<UserResponse>) => {
                return Promise.resolve(res.data);
            })
            .catch((err: AxiosError) => {
                return Promise.reject(err);
            });
    }

    /**
     * Sends request to server to get the current authenticated user
     * @returns a promise of current authenticated user if successful, otherwise a promise rejection
     */
    public getUser(): Promise<UserResponse> {
        return API.get<UserResponse>(this.apiEndpoint)
            .then((res: AxiosResponse<UserResponse>) => {
                return Promise.resolve(res.data);
            })
            .catch((err: AxiosError) => {
                return Promise.reject(err);
            });
    }

    /**
     * Sends request to server for updating a user with new data
     * @param updatedUser: partial user model containing some updated data
     * @returns a promise of updated user model if successful, otherwise a promise rejection
     */
    public updateUser(updatedUser: Partial<User>): Promise<UserResponse> {
        return API.put<UserResponse>(this.apiEndpoint, updatedUser).then(
            (res: AxiosResponse<UserResponse>) => {
                return Promise.resolve(res.data);
            }
        );
    }
}

export default new UserService();
