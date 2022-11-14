import { IFile } from "~/types/file";
import { apiAxios } from "./core";

export interface IFileUploadRequest {
    id: string;
    file: File;
}

export function uploadFile(data: IFileUploadRequest, signal?: AbortSignal) {
    const formData = new FormData();

    for(const name in data) {
        //@ts-ignore
       formData.append(name, data[name]);
    }

    return apiAxios.post<IFile>('file', formData, {
        signal,
        headers:{
            "Content-Type": "multipart/form-data" 
        }
    })
}  