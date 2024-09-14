<script setup lang="ts">
import { ref } from 'vue'
import {login} from '@/api/login'

const loginEntity = ref<Login>({
  username: '',
  password: '',
  rememberMe: 0,
  loginType: 1,
  tenantMark: '',
  passwordEnc: undefined,
  captcha: undefined,
  captchaKey: undefined
})

// 跳到当前页面后 自动调用方法login,并设置token,并跳转到首页
const handleLogin = async () => {
  let res = await login(loginEntity.value)
  console.log(res)
}
const handleSubmit = () => {

}
const signup = () => {
  alert('Redirecting to sign-up page...')
  // Redirect to the sign-up view or handle it as needed in your application
}

</script>

<template>
  <div class="login-page">
    <div class="form-wrapper">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="loginEntity.username" required />
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="loginEntity.password" required />
        </div>
        <button type="submit" @click="handleLogin">登录</button>
      </form>
      <!--      <p>-->
      <!--        ?-->
      <!--        <a href="#" @click="signup">Sign up</a>.-->
      <!--      </p>-->
    </div>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to right, var(--carrot-color-login-left), var(--carrot-color-login-right));
}

.form-wrapper {
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
}

.form-group input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #6f42c1;
  color: white;
  font-size: 16px;
}
</style>