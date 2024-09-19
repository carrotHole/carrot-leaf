<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'
import {loginRequest, getToken} from '@/api/loginRequest'
import MessageUtil from '@/util/MessageUtil'
import SessionStoreUtil from '@/util/SessionStoreUtil'

const loginEntity = ref<Login>({
  username: '',
  password: '',
  rememberMe: 0,
  loginType: 1,
  tenantMark: 'carrot',
  passwordEnc: undefined,
  captcha: undefined,
  captchaKey: undefined
})

onMounted (()=>{
  // 获取token
  const token = SessionStoreUtil.getToken()
  if (token) {
    router.push('/')
  }
})

// 跳到当前页面后 自动调用方法login,并设置token,并跳转到首页
const handleLogin = async () => {
  const { data } = await loginRequest(loginEntity.value)
  let tokenValue = undefined

  if (!data || data.users.length ==  0 ){
    MessageUtil.error('登录异常，请联系管理员')
    return
  }

  if (data.users.length == 1){
    // console.log(data)

    // 用户名对应一个账号,直接获取token
    const longinResultUser = data.users[0]
    const tokenRes = await getToken(data.identifyKey, longinResultUser.deptId)
    tokenValue = tokenRes.data
  }else {
    // todo 多个账号

  }

  // 缓存token
  await SessionStoreUtil.setToken(tokenValue)
  await router.push("/")

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