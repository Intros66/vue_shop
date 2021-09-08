<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
import { login } from "@/api/login";
export default {
  name: "Home",
  methods: {
    logout() {
      this.$confirm("确认退出管理后台", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("app/logoutAction").then( res => {
          console.log(res);
          this.$message({
            message: res.message,
            type: "success",
          });
          this.$router.push({
            name: "Login",
          });
        }).catch( error => {
          console.log(error);
          this.$router.push({
              name: "Login",
          });
        });
      });
    },
  },
};
</script>

<style>
</style>