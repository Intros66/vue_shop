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
      <!-- <Table :config="table_config" :data="tableData"> -->
        <!--禁启用-->
        <!-- <template v-slot:status="slotData">
          <el-switch
            :disabled="slotData.data.id == switch_disabled"
            @change="changeUserState(slotData.data)"
            v-model="slotData.data.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </Table> -->
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
                @click="disUser(scope.row.index)"
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
  </div>
</template>

<script>
import Breadcrumb from "../../components/breadcrumb/index.vue";
import Table from "../../components/table/index.vue";
import { getUser } from "../../api/user";
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
      queryInfo: {
        query: "",
        pagenum: 100,
        pagesize: 1,
      },
      pageSize: 3,
      currentPage: 1,
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
    disUser(index) {
      console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
</style>