<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区 -->
      <div class="avatra-box">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区 -->
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="login-from"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-usercenter"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="btns">
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button type="info" @click="resetForm('loginForm')"
              >重置</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validate_password } from "../../utils/validate";
export default {
  name: "Login",
  data() {
    // 检验密码
    const validate_password_rules = (rule, value, callback) => {
      let regPassword = validate_password(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPassword) {
        callback(new Error("请入 >=6 并且 <= 20 位的密码，包含数字、字母"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "3-10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: validate_password_rules, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate( async (valid) => {
        if (valid) {
          this.$store.dispatch('app/loginAction', this.loginForm).then( res => {
            this.$message({
              type: 'success',
              message: res.meta.msg
            })
            this.$router.push('/home')
          }).catch( () => {
            this.resetForm();
          })
        }
      });
    },
    resetForm() {
      this.$refs['loginForm'].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatra-box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.login-from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
