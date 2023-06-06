<template>
  <div class="book-search-page">
    <!-- <div class="cover-img"></div> -->
    <div class="Book-search-input">
      <el-input v-model="searchInput.content" size="large" placeholder="Please input" class="input-with-select">
        <template #prepend>
          <el-select v-model="searchInput.label" size="large" placeholder="Select" style="width: 115px">
            <el-option label="Author" value="author" />
            <el-option label="BookName" value="name" />
            <!-- <el-option label="Type" value="3" /> -->
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" @click="search"/>
        </template>
      </el-input>
    </div>

    <div class="container">
      <div v-for="book in results.bookLists" :key="book.ISBN" >
        <book-card 
          @clickBtn="addToLists" 
          btnName="add to lists"
          :img="book.img"
          :name="book.name"
          :author="book.author"
          :location="book.location"
          :number="book.resNumber"
          :ISBN="book.ISBN"
        ></book-card>
      </div>
    </div>
    

  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { reactive, } from 'vue';
import { getBookLists } from '@/api/modules/Patron';
import { useStore } from "vuex"
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
  const { data } = await getBookLists(searchInput);
  console.log(data);
  results.bookLists = [...data.result];
  console.log(results.bookLists)
}

const addToLists = (book: any) => {
  console.log(book, store.state.shopLists)
  const flag = store.state.shopLists.some((item: any) => {
    return item.ISBN == book.ISBN
  });
  console.log(flag)
  if(flag == false) {
    if(Number(book.number) <= 0) {
        error("No enough book");
        return;
    }
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
    background-size: cover;
    background-repeat: no-repeat;
  }

  .Book-search-input {
    width: 40%;
    height: auto;
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
