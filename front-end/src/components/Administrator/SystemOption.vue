<template>
  <el-card>
    <el-form
    ref="optionRef"
    :model="option"
    :rules="rules"
    label-width="200px"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
    <el-form-item label="Fee per day" prop="feeAmt">
      <el-input v-model="option.feeAmt" />
    </el-form-item>
    <el-form-item label="Borrow limit" prop="borrowLimit">
      <el-input v-model="option.borrowLimit" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(optionRef)">
        Update
      </el-button>
      <el-button @click="resetForm(optionRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { setSystemOption } from '@/api/modules/Administrators';
import {success, error} from "@/api"
import { useStore } from "vuex"
const store = useStore();

const optionRef = ref<FormInstance>();
const option = reactive({
  activeUser: store.state.username,
  feeAmt: "",
  borrowLimit: ""
})

const rules = reactive<FormRules>({
  feeAmt: [
    {  required: true, trigger: 'change'},
  ],
  borrowLimit: [
    { required: true, trigger: 'change' },
  ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data } = await setSystemOption(option);
      if(data.success) {
        success()
        resetForm(formEl);
      } else {
        error("The username has exsited");
      }
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>