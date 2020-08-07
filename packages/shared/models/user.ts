/**
 * User
 */
export interface User {
    username: string;
    displayName: string;
    email: string;
    password: string;
    profilePic: string;
    trecipes: Array<string>;
}

/**
 * DTO for creating a new user
 */
export interface CreateUserDTO {
    username: string;
    displayName: string;
    email: string;
    password: string;
}

/**
 * DTO for login requests
 */
export interface LoginDTO {
    email: string;
    password: string;
}

/**
 * DTO for login response
 * isAuthenticated: true if authentication was successful, false otherwise
 * user: the authenticated user, or empty if authentication failed
 */
export interface UserResponse {
    isAuthenticated: boolean,
    user: {
        username: string,
        displayName: string,
        trecipes: Array<string>,
        profilePic: string,
    }
}

