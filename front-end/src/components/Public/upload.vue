<template>
  <el-upload
    ref="uploadRef"
    v-model:file-list="fileList"
    class="upload-demo"
    action
    multiple
    list-type="picture"
    :on-success="handleSuccess"
    :http-request="uploadFile"
    :limit="1"
    :on-exceed="handleExceed"
  >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>
  </el-upload>
</template>
<script lang="ts" setup>
import { onMounted, ref, defineExpose } from 'vue'
import { ElMessage, ElMessageBox, UploadInstance } from 'element-plus'
import { useStore } from 'vuex';
import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'
import axios from 'axios';
import qs from 'qs'
import formData from 'form-data';

const emits = defineEmits(
  ["getImgURL"]
);

const store = useStore();
const headers = {
  token: ""
};
const userMsg = qs.stringify({
  phoneNum: "18263474525",
  pwd: "littlechai666",
});

onMounted(async () => {
  if(store.state.token == "") {
    const  {data} = await axios({
      url: 'https://imgbed.link/imgbed/user/login',
      method: 'post',
      data: userMsg
    })
    console.log(data);
    store.commit('setToken', data.token);
    headers.token = data.token;
  }
  else {
    headers.token = store.state.token;
  }
})

const uploadRef = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([

])

const uploadFile = async(options: UploadRequestOptions) => {
  const file = new formData();
  file.append('file',options.file);
  const { data } = await axios({
    url: "https://imgbed.link/imgbed/file/upload",
    method: 'post',
    headers: headers,
    data: file
  })
  return data.rows[0].url;
}

const handleSuccess: UploadProps['onSuccess'] = (response) => {
  emits('getImgURL', response)
}
 

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 1, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const clearFiles = () => {
  uploadRef.value!.clearFiles();
}

defineExpose({
  clearFiles
})
</script>
