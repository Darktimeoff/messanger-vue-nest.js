import { useFileDialog } from '@vueuse/core';
import { UploadFile } from 'ant-design-vue';
import {Ref, watch} from 'vue';
import { getBase64 } from '~/helpers';
import {ObjectId} from 'bson';
import { FileType } from 'ant-design-vue/lib/upload/interface';
import { IUploadFile } from '~/types';

export function useFileUpload(files: Ref<IUploadFile[]>) {
    const {files: fileList, open, reset} = useFileDialog()

    watch(fileList, async (v) => {
        if(!v?.length) {
            files.value = []
            return;
        };

        files.value = await convertImages(v);
    })
    
    async function convertImages(eventFiles: FileList) {
        const files = Array.from(eventFiles);

        return Promise.all(files.map(async function (file) {
            return await createPreviewImage(file);
        }));
    }

    async function createPreviewImage(file: File) {
        const ev = await getBase64(file)
        return imageObj(file, ev)
    }

    function  imageObj(file: File, preview: string): IUploadFile {
        const uid = new ObjectId().toString();
        Object.defineProperty(file, 'uid', {
            value: uid,
        })
        

        return {
            _id: uid,
            uid,
            originFileObj: file as FileType,
            url: preview,
            preview,
            fileName: `${file.name}`,
            name: `${file.name}`,
            status: 'uploading'
        };
    }

    

    return {
        open,
        reset,
    }
}