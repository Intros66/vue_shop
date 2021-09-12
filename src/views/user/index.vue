<template>
  <div>
    <!-- 面包屑导航区域 -->
    <Breadcrumb :breadcrumb_config="bread_config"></Breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        stripe
      >
        <el-table-column
          prop="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column prop="mobile" label="电话" align="center">
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          align="center"
        ></el-table-column>
        <el-table-column prop="ms_state" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.ms_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeUserState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="修改用户"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editUser(scope.row.index)"
              ></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="删除用户"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="delUser(scope.row.index)"
              ></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip
              class="item"
              effect="dark"
              content="分配角色"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[3, 5, 10]"
      :page-size="pageSize"
      layout="sizes, prev, pager, next"
      :total="tableData.length"
    >
    </el-pagination>

    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="50%"
    >
      <div>
        <p>当前的用户： {{ userInfo.username }}</p>
        <p>当前的角色： {{ userInfo.role_name }}</p>
        <p>
          分配新角色： 
          <el-select v-model="selectRoleId" placeholder="请选择" @change="showRoleId">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.roleName">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../../components/breadcrumb/index.vue";
import Table from "../../components/table/index.vue";
import { getUser } from "../../api/user";
import { getRoles, disRole } from "../../api/right";
export default {
  name: "Users",
  components: { Breadcrumb, Table },
  data() {
    return {
      tableData: [
        {
          index: 1,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 2,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 3,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 4,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 5,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 6,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 7,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 8,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 9,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 10,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
        {
          index: 11,
          username: "张三",
          email: "123@123.com",
          mobile: "13522233312",
          role_name: "超管",
          ms_state: true,
        },
      ],
      // 需要被分配角色的用户信息
      userInfo: {},
      // 角色列表
      rolesList: [],
      // 选择后的角色ID
      selectRoleId: '',
      // 页码查询
      queryInfo: {
        query: "",
        pagenum: 100,
        pagesize: 1,
      },
      pageSize: 3,
      currentPage: 1,
      setRoleDialogVisible: false,
      bread_config: {
        breadcrumb_child: "用户管理",
        breadcrumb_grandson: "用户列表",
      },
      table_config: {
        thead: [
          { label: "#", prop: "index", width: "60", align: "center" },
          { label: "姓名", prop: "username", width: "150", align: "center" },
          { label: "邮箱", prop: "email", width: "200", align: "center" },
          { label: "电话", prop: "mobile", width: "100", align: "center" },
          { label: "角色", prop: "role_name", width: "100", align: "center" },
          { label: "状态", prop: "ms_state", width: "200", align: "center" },
          {
            label: "禁启用",
            prop: "state",
            type: "slot",
            slotName: "state",
          },
          {
            label: "操作",
            default: {
              deleteButton: true,
              editButton: true,
              editButtonLink: "editUser",
            },
          },
        ],
      },
    };
  },
  methods: {
    // pagesize 改变的事件
    handleSizeChange(val) {
      this.pageSize = val;
    },
    // 页码值 改变的事件
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 修改状态
    changeUserState(row) {
      console.log(row);
    },
    // 编辑用户
    editUser(index) {
      console.log(index);
    },
    // 删除用户
    delUser(index) {
      console.log(index);
    },
    // 分配角色
    async setRole(userInfo) {
      this.userInfo = userInfo
      // 获取所有的角色列表
      const {data: res} = await getRoles()
      this.rolesList = res
      this.setRoleDialogVisible = true
    },
    // 点击按钮，分配角色
    async saveRoleInfo(row){
      if(!this.selectRoleId){
        return this.$message.error('请选择要分配的角色！')
      }
      this.authName = this.selectRoleId
      this.setRoleDialogVisible = false
    },
    showRoleId(val){
      this.selectRoleId = val
    }
  },
};
</script>

<style lang="less" scoped>
</style>