<template>
  <div class="login-container">
    <h1 class="login-title">Welcome to the British Library</h1>
    <form class="login-form">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="state.username" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="state.password" required>
      </div>
      <!--       <div class="form-group">
        <label for="role">Role</label>
        <select id="role" v-model="state.role" required>
          <option value="" disabled>Select your role</option>
          <option value="Patron">Patron</option>
          <option value="Administrator">Administrator</option>
          <option value="Staff">Staff</option>
          <option value="Superuser">Superuser</option>
        </select>
      </div> -->
      <Vcode :show="puzzle.isShow" @success="onSuccess" @close="onClose" />
      <button type="submit" class="login-button" @click.prevent="onSubmit">Login</button>
    </form>
    <div class="copyright">Class 2 Group B5</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineComponent } from 'vue'
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
import { loginAccount } from "@/api"
import { success, error } from "@/api"
import Vcode from "vue3-puzzle-vcode"

defineComponent({
  components: {
    Vcode
  }
})
const store = useStore();
const router = useRouter();


//puzzle code
const puzzle = reactive({
  isShow: false,
})
const onSubmit = () => {
  //puzzle.isShow = true;
  login();
}
const onSuccess = () => {
  //puzzle.isShow = false;
  login();
}
const onClose = () => {
  puzzle.isShow = false;
}


const state = reactive({
  username: '',
  password: '',
})

const login = async () => {
  store.commit('clearLists');
  const { data } = await loginAccount(state);
  console.log(data)
  if (data.success) {
    store.commit('setUser', state.username);
    switch (data.permission) {
      case 'Patron':
        router.push({
          path: '/Patron',
        })
        break;
      case 'Staff':
        router.push({
          path: '/Staff',
        })
        break;
      case 'Administrator':
        router.push({
          path: '/Administrator',
        })
        break;
      case 'Superuser':
        router.push({
          path: '/Superuser',
        })
        break;
      default:
        break;
    }
  }
  else {
    error("Error in usename or password");
  }


}

</script>
<style scoped>
.copyright {
  margin-top: 80px;
  font-size: 30px;
  color: #fff;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("../assets/british-library.jpg");
  background-size: auto;
  background-repeat: no-repeat;
}

.login-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: Arial, sans-serif;
  color: #ffffff;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30rem;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 1);
}

.form-group {
  width: 20rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  align-items: flex-start;
  /* Add this line to align items to the left */
}

label {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: Arial, sans-serif;
  color: #333;
  width: 100%;
  /* Add this line to make the label take up the full width */
  display: inline-block;
  /* Add this line to make the label inline with the input/select */
}

input[type="text"],
input[type="password"],
select {
  padding: 0.5rem;
  font-size: 1.5rem;
  border: none;
  border-bottom: 1px solid #ccc;
  outline: none;
  width: 100%;
}

.login-button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: Arial, sans-serif;
}
</style>
