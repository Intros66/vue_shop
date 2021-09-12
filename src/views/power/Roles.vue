<template>
  <div>
    <Breadcrumb :breadcrumb_config="bread_config"></Breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <el-table :data="rolesList" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              :class="['bdbottom', index === 0 ? 'bdtop' : '', 'vcenter']"
              v-for="(parent, index) in scope.row.children"
              :key="parent.id"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag
                  closable
                  @close="removeRightById(scope.row, parent.id)"
                  >{{ parent.authName }}</el-tag
                >
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级和三级权限 -->
              <el-col :span="19">
                <el-row
                  :class="[index2 === 0 ? '' : 'bdtop', 'vcenter']"
                  v-for="(child, index2) in parent.children"
                  :key="child.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, child.id)"
                      >{{ child.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="grandson in child.children"
                      :key="grandson.id"
                      type="warning"
                      closable
                      @close="removeRightById(scope.row, grandson.id)"
                    >
                      {{ grandson.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editRole(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="delRole(scope.row.id)"
              >删除</el-button
            >
            <!-- 分配权限 -->
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="setRightDialogVisible"
      width="50%"
      @close="setRightDialogClosed"
    >
      <el-tree 
        :data="rightsList" 
        :props="treeProps" 
        @node-click="handleNodeClick" 
        show-checkbox 
        node-key="id" 
        default-expand-all
        :default-checked-keys="defKeys"
        ref="treeRef"
        ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRights, getRoles, deleteRightOrRole, authRole } from "../../api/right";
import Breadcrumb from "../../components/breadcrumb/index.vue";
export default {
  name: "Roles",
  components: { Breadcrumb },
  data() {
    return {
      // 角色
      rolesList: [],
      // 权限分配对话框
      setRightDialogVisible: false,
      // 权限
      rightsList: [],
      // 树形控件属性绑定对象
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的节点ID数组
      defKeys: [],
      // 当前即将分配权限的ID
      roleId: '',
      // 面包屑导航
      bread_config: {
        breadcrumb_child: "权限管理",
        breadcrumb_grandson: "角色列表",
      },
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 权限列表
    async getRoleList() {
      const { data: res } = await getRoles();
      this.rolesList = res;
    },
    // 分配权限对话框
    async showSetRightDialog(role) {
      this.roleId = role.id
      const { data: res } = await getRights('tree');
      this.rightsList = res
      this.getLeafKeys(role, this.defKeys)
      this.setRightDialogVisible = true
    },
    editRole(val) {},
    delRole(val) {},
    disRole(val) {},
    // 根据ID删除对应权限
    async removeRightById(role, id) {
      const confirmResult = await this.$confirm(
        "此操作将移除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch(() => {});
      if (confirmResult !== "confirm") {
        return this.$message.info("取消删除");
      }
      const { data: res } = await deleteRightOrRole(role.id, id);
      role.children = res;
    },
    // 通过递归获取第三级权限ID
    getLeafKeys(node, arr){
      // 如果当前节点不包含children，则是三级
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getLeafKeys(item, arr)
      });
    },
    // 关闭对话框
    setRightDialogClosed(){
      this.defKeys = []
    },
    // 点击为角色分配权限
    async allotRights(){
      const keys = [...this.$refs.treeRef.getCheckedKeys(), ...this.$refs.treeRef.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      const { meta } = await authRole(this.roleId, {rids: idStr})
      if(meta.status === 200){
        this.$message.success(meta.msg)
        this.getRoleList()
        this.setRightDialogVisible = false
      }else {
        this.$message.error(meta.msg)
      }
    },
    handleNodeClick(val){
      console.log(val);
    }
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 20px;
}
.bdtop {
  border-top: 1px sloid #eee !important;
}
.bdbottom {
  border-bottom: 1px sloid #eee !important;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>