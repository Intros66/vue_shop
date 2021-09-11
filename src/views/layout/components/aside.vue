<template>
  <div>
    <div class="toggle-button" @click="toggleCollapse">|||</div>
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical-demo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition="false"
      :router="true"
    >
    <!-- 主菜单 -->
      <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ menu.authName }}</span>
        </template>
        <!-- 子菜单 -->
        <el-menu-item
          :index="'/' + child.path"
          v-for="child in menu.children"
          :key="child.id"
          @click="saveNavState('/' + child.path)"
        >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>{{ child.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { FindMenuTree } from "../../../api/menu";
export default {
  name: "LayoutAside",
  props: {
    width: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      menuList: [],
      iconsObj: {
        id: "",
      },
      isCollapse: false,
      parentWidth: '',
      // 被激活的链接地址
      activePath: ''
    };
  },
  created() {
    this.getMenuList();
    this.activePath = sessionStorage.getItem('activePath')
  },
  methods: {
    async getMenuList() {
      const { data: res } = await FindMenuTree();
      this.menuList = res;
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
      this.parentWidth = this.isCollapse ? '64px' : '200px'
      this.$emit("update:width", this.parentWidth)
    },
    // 保存链接的激活状态
    saveNavState(activePath){
      sessionStorage.setItem('activePath', activePath)
    }
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  border-right: 0;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>