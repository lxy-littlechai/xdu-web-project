<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>System Statistics</span>
      </div>
    </template>

    <div class="flex">


        <div class="flex" style="width: 60%;">
          <div>Total Books: {{ data.totalNumber }}</div>
          <div>Borrowed Books: {{ data.borrowedBooklist.length }}</div>
          <div>Storage Books: {{ data.totalNumber - data.borrowedBooklist.length }}</div>
          <div>Total Patron: {{ data.userlist.length }}</div>
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
  data.userlist = res.data.result.filter((user: any) => {
    return user.permission = 'Patron'
  });

})



</script>

<style lang="scss">
.card-header {
  font-size: large;
}

</style>