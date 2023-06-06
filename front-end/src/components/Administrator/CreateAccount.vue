<template>
  <el-card>
    <el-form
    ref="accountRef"
    :model="account"
    :rules="rules"
    label-width="200px"
    class="demo-ruleForm"
    size="default"
    status-icon
  >
    <el-form-item label="Account name" prop="username">
      <el-input v-model="account.username" />
    </el-form-item>
    <el-form-item label="Account password" prop="password">
      <el-input v-model="account.password" type="password" />
    </el-form-item>
    <el-form-item label="Account permission" prop="permission">
      <el-select v-model="account.permission" placeholder="Permission">
        <el-option label="Patron" value="Patron" />
        <el-option label="Staff" value="Staff" />
<!--         <el-option label="Administrator" value="Administrator" />
        <el-option label="Superuser" value="Superuser" /> -->
      </el-select>
    </el-form-item>
    <el-form-item label="Account email" prop="email">
      <el-input v-model="account.email" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(accountRef)">
        Create
      </el-button>
      <el-button @click="resetForm(accountRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus'
import { createAccount } from '@/api/modules/Administrators';
import {success, error} from "@/api"
import { useStore } from "vuex"
const store = useStore();

const accountRef = ref<FormInstance>();
const account = reactive({
  activeUser: store.state.username,
  username: "",
  password: "",
  permission: "",
  email: ""
})

const rules = reactive<FormRules>({
  username: [
    { required: true, trigger: 'change'},
  ],
  password: [
    { required: true, trigger: 'change' },
  ],
  permission: [
    { required: true,  trigger: 'change'},
  ],
  email: [
    { type: 'email', required: true, trigger: 'change', message: "邮箱格式错误"},
  ]

})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { data } = await createAccount(account);
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