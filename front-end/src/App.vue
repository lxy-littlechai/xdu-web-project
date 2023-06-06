<template>
    <router-view></router-view>
  
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Login from "./components/Login.vue";
import Staff from "@/components/Staff/Staff.vue";
import BookSearch from "@/components/Patron/Book-search.vue";

@Options({
  components: {
    Login,
    BookSearch,
    Staff
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
