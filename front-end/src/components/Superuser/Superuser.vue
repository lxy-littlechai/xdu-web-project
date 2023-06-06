<template>
  <div class="common-layout">
    <el-container>
      <el-header>Superuser Interface
        <div class="flex-grow" />
        <el-button @click="logout">Logout</el-button>
      </el-header>
      <el-container class="layout-container">
        <el-aside width="250px">
          <el-menu router="true" default-active="/Superuser/Statistics" class="el-menu-vertical-demo">
            <el-menu-item index="/Superuser/Log">
              <span>Log & DBOperation</span>
            </el-menu-item>
            <el-menu-item index="/Superuser/Statistics">
                <span>System Statistics</span>
            </el-menu-item>
            <el-sub-menu index="/Superuser/Permission">
              <template #title>
                <span>Permission Management</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/Superuser/Permission">Change Permission</el-menu-item>
                <el-menu-item index="/Superuser/CreateAccount">Create Account</el-menu-item>
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

      .el-menu-item {}
    }
  }
}
</style>
