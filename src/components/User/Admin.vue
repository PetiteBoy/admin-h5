<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main-page">
      <!-- 操作按钮 -->
      <div>
        <el-button type="success" size="small" @click="addAdmin()">新增</el-button>
        <Search v-on:search="getAdminData()"></Search>
      </div>

      <!-- 数据列表 -->
      <div class="row">
        <el-table :data="adminData" border style="width: 100%">
          <el-table-column label="ID" prop="id">
          </el-table-column>
          <el-table-column label="用户名" prop="username">
          </el-table-column>
          <el-table-column label="真实姓名" prop="realname">
          </el-table-column>
          <el-table-column label="邮箱" prop="email">
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="96">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updateTime" width="96">
            <template slot-scope="scope">
              <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="400">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editAdminItem(scope.row)">编辑
              </el-button>
              <el-button type="primary " size="mini " @click="addAdminPermission(scope.row) ">权限
              </el-button>
              <el-button type="primary " size="mini " @click="addAdminMenu(scope.row) ">菜单
              </el-button>
              <el-button type="primary " size="mini " @click="addAdminRole(scope.row) ">角色
              </el-button>
              <el-button type="danger" size="mini" @click="delAdminItem(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <div class="row">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
        </el-pagination>
      </div>
    </div>

    <!-- 新增管理员弹窗 -->
    <el-dialog title="新增管理员" :visible.sync="addAdminDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="120px" :model="addAdminData">
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
      <el-form label-position="left" label-width="120px" :model="editAdminData">
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
      <el-tree node-key="id" default-expand-all :expand-on-click-node="false" :data="menuList" :props="defaultProps" show-checkbox :default-checked-keys="adminMenuData" ref="tree">
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
import moment from 'moment'
import baseService from '../../service/baseService.js'
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
      // 列表数据
      adminData: [],
      //页码相关
      pageNum: 1,
      pageSize: 20,
      totalSize: 0,
      // 当前用户Id
      currentAdminId: '',
      // 用户权限弹窗
      editAdminPermissionDialogVisible: false,
      // 权限列表
      permissionData: [],
      // 用户已有权限
      adminPermissionData: [],

      // 用户角色弹窗
      editAdminRoleDialogVisible: false,
      // 角色列表
      roleData: [],
      // 用户已有角色
      adminRoleData: [],
      // 用户菜单弹窗
      editAdminMenuDialogVisible: false,
      // 菜单列表
      menuList: [],
      // 初始化树属性值
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 用户已有菜单
      adminMenuData: [],

      adminPath: {
        getPath: '/bguser/page',
        addPath: '/bguser/add',
        delPath: '/bguser/delete',
        editPath: '/bguser/update',
        searchPermissionPath: '/bguser/privilege/authorities',
        addPermissionPath: '/bguser/config/privilege/authorities',
        searchRolePath: '/bguser/roles',
        addRolePath: '/bguser/config/roles',
        searchMenuPath: '/bguser/privilege/menu',
        addMenuPath: '/bguser/config/privilege/menu'
      },
      permissionPath: {
        getPath: '/authority/page'
      },
      rolePath: {
        getPath: '/role/page'
      },
      menuPath: {
        getPath: '/menu/all'
      }
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
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    //  获取数据
    getAdminData() {
      baseService
        .basePostData(this.adminPath.getPath, {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.searchId
        })
        .then(res => {
          let result = res.data
          this.adminData = result.data.list
          this.totalSize = result.data.total
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
        })
    },
    //  新增
    addAdmin() {
      this.addAdminData = {
        username: '',
        password: '',
        realname: '',
        email: '',
        telephone: '',
        isEnable: false
      }
      this.addAdminDialogVisible = true
    },
    // 新增请求
    submitAddAdmin(formName) {
      this.addAdminDialogVisible = false
      baseService.basePostData(this.adminPath.addPath, this.addAdminData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getAdminData()
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
      baseService.baseGetData(this.adminPath.delPath, this.delAdminId).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getAdminData()
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
      baseService.basePostData(this.adminPath.editPath, this.editAdminData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getAdminData()
      })
      this.editAdminDialogVisible = false
    },
    // 用户权限
    addAdminPermission(row) {
      this.currentAdminId = row.id
      this.editAdminPermissionDialogVisible = true
      // 获取权限列表
      baseService.basePostData(this.permissionPath.getPath, {}).then(res => {
        this.permissionData = res.data.data.list
      })
      //用户已有权限
      baseService
        .basePostData(this.adminPath.searchPermissionPath, {
          userId: this.currentAdminId
        })
        .then(res => {
          this.adminPermissionData = res.data.data
        })
    },
    // 用户权限请求
    submitEditAdminPermission() {
      this.editAdminPermissionDialogVisible = false
      baseService
        .basePostData(this.adminPath.addPermissionPath, {
          userId: this.currentAdminId,
          authorityIds: this.adminPermissionData
        })
        .then(res => {
          let result = res.data
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
          this.getAdminData()
        })
    },
    // 用户角色
    addAdminRole(row) {
      this.currentAdminId = row.id
      this.editAdminRoleDialogVisible = true
      // 获取角色列表
      baseService.basePostData(this.rolePath.getPath, {}).then(res => {
        this.roleData = res.data.data.list
      })
      // 获取用户角色
      baseService
        .basePostData(this.adminPath.searchRolePath, {
          userId: this.currentAdminId
        })
        .then(res => {
          this.adminRoleData = res.data.data
        })
    },
    // 用户角色 请求
    submitEditAdminRole() {
      this.editAdminRoleDialogVisible = false
      baseService
        .basePostData(this.adminPath.addRolePath, {
          userId: this.currentAdminId,
          roleIds: this.adminRoleData
        })
        .then(res => {
          let result = res.data
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
          this.getAdminData()
        })
    },
    // 用户菜单
    addAdminMenu(row) {
      this.currentAdminId = row.id
      this.editAdminMenuDialogVisible = true
      // 获取菜单列表
      baseService.basePostData(this.menuPath.getPath, {}).then(res => {
        this.menuList = res.data.data
      })
      // 用户已有菜单
      baseService
        .basePostData(this.adminPath.searchMenuPath, {
          userId: this.currentAdminId
        })
        .then(res => {
          this.adminMenuData = res.data.data
        })
    },
    // 用户菜单请求
    submitEditAdminMenu() {
      this.editAdminMenuDialogVisible = false
      baseService
        .basePostData(this.adminPath.addMenuPath, {
          userId: this.currentAdminId,
          menuIds: this.$refs.tree.getCheckedKeys()
        })
        .then(res => {
          let result = res.data
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
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
      this.pageNum = val
      this.getAdminData()
    }
  }
}
</script>
<style>
.opetion {
  overflow: hidden;
}
</style>

