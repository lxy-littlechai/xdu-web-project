<template>
  <div class="common-layout">
    <el-container>
      <el-header>Book Management
        <div class="flex-grow" />
        <el-button @click="logout">Logout</el-button>
      </el-header>

      <el-container class="layout-container">
        <el-aside width="250px">
          <el-menu router="true" default-active="/Staff/Dashboard" class="el-menu-vertical-demo">
            <el-menu-item index="/Staff/Dashboard">
              <span>Dashboard</span>
            </el-menu-item>
            <el-menu-item index="/Staff/PatronInfo">
              <span>Patron Operation</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                
                <span>Book Operation</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Staff/AddBook">Add a book</el-menu-item>
                <el-menu-item index="/Staff/DeleteBook">Delete a book</el-menu-item>
                <el-menu-item index="/Staff/UpdateBook">Update a book</el-menu-item>
                <el-menu-item index="/Staff/BorrowBook">Borrow a book</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-menu-item index="/Staff/CreateAccount">Register a patron</el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                
                <span>Book History</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Staff/History/Borrow">Borrow</el-menu-item>
                <el-menu-item index="/Staff/History/Return">Return</el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
const router = useRouter();
const logout = () => router.push({
  path: "/"
})

</script>

<style lang="scss" scoped>
.common-layout {
  height: 100vh;
  .el-header {
    height: 10vh;
    width: 100%;
    background-color: #409eff;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: white;
    .flex-grow {
     flex-grow: 1;
    }
  }

  .layout-container {
    height: 90vh;
  }

  .el-aside {
    
    .el-menu {
      height: 100%;
      .el-menu-item {

      }
    }
  }
}
</style>
