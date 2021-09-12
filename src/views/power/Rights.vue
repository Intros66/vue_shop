<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb :breadcrumb_config="bread_config"></Breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag v-else-if="scope.row.level === '1'" type="success">二级</el-tag>
            <el-tag v-else type="warning">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getRights } from '../../api/right'
import Table from '../../components/table/index.vue'
import Breadcrumb from "../../components/breadcrumb/index.vue";
export default {
  name: "Rights",
  components: { Breadcrumb, Table },
  data() {
    return {
      rightsList: [],
      bread_config: {
        breadcrumb_child: "权限管理",
        breadcrumb_grandson: "权限列表",
      },
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList(){
      const { data: res } = await getRights('list')
      this.rightsList = res
    }
  },
};
</script>

<style>
</style>