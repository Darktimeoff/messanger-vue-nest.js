import { useFileDialog } from '@vueuse/core';
import {ref, watch} from 'vue';

export function useFileUpload() {
    interface IFile {
        file: File,
        src: string | ArrayBuffer | null | undefined;
        name: string;
    }

    const {files: fileList, open, reset} = useFileDialog()
    
    const files = ref<IFile[]>();

    watch(fileList, async (v) => {
        if(!v?.length) {
            files.value = []
            return;
        };

        files.value = await convertImages(v);
        console.log('fileList,', files.value);
    })
    
    async function convertImages(eventFiles: FileList) {
        const files = Array.from(eventFiles);

        return Promise.all(files.map(async function (file) {
            return await createPreviewImage(file);
        }));
    }

    async function createPreviewImage(file: File) {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        const ev = await new Promise<ProgressEvent<FileReader>>((res) => {
            reader.onload = (ev) => {
                res(ev)
            };
        })

        return imageObj(file, ev)
    }

    function  imageObj(file: File, event: ProgressEvent<FileReader>): IFile {
        return {
            file,
            src: event.target?.result,
            name: `${file.name}${Date.now()}`,
        };
    }

    return {
        open,
        files,
        reset,
    }
}