import shell from "shelljs";
import config from "./tsconfig.json";
const outDir = config.compilerOptions.outDir;

shell.rm('-rf', outDir);
shell.mkdir(outDir);
shell.cp('.env', `${outDir}/.env`);
shell.mkdir('-p', `${outDir}/common/swagger`);
shell.cp('src/common/api.yml', `${outDir}/common/api.yml`);
