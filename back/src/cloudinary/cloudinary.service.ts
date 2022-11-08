import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream'

@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
      ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    
        return new Promise((resolve, reject) => {
          const upload = v2.uploader.upload_stream((error, result) => {
            if (error) return reject(error);
            if(result) resolve(result);
          });
          
          const stream = Readable.from(file.buffer);

          stream.pipe(upload);
        });
      }
}
