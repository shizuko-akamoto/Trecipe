export default interface User {
    username: string;
    displayName: string;
    email: string;
    password: string;
    profilePic: string;
    trecipes: Array<string>;
}
