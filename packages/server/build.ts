import s from 'shelljs';
import config from './tsconfig.json';
const outDir = config.compilerOptions.outDir;

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.mkdir('-p', `${outDir}/server/server/common/passport`);
s.cp('server/common/api.yml', `${outDir}/server/server/common/api.yml`);
s.cp('server/common/passport/id_rsa_pub.pem', `${outDir}/server/server/common/passport/id_rsa_pub.pem`);
