import { apiAxios } from "./core";

export interface IFileUploadRequest {
    id: string;
    file: File;
}

export function uploadFile(data: IFileUploadRequest) {
    const formData = new FormData();

    for(const name in data) {
        //@ts-ignore
       formData.append(name, data[name]);
    }

    return apiAxios.post('file', formData, {
        headers:{
            "Content-Type": "multipart/form-data" 
        }
    })
}  