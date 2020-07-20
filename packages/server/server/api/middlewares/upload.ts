import * as path from 'path';
import GridFsStorage from 'multer-gridfs-storage';

const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;

const storage = new GridFsStorage({
    url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            GridFsStorage.generateBytes()
                .then((res: { filename: string }) => {
                    const filenameWithExt = res.filename + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filenameWithExt,
                        bucketName: 'uploads',
                    };
                    resolve(fileInfo);
                })
                .catch((err) => reject(err));
        });
    },
    cache: true,
});

export default storage;
