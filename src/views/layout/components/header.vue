<template>
  <div class="header-info">
      <div class="header-title">
        <span>后台管理系统</span>
      </div>
      <div class="face-info">
        <span class="name">{{ username }}</span>
        <span class="menu-btn">
          <el-button type="info" @click="logout">退出</el-button>
        </span>
      </div>
  </div>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      username: this.$store.state.app.username,
    };
  },
  methods: {
    logout() {
      this.$confirm("确认退出管理后台", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        
        this.$store
          .dispatch("app/logoutAction")
          .then((res) => {
            this.$message({
              message: res.message,
              type: "success",
            });
            this.$router.push({
              name: "Login",
            });
          })
          .catch((error) => {
            this.$router.push({
              name: "Login",
            });
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  justify-content: space-between;
}
.header-title {
  float: left;
  line-height: 60px;
  font-size: 24px;
}
.menu-btn {
  display: inline-block;
  padding-top: 24px;
  cursor: pointer;
  margin-left: 6px;
}

</style>