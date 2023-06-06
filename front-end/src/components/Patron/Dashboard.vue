<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Hello {{ dashboard.username }} !</span>
      </div>
    </template>
    <div class="flex">
      <div>Books on loan: <strong>{{ dashboard.borrowedBooks.length }}</strong></div>
      <div>Books in History: <strong>{{ dashboard.historyBorrowedBooks.length }}</strong></div>
      <div>Fee: <strong>{{ dashboard.fee }}</strong></div>
    </div>
    
    
  </el-card>
  
</template>

<script lang="ts" setup>
import { reactive, onMounted } from "vue"
import { useStore } from "vuex"
import { getBookLists, getBorrowedBookLists, getHistoryBookLists } from "@/api/modules/Patron"


const store = useStore();
const dashboard = reactive({
  username: store.state.username,
  booklists: Array<unknown>(),
  borrowedBooks: Array<unknown>(),
  historyBorrowedBooks: Array<unknown>(),
  fee: 0,
})


onMounted(async () => {
  let  res  = await getBorrowedBookLists({username: dashboard.username})
  dashboard.borrowedBooks = res.data.result

  res  = await getBookLists({
    activeUser: dashboard.username,
    content: '',
    label: ''
  });
  dashboard.booklists = res.data.result
  console.log('lisy',res.data)

  res = await getHistoryBookLists({username: dashboard.username})
  console.log('his', res.data.result)
  dashboard.historyBorrowedBooks = res.data.result

  dashboard.borrowedBooks.map((book: any)=> {
    dashboard.fee += book.fee
    console.log('fee', book.fee)
  }) 
})
</script>

<style lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  &>div {
    margin: 0 20px;
  }
}
</style>