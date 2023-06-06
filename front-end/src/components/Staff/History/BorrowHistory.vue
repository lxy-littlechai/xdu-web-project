<template>
  <el-table :data="log.msg" stripe style="width: 100%">
    <el-table-column prop="user" label="User" />
    <el-table-column prop="event" label="event" />
    <el-table-column prop="content" label="ISBN" />
    <el-table-column prop="time" label="Time" />
  </el-table>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { getSystemLog }  from "@/api/modules/Superuser"
import { success, error } from '@/api';


const log = reactive({
  msg: []
  
})


onMounted(async () => {
  console.log('qwq')
  const { data }= await getSystemLog({});
  console.log(data)
  log.msg = data.result.filter((log: any) => {
    return log.event == "BorrowBook"
  });
})

</script>