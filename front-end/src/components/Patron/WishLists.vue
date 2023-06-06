<template>
  <div class="book-search-page">
<!--     <div class="cover-img"></div> -->
    <div class="Book-search-input">
      <el-input readonly v-model="searchInput.content" size="large" placeholder="Click the button to borrow following books " class="input-with-select">
        
        <template #append>
          <el-button :icon="Check" @click="borrowLists"/>
        </template>
      </el-input>
    </div>

    <div class="container">
      <div v-for="book in results.bookLists" :key="book.ISBN" >
        <book-card 
          @clickBtn="deleteFromLists" 
          btnName="delete from lists"
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
import { Check } from '@element-plus/icons-vue'
import { reactive, onMounted} from 'vue';
import { getBorrowedBookLists } from '@/api/modules/Patron';
import { borrowBook } from '@/api/modules/Staff';
import { getSystemOption } from '@/api/modules/Administrators';
import { useStore } from 'vuex'
import { success, error, getNowFormatDate } from "@/api"
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

const borrowLists = async () => {
  const username = store.state.username;
  const { data } = await getBorrowedBookLists({username});
  console.log(data.result, results.bookLists.length)

  let option = await getSystemOption({});
  console.log('system',option.data)
  const borrowLimit = option.data.result[0].borrowLimit;
  if(data.result.length + results.bookLists.length > borrowLimit) {
    error("The max borrowed limits is 5");
    return ;
  }
  
  console.log(store.state.username)


  let flag = true;
  for(let book of store.state.shopLists) {
    let arr = JSON.parse(JSON.stringify(book));
    const body = Object.assign(arr, {username, startTime: getNowFormatDate()})
    console.log('body',body)
    const { data } = await borrowBook(body);
    if (!data.success) {
      flag = false;
    }
    console.log(data)
  }
  if(flag) success('success');
  else {
    error("Network Error");
  }
  store.commit('clearLists');
  results.bookLists = store.state.shopLists;
}

const deleteFromLists = (book:any) => {
  store.commit('deleteFromLists', book);
}

onMounted(() => {
  results.bookLists = store.state.shopLists;
})


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

    margin: 0rem auto;
  }

  
}

.container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
