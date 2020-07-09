import './common/env';
import Server from './common/server';
import routes from './routes';
import validateEnv from './common/validateEnv';

validateEnv();

const port = parseInt(process.env.PORT);
export default new Server().router(routes).listen(port);
