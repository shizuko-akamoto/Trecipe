export interface User {
    username: string;
    displayName: string;
    email: string;
    password: string;
    profilePic: string;
    trecipes: Array<string>;
}

export interface CreateUserDTO {
    username: string;
    displayName: string;
    email: string;
    password: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface UserResponse {
    isAuthenticated: boolean,
    user: {
        username: string,
        displayName: string,
        trecipes: Array<string>,
        profilePic: string,
    }
}

