<template>
  <el-popconfirm title="Are you sure to back up database?" @confirm="handelBackUpDB">
    <template #reference>
      <el-button>Back Up DB</el-button>
    </template>
  </el-popconfirm>
  <el-popconfirm title="Are you sure to restore recently database?" @confirm="handelRestoreDB">
    <template #reference>
      <el-button>Restore DB</el-button>
    </template>
  </el-popconfirm>
  <el-table :data="log.msg" stripe style="width: 100%">
    <el-table-column prop="id" label="Id" width="80" />
    <el-table-column prop="permission" label="Permission" width="100" />
    <el-table-column prop="user" label="User" />
    <el-table-column prop="event" label="event" />
    <el-table-column prop="user" label="User" />
    <el-table-column prop="content" label="Content" />
    <el-table-column prop="time" label="Time" />
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { getSystemLog, backUpDB, restoreDB }  from "@/api/modules/Superuser"
import { success, error } from '@/api';


const log = reactive({
  msg: []
  
})

const handelBackUpDB = async () => {
  let { data } = await backUpDB();
  if(data.success) {
    success("Succeed to back up DB")
  } else {
    error("Fail to back up DB")
  }
  
}

const handelRestoreDB = async () => {
  let { data } = await restoreDB();
  if(data.success) {
    success("Succeed to restore DB")
  } else {
    error("Fail to restore DB")
  }
}

onMounted(async () => {
  console.log('qwq')
  const { data }= await getSystemLog();
  console.log(data)
  log.msg = data.result;
})

</script>