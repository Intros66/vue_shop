<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/consoleIndex' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>{{ breadcrumb_config.breadcrumb_child }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ breadcrumb_config.breadcrumb_grandson }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name: 'Breadcrumb',
    props: {
        breadcrumb_config: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style>

</style>