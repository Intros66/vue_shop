<template>
  <el-container id="layout-container">
    <el-header id="layout-header" height="75px"><LayoutHeader /></el-header>
    <el-container>
      <el-aside id="layout-aside" :width="isCollapse">
        <LayoutAside :width.sync="isCollapse"/>
      </el-aside>
      <el-main id="layout-main"><LayoutMain /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from "./components/aside";
import LayoutHeader from "./components/header";
import LayoutMain from "./components/main";
export default {
  name: "Layout",
  components: { LayoutAside, LayoutHeader, LayoutMain },
  data() {
    return {
      isCollapse: '200px'
    }
  },
  
};
</script>

<style lang="less" scoped>
#layout-container {
  height: 100vh;
}

.el-header {
  background-color: #373d41;
  color: #fff;
  text-align: center;
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}

 
</style>