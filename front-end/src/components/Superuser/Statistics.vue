<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>System Statistics</span>
      </div>
    </template>

    <div class="flex">

    
    <!-- 书数据 -->
    <div>
      <div class="flex">
        <div>Total Numbers: {{ data.totalNumber }}</div>
        <div>Borrowed Numbers: {{ data.borrowedBooklist.length }}</div>
        <div>Storage Numbers: {{ data.totalNumber - data.borrowedBooklist.length }}</div>
      </div>
      <pieChart1 :data="chartsData.bookPieData" title="book statistics"></pieChart1>
    </div>

    <!-- 用户数据 -->
    <div style="width: 50%;">
      <div class="flex">
        <div>Total Users: {{ data.userlist.length }}</div>
      
      </div>
      <pieChart2 :data="chartsData.userPieData" title="user statistics"></pieChart2>
    </div>
  </div>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getBookLists } from '@/api/modules/Patron';
import { getAllborrowedBook, getAllUser } from '@/api/modules/Superuser';
import { toNumber } from 'lodash';
import pieChart1 from "@/components/Public/Charts/pie.vue";
import pieChart2 from "@/components/Public/Charts/pie.vue";


const data = reactive({
  booklist: [],
  borrowedBooklist: [],
  userlist: [],
  totalNumber: 0,
  userNumber: {
    patron: 0,
    staff: 0,
    administrator: 0,
    superuser: 0
  }
})
const chartsData = reactive({
  bookPieData: [],
  userPieData: [],
})

onMounted(async () => {
  let res = await getBookLists({});
  data.booklist = res.data.result;
  data.booklist.forEach((book) => {
    data.totalNumber += toNumber((book as any).resNumber);
    console.log(data.totalNumber)
  })

  res = await getAllborrowedBook({})
  data.borrowedBooklist = res.data.result;

  res = await getAllUser({})
  data.userlist = res.data.result;
  data.userlist.forEach((user: any) => {
    const permission = user.permission;
    console.log(permission)
    switch (permission) {
      case 'Patron':
        data.userNumber.patron ++;
        break;
      case 'Staff':
        data.userNumber.staff ++;
        break;
      case 'Administrator':
        data.userNumber.administrator ++;
        break;
      case 'Superuser':
        data.userNumber.superuser ++;
        break;
      default:
        break;
    }
  });

  (chartsData.bookPieData as any) = [{
    'value': data.borrowedBooklist.length,
    'name': "Borrowed Numbers"
  }, {
    'value': data.totalNumber - data.borrowedBooklist.length,
    'name': "Storage Numbers"
  }];

  (chartsData.userPieData as any) = [{
    'value': data.userNumber.patron,
    'name': "patron"
  }, {
    'value': data.userNumber.staff,
    'name': "staff"
  },{
    'value': data.userNumber.administrator,
    'name': "administrator"
  }, {
    'value': data.userNumber.superuser,
    'name': "superuser"
  }];
})



</script>

<style lang="scss">
.card-header {
  font-size: large;
}

.flex {
  display: flex;
  justify-content: space-around;
}
</style>