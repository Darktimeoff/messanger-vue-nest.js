import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CloudinaryService } from '~/cloudinary/cloudinary.service';
import { FileDocument } from './entities/file.entity';
import { UploadApiErrorResponse} from 'cloudinary';
import { CreateDto } from './dto/create.dto';
@Injectable()
export class FileService {
    constructor(
        @InjectModel('File') private readonly fileModel: Model<FileDocument>,
        private readonly cloudinaryService: CloudinaryService
    ) {

    }

    async uploadFile(userId:string | Types.ObjectId, file: Express.Multer.File, dto?: CreateDto) {
        try {
            const apiResp = await this.cloudinaryService.uploadImage(file);
            return this.fileModel.create({
                _id: dto?.id ? new Types.ObjectId(dto.id) : new Types.ObjectId(),
                public_id: apiResp.public_id,
                filename: apiResp.original_filename,
                format: apiResp.format,
                width: apiResp?.width,
                height: apiResp?.height,
                size: apiResp.bytes,
                orig_url: apiResp.url,
                resource_type: apiResp.resource_type,
                user: userId
            })
        } catch(e) {
            if(e instanceof Error  && 'http_code' in e) {
                const error = e as UploadApiErrorResponse;
                throw new HttpException(error.message, error.http_code);
            }
        }
    }
}