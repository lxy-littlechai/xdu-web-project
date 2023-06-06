<template>
  <div class="book-search-page">
    <div class="container">
      <div v-for="book in results.bookLists" :key="book.ISBN" >
        <book-card 
          :img="book.img"
          :name="book.name"
          :author="book.author"
          :location="book.location"
          :ISBN="book.ISBN"
          :startTime="book.startTime"
          :status="book.status"
          :number="book.resNumber"
          :freeKeepDays="book.freeKeepDays"
        ></book-card>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { getHistoryBookLists } from '@/api/modules/Patron';
import { useStore } from 'vuex'
import { success, error } from '@/api';
import bookCard from "@/components/Public/bookCard.vue";

const store = useStore();

const searchInput = reactive({
  activeUser: store.state.username,
  content: '',
  label: '',
})

const results: any = reactive({
  bookLists: Array,

})

const search = async() => {
  //const res = await getBookLists();
  //results.bookLists = res.data;
}

onMounted(async () => {
  const username = store.state.username;
  const { data } = await getHistoryBookLists({username});
  console.log(data)
  results.bookLists = data.result;
  
})

const addToLists = (book: any) => {
  console.log('number', book)
  if(Number(book.number) <= 0) {
    error('Lack of books')
    return ;
  }
  console.log(book.ISBN, store.state.shopLists)
  const flag = store.state.shopLists.some((item: any) => {
    return item.ISBN == book.ISBN
  });
  console.log(flag)
  if(flag == false) {
    store.commit('addToLists', book)
    success('success');
  }else {
    error('You have added the same book')
  }
}


</script>

<style lang="scss" scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.book-search-page {
  position: relative;
  width: 100%;
  height: auto;


  .cover-img {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(https://s.cn.bing.net/th?id=OHR.QingMing2023_ZH-CN6951199028_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50);

    background-image: url(https://s.cn.bing.net/th?id=OHR.QingMing2023_ZH-CN6951199028_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&qlt=50);
    background-size: cover;
    background-repeat: no-repeat;
  }

  .Book-search-input {
    width: 40%;
    height: auto;
    padding: 10rem 0;
    margin: 0rem auto;
  }

}

.container {
  display: flex;
  flex-wrap: wrap;
  &>div {
    margin: 0 20px;
  }
}
</style>
