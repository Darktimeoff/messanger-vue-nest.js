<template>
    <div class="clearfix">
      <a-upload
        v-model:file-list="fileList"
        list-type="picture-card"
        @preview="handlePreview"
      />
      <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </template>
<script lang="ts" setup>
import {ref } from 'vue';
import type { UploadProps } from 'ant-design-vue';
import { UploadFile } from 'ant-design-vue/es';
import {getBase64} from '~/helpers/js-api.helper';

interface IProps {
  fileList: UploadProps['fileList']
}

const props = defineProps<IProps>()

const previewVisible = ref(false);
const previewImage = ref();
const previewTitle = ref();
const fileList = useVModel(props, 'fileList');


const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

async function handlePreview(file: UploadFile) {
  if(!file) return;

  if (!file.url && !file.preview && file.originFileObj) {
    file.preview = await getBase64(file.originFileObj)
  }

  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url?.substring(file.url.lastIndexOf('/') + 1);
};
</script>
  <style>
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }
  
  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  </style>