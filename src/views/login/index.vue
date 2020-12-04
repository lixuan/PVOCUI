<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div style="background: #fff;padding: 20px;">
        <div class="title-container" align="center">
          <img :src="bannerImg" width="60" height="60" style="margin-bottom: 10px">
          <h3 class="title" style="color: #1890ff">
            {{ $t('login.title') }}
          </h3>
        </div>
        <el-form-item prop="userNameOrEmailAddress">
          <el-input
            v-model="loginForm.userNameOrEmailAddress"
            :placeholder="$t('login.username')"
            type="text"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            id="password"
            ref="password"
            v-model="loginForm.password"
            type="password"
            :placeholder="$t('login.password')"
            autocomplete="on"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <div style="margin-top:10px;margin-bottom: 10px">
          <el-checkbox v-model="loginForm.rememberClient" label="记住密码" name="type" class="checkboxpass" />
        </div>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from '@/utils/cookie'
import { getUserInfoById } from '../../api/user/user/index'
import store from '@/store'
import { warnMsg } from '@/utils/messageBox'
import router from '@/router'
import { getInfo } from '@/api/login'

export default {
  name: 'Login',
  components: {},
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      bannerImg: require('../../../src/assets/login/logo.png'),
      loginForm: {
        userNameOrEmailAddress: '',
        password: '',
        rememberClient: false
      },
      loginRules: {
        userNameOrEmailAddress: [{
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }, {
          min: 3,
          max: 50,
          message: '长度在 3 到 50 个字符',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          trigger: 'blur',
          validator: validatePass
        }]
      },
      loading: false,
      showDialog: false,
      // 租户选择
      tenants: [],
      tenantForm: {},
      arrTemp: [],
      arrTemps: ''
    }
  },
  watch: {},
  mounted() {},
  destroyed() {
  // window.removeEventListener('storage', this.afterQRScan)
  },
  created() {
    localStorage.clear()
    // this.getTenants();
    if (getCookie('userName')) { this.loginForm.userNameOrEmailAddress = getCookie('userName') }

    if (getCookie('passWord')) { this.loginForm.password = getCookie('passWord') }
  },
  methods: {
    handleLogin() {
      this.loading = true
      const that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          localStorage.clear()

          // 判断复选框是否被勾选
          if (this.loginForm.rememberClient === true) {
          // 存入账号名，密码和保存天数三个参数
            setCookie('userName', this.loginForm.userNameOrEmailAddress, 360)
            setCookie('passWord', this.loginForm.password, 360)
          } else {
          // 清空Cookie
            delCookie('passWord')
          }

          this.$store.dispatch('LoginByEmail', this.loginForm).then(res => {
            if (res.success) {
              this.loading = false
              setCookie('Abp.AuthToken', res.result.accessToken, 360)
              setCookie('Abp.AuthUserId', res.result.userId, 360)
              getUserInfoById({ id: res.result.userId }).then(res => {
                if (res.success) {
                  this.arrTemp = res.result.roles
                  for (let i = 0; i < this.arrTemp.length; i++) {
                    this.arrTemps = this.arrTemp[i]
                  }
                  setCookie('Abp.AuthUserItem', this.arrTemps, 360)
                }
              })
              that.$router.push({ path: 'home' })
            } else {
              this.loading = false
              this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
            }
          // this.showDialog = true;
          }).catch(err => {
            this.loading = false
          })
        } else {
          this.loading = false
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss">

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      color: #1890ff;
      height: 47px;
      border-radius: 5px;
    }
  }

  .el-form-item {
    border: 1px solid #1890ff;
    /*background: rgba(0, 0, 0, 0.1);*/
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  /* background-color: $bg; */
  overflow: hidden;
  height: 100%;
  background-image: url('../../../src/assets/login/login_background.jpg');
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
