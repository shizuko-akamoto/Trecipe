import API from '../api';
import { AxiosResponse } from "axios";

interface FileResponse {
  originalname: string;
  filename: string;
  uploadDate: string;
  contentType: string;
}

class UploadService {
  private apiEndpoint = 'upload';

  public uploadSingleFile(file: File): Promise<string> {
    let data = new FormData();
    data.append('file', file);
    return API.post<{file: FileResponse}>(this.apiEndpoint, data).then((res: AxiosResponse<{file: FileResponse}>) => {
      return Promise.resolve(res.data.file.filename);
    }).catch(err => {
      return Promise.reject(err);
    })
  }
}

export default new UploadService();