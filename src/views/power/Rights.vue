<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb :breadcrumb_config="bread_config"></Breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from "../../components/breadcrumb/index.vue";
export default {
  name: "Rights",
  components: { Breadcrumb },
  data() {
    return {
      bread_config: {
        breadcrumb_child: "权限管理",
        breadcrumb_grandson: "权限列表",
      },
    };
  },
};
</script>

<style>
</style>