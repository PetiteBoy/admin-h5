<template>
  <div class="view-container">
    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 操作按钮 -->
    <div class="row ope-container">
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="refreshAdminList()">刷新</el-button>
      <el-button type="success" size="small" @click="addAdmin()">新增</el-button>
      <Search v-on:search="searchAdminData()"></Search>
    </div>
    <!-- 数据列表 -->
    <div class="row data-container">
      <el-table :data="adminData" border style="width: 100%" :max-height="tabMaxHeight">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="用户名" prop="username">
        </el-table-column>
        <el-table-column label="真实姓名" prop="realname">
        </el-table-column>
        <el-table-column label="邮箱" prop="email">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime">
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime">
        </el-table-column>
        <el-table-column label="操作" width="350">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delAdminItem(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button type="primary" size="mini" @click="editAdminItem(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="primary " size="mini " @click="addAdminPermission(scope.row) ">权限
            </el-button>
            <el-button type="primary " size="mini " @click="addAdminMenu(scope.row) ">菜单
            </el-button>
            <el-button type="primary " size="mini " @click="addAdminRole(scope.row) ">角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="row page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
      </el-pagination>
    </div>

    <!-- 新增管理员弹窗 -->
    <el-dialog title="新增管理员" :visible.sync="addAdminDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="120px" :model="addAdminData" ref="addAdminData">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addAdminData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addAdminData.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="addAdminData.realname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addAdminData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="addAdminData.telephone"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addAdminDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAddAdmin('addAdminData')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除管理员列表 -->
    <el-dialog title="删除管理员" :visible.sync="delAdminDialogVisible" width="30%" :before-close="handleClose">
      <span>你确定要删除该管理员</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="delAdminDialogVisible = false">取 消</el-button>
        <el-button type="danger" size="small" @click="submitDelAdmin()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑管理员弹窗 -->
    <el-dialog title="编辑管理员" :visible.sync="editAdminDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="120px" :model="editAdminData" ref="editAdminData">
        <el-form-item label="密码" prop="password">
          <el-input v-model="editAdminData.password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="editAdminData.realname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editAdminData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="telephone">
          <el-input v-model="editAdminData.telephone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editAdminDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitEditAdmin('editAdminData')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户权限 -->
    <el-dialog title="添加权限" :visible.sync="editAdminPermissionDialogVisible" width="30%" :before-close="handleClose" ref="multipleTable">
      <el-select v-model="adminPermissionData" multiple placeholder="请选择">
        <el-option v-for="item in permissionData" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editAdminPermissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitEditAdminPermission() ">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户角色 -->
    <el-dialog title="添加角色" :visible.sync="editAdminRoleDialogVisible" width="30%" :before-close="handleClose" ref="multipleTable">
      <el-select v-model="adminRoleData" multiple placeholder="请选择">
        <el-option v-for="item in roleData" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editAdminRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitEditAdminRole() ">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加用户菜单 -->
    <el-dialog title="添加菜单" :visible.sync="editAdminMenuDialogVisible" width="30%" :before-close="handleClose" ref="multipleTable">
      <el-tree node-key="id" default-expand-all :expand-on-click-node="false" :data="menuList" :props="defaultProps" show-checkbox :default-checked-keys="adminMenuData"  ref="tree">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editAdminMenuDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitEditAdminMenu() ">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import Search from './Commen/Search.vue'
export default {
  name: 'Admin',
  data() {
    return {
      // 新增管理员弹窗
      addAdminDialogVisible: false,
      // 新增管理员数据
      addAdminData: {
        username: '',
        password: '',
        realname: '',
        email: '',
        telephone: '',
        isEnable: false
      },
      //   编辑弹窗
      editAdminDialogVisible: false,
      // 编辑管理员数据
      editAdminData: {
        id: '',
        password: '',
        realname: '',
        email: '',
        telephone: '',
        isEnable: false
      },
      //   删除管理员弹窗状态
      delAdminDialogVisible: false,
      // 删除管理员id
      delAdminId: 0,
      // 管理员
      adminData: [],
      //页码相关
      currentPage: 1,
      pageSize: 20,
      totalSize: 0,
      // 表格最大高度
      tabMaxHeight: 0,
      editAdminPermissionDialogVisible: false,
      permissionData: [],
      roleData: [],
      adminPermissionData: [],
      adminRoleData: [],
      currentAdminId: '',
      editAdminRoleDialogVisible: false,
       menuList: [],
      // 初始化树属性值
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      editAdminMenuDialogVisible: false,
      adminMenuData: []
    }
  },
  computed: {
    searchId() {
      return this.$store.state.user.searchId
    }
  },
  components: {
    Search
  },
  mounted() {
    this.getAdminData()
  },
  methods: {
    //  获取数据
    getAdminData() {
      this.$store
        .dispatch('getAdminData', {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          name: this.searchId
        })
        .then(res => {
          this.adminData = res.data.list
          this.totalSize = res.data.total
          let clientHieght = document.body.clientHeight
          this.tabMaxHeight = clientHieght - 60 - 30 - 30 - 50 - 50
        })
    },
    // 刷新数据
    refreshAdminList() {
      this.getAdminData()
    },
    // 搜索数据
    searchAdminData() {
      this.getAdminData()
    },
    //  新增
    addAdmin() {
      this.addAdminDialogVisible = true
    },
    // 新增请求
    submitAddAdmin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addAdminDialogVisible = false
          this.$store.dispatch('addAdminData', this.addAdminData).then(res => {
            this.getAdminData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除
    delAdminItem(row) {
      this.delAdminId = row.id
      this.delAdminDialogVisible = true
    },
    // 删除请求
    submitDelAdmin() {
      this.delAdminDialogVisible = false
      this.$store
        .dispatch('delAdminData', {
          id: this.delAdminId
        })
        .then(res => {
          this.getAdminData()
        })
        .catch(err => {
          throw err
        })
    },
    // 编辑
    editAdminItem(row) {
      this.editAdminData.id = row.id
      this.editAdminData.password = row.password
      this.editAdminData.realname = row.realname
      this.editAdminData.email = row.email
      this.editAdminData.telephone = row.telephone
      this.editAdminData.isEnable = row.isEnable
      this.editAdminDialogVisible = true
    },
    // 编辑请求
    submitEditAdmin() {
      this.$store.dispatch('updateAdminData', this.editAdminData).then(res => {
        this.getAdminData()
      })
      this.editAdminDialogVisible = false
    },
    // 添加用户权限
    addAdminPermission(row) {
      this.currentAdminId = row.id
      this.editAdminPermissionDialogVisible = true
      this.$store.dispatch('getPermissionData', {}).then(res => {
        this.permissionData = res.data.list
      })
      this.$store
        .dispatch('searchAdminPermission', {
          userId: this.currentAdminId
        })
        .then(res => {
          this.adminPermissionData = res.data
        })
    },
    // 添加用户权限 请求
    submitEditAdminPermission() {
      this.editAdminPermissionDialogVisible = false
      this.$store
        .dispatch('addAdminPermission', {
          userId: this.currentAdminId,
          authorityIds: this.adminPermissionData
        })
        .then(res => {
          this.getAdminData()
        })
    },
    // 添加用户角色
    addAdminRole(row) {
      this.currentAdminId = row.id
      this.editAdminRoleDialogVisible = true
      this.$store.dispatch('getRoleData', {}).then(res => {
        this.roleData = res.data.list
      })
      this.$store
        .dispatch('searchAdminRole', {
          userId: this.currentAdminId
        })
        .then(res => {
          this.adminRoleData = res.data
        })
    },
    // 添加用户角色 请求
    submitEditAdminRole() {
      this.editAdminRoleDialogVisible = false
      this.$store
        .dispatch('addAdminRole', {
          userId: this.currentAdminId,
          roleIds: this.adminRoleData
        })
        .then(res => {
          this.getAdminData()
        })
    },
    // 添加用户菜单
    addAdminMenu(row){
      this.currentAdminId = row.id
      this.editAdminMenuDialogVisible = true
      this.$store.dispatch('getMenuList').then(res => {
        this.menuList = res.data
      })
      this.$store
        .dispatch('searchAdminMenu', {
          userId: this.currentAdminId
        })
        .then(res => {
          this.adminMenuData = res.data
        })
    },
    submitEditAdminMenu(){
      this.editAdminMenuDialogVisible = false
      this.$store
        .dispatch('addAdminMenu', {
          userId: this.currentAdminId,
          menuIds: this.$refs.tree.getCheckedKeys()
        })
        .then(res => {
          this.getAdminData()
        })
    },
    // 关闭弹窗
    handleClose() {
      this.addAdminDialogVisible = false
      this.delAdminDialogVisible = false
      this.editAdminDialogVisible = false
      this.editAdminPermissionDialogVisible = false
      this.editAdminRoleDialogVisible = false
      this.editAdminMenuDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.pageSize = val
      this.getAdminData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAdminData()
    }
  },
  watch: {
    addAdminDialogVisible() {
      if (!this.addAdminDialogVisible) {
        this.addAdminData = {
          username: '',
          password: '',
          realname: '',
          email: '',
          telephone: '',
          isEnable: false
        }
      }
    }
  }
}
</script>
<style>
.opetion {
  overflow: hidden;
}
</style>

