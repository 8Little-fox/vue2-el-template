<template>
  <div class="login">
    <el-row class="login-main" type="flex">
      <el-col :span="12"><img src="@/assets/chahua@2x.png" alt="" /> </el-col>
      <el-col :span="12">
        <div class="login-form">
          <el-form :model="form" ref="form" :rules="rules" status-icon>
            <h1>欢迎登录</h1>
            <el-form-item prop="username" placeholder="请输入用户名">
              <el-input @keyup.enter.native="keyupClick" v-model="form.username" placeholder="账号" auto-complete="off" clearable>
                <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>

            <el-form-item prop="password" placeholder="请输入密码">
              <el-input ref="mima" v-model="form.password" type="password" show-password placeholder="密码" auto-complete="off" clearable>
                <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-col :span="11">
                <el-input v-model="form.code" placeholder="请输入验证码" @keyup.enter.native="submitForm('form')">
                <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
                </el-input>
              </el-col>
              <el-col :span="11" :offset="2">
                <el-image class="login-code" @click="handleGetCode" :src="codeImg"
                ></el-image>
              </el-col>
            </el-form-item>
            <div class="login-check">
                <el-checkbox v-model="form.rememberMe">记住我</el-checkbox>
            </div>
            <el-button @click.native.prevent="submitForm('form')" style="width: 350px" type="primary">登录</el-button>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Background from '@/assets/background.jpg'
import request from '@/utils/request'
import { encrypt, decrypt } from '@/utils/rsaEncrypt'
import Cookies from 'js-cookie'
import { debounce } from '@/utils/tools/method'
export default {
  name: 'Login',
  data () {
    return {
      Background,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      form: {
        username: '',
        password: '',
        rememberMe: false,
        code: '',
        uuid: ''
      },
      codeImg: '',
      redirect: undefined,
      cookiePass: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {
    this.getCookie() // 获取用户名密码等Cookie
  },
  mounted () {
    this.handleGetCode()
  },
  methods: {
    keyupClick () {
      this.$refs.mima.focus()
    },
    handleGetCode () {
      request
        .setPath('/auth/code')
        .get()
        .then((res) => {
          this.codeImg = res.img
          this.form.uuid = res.uuid
        })
    },

    handleLogin () {
      const params = {
        username: this.form.username,
        password: encrypt(this.form.password),
        rememberMe: this.form.rememberMe,
        code: this.form.code,
        uuid: this.form.uuid
      }
      if (params.rememberMe) {
        Cookies.set('username', params.username)
        Cookies.set('password', params.password)
        Cookies.set('rememberMe', params.rememberMe)
      } else {
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }
      this.$store.dispatch('user/login', params).then(() => {
        this.$router.push({ path: '/' })
      }).catch(() => {
        this.handleGetCode()
      })
    },
    submitForm: debounce(function (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.handleLogin()
        }
      })
    }, 500, true),
    getCookie () {
      const username = Cookies.get('username')
      const password = Cookies.get('password')
      const rememberMe = decrypt(Cookies.get('rememberMe'))
      this.cookiePass = password === undefined ? '' : password
      this.form = {
        username,
        password,
        rememberMe
      }
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1600px) {
  .login-main {
    zoom: 0.7;
  }
}
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #f3f7f9;
}
.login-main {
  background-color: #ffffff;
  width: 1424px;
  height: 846px;
  margin: 0 auto;
}
.login-form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 846px;
}
.login-check {
  margin-bottom: 20px;
}
.el-input__inner {
  width: 470px;
  height: 56px;
  opacity: 1;
  background: #ffffff;
  border: 1px solid #e3e8f0;
  border-radius: 29px;
}
.login-code {
  cursor: pointer;
  vertical-align: middle;
}
h1 {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  font-weight: bold;
  color: #707070;
}
</style>
