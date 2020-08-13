import { cleanEnv, port, str } from 'envalid';

/**
 * Throws an error if one of the defined variables is missing or it is of a wrong type
 */
export default function validateEnv(): void {
    cleanEnv(process.env, {
        MONGO_PASSWORD: str(),
        MONGO_PATH: str(),
        MONGO_USER: str(),
        PORT: port(),
        API_VERSION: str(),
    });
}
