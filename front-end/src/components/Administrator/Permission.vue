<template>
  <el-card>
    <el-input v-model="formData.searchName" type="text" clearable>
      <template #append>
        <el-button :icon="Search" @click="getUser" />
      </template>
    </el-input>
    <el-table :data="tableData.tableData" style="width: 100%">
      <el-table-column label="Name" width="180">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Permission" width="180" :filters="[
        { text: 'Patron', value: 'Patron' },
        { text: 'Staff', value: 'Staff' },
      ]" :filter-method="filterTag" filter-placement="bottom-end">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto" disabled>
            <template #reference>
              <el-tag>{{ scope.row.permission }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-select :disabled="disabledAccount.includes(scope.row.permission)" v-model="scope.row.permission" class="m-2" placeholder="Select" size="large"
            @change="changePermission1(scope.row)">
            <el-option v-for="item in options" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button type="primary" :disabled="disabledAccount.includes(scope.row.permission)"  @click="handleDelete(scope.row)">delete</el-button>
        </template>
       </el-table-column>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { Timer } from '@element-plus/icons-vue'
import { changePermission, getAccount, deleteAccount } from '@/api/modules/Administrators';
import { success, error } from "@/api"
import { useStore } from 'vuex';
const store = useStore();

const disabledAccount = ["Superuser","Administrator"];
const getUser = async () => {
  const username = formData.searchName;
  const { data } = await getAccount({ username });
  console.log(data)
  if (data.result == false) {
    error("NetWork Error");
  }
  else {
    tableData.tableData = data.result;
  }
}
onMounted(() => {
  getUser();
})

const formData = reactive({
  searchName: ""
})

const options = ["Patron", "Staff"]
interface User {
  activeUser: string
  username: string
  permission: string
}

const handleEdit = (index: number, row: User) => {
  if (row.permission == 'Patron') row.permission = 'Staff';
  else row.permission = 'Patron';
  console.log(index, row)
}
const tableData = reactive({
  tableData: []
})

const changePermission1 = async (item: any) => {
  const account = {
    activeUser: store.state.username,
    username: item.username,
    permission: item.permission
  }
  const { data } = await changePermission(account);
  if (data.success) {
    success()
  } else {
    error("Network Error");
  }

}

const handleDelete = async(account: any) => {
  const { data } = await deleteAccount({username: account.username});
  if (data.success) {
    success()
    getUser()
  } else {
    error("Network Error");
  }
}


const filterTag = (value: string, row: User) => {
  return row.permission === value
}
</script>