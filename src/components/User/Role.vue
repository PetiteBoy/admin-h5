<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main-page">
      <!-- 操作按钮 -->
    <div>
      <el-button type="success" size="small" @click="addRole()">新增</el-button>
      <Search v-on:search="getRoleData()"></Search>
    </div>
    <!-- 数据列表 -->
    <div class="row">
      <el-table :data="roleData" border style="width: 100%">
        <el-table-column label="ID" prop="id" width="50">
        </el-table-column>
        <el-table-column label="名称" prop="name" width="150">
        </el-table-column>
        <el-table-column label="创建时间 " prop="createTime" >
          <template slot-scope="scope">
            <div>{{moment(scope.row.createTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="最近修改时间 " prop="updateTime" >
          <template slot-scope="scope">
            <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作 " width="300">
          <template slot-scope="scope ">

            <el-button type="primary " size="mini " @click="editRoleItem(scope.row) ">
              <i class="el-icon-edit "></i>
            </el-button>
            <el-button type="primary " size="mini " @click="addRolePermission(scope.row) ">权限
            </el-button>
            <el-button type="primary " size="mini " @click="addRoleMenu(scope.row) ">菜单
            </el-button>
            <el-button type="danger " size="mini " @click="delRoleItem(scope.row) ">
              <i class="el-icon-delete "></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页器 -->
    <div class="row">
      <el-pagination @size-change="handleSizeChange " @current-change="handleCurrentChange " :current-page="currentPage " :page-sizes="[10, 20] " :page-size="pageSize " layout="total, sizes, prev, pager, next, jumper " :total="totalSize ">
      </el-pagination>
    </div>
    </div>
    

    <!-- 新增角色弹窗 -->
    <el-dialog title="新增角色" :visible.sync="addRoleDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="120px" :model="addRoleData">
        <el-form-item label="角色标识" prop="code">
          <el-input v-model="addRoleData.code "></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleData.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitAddRole('addRoleData') ">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除角色列表 -->
    <el-dialog title="删除角色 " :visible.sync="delRoleDialogVisible" width="30%" :before-close="handleClose">
      <span>你确定要删除该角色</span>
      <span slot="footer" class="dialog-footer ">
        <el-button size="small" @click="delRoleDialogVisible = false">取 消</el-button>
        <el-button type="danger" size="small" @click="submitDelRole()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色弹窗 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="120px " :model="editRoleData">
        <el-form-item label="标识" prop="code">
          <el-input v-model="editRoleData.code"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="editRoleData.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitEditRole( 'editRoleData') ">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色权限 -->
    <el-dialog title="添加权限" class="edit-role-permission" :visible.sync="editRolePermissionDialogVisible" width="30%" :before-close="handleClose" ref="multipleTable">
      <el-select v-model="rolePermissionData" multiple placeholder="请选择">
        <el-option v-for="item in permissionData" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editRolePermissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitEditRolePermission() ">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色菜单 -->
    <el-dialog title="添加菜单" class="edit-role-permission" :visible.sync="editRoleMenuDialogVisible" width="30%" :before-close="handleClose" ref="multipleTable">
      <el-tree node-key="id" default-expand-all :expand-on-click-node="false" :data="menuList" :props="defaultProps" show-checkbox :default-checked-keys="roleMenuData" ref="tree">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editRoleMenuDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small " @click="submitEditRoleMenu() ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Search from './Commen/Search.vue'
import moment from 'moment'
import baseService from '../../service/baseService.js'
export default {
  name: 'Role',
  data() {
    return {
      // 新增角色弹窗状态
      addRoleDialogVisible: false,
      // 新增角色数据
      addRoleData: {
        code: '',
        name: ''
      },
      //   编辑角色弹窗
      editRoleDialogVisible: false,
      //   编辑角色数据
      editRoleData: {
        id: '',
        code: '',
        name: ''
      },
      //   删除角色弹窗状态
      delRoleDialogVisible: false,
      //删除角色id
      delRoleId: '',
      //页码相关
      currentPage: 1,
      pageSize: 20,
      totalSize: 0,
      // 权限列表
      roleData: [],
      // 表格最大高度
      tabMaxHeight: 0,
      // 当前角色Id
      currentRoleId: '',

      // 角色权限弹窗
      editRolePermissionDialogVisible: false,
      // 权限列表
      permissionData: [],
      // 角色已有权限列表
      rolePermissionData: [],

      //角色菜单弹窗
      editRoleMenuDialogVisible: false,
      // 菜单列表
      menuList: [],
      // 初始化树属性值
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 角色已有菜单
      roleMenuData: [],
      rolePath: {
        getPath: '/role/page',
        addPath: '/role/add',
        delPath: '/role/delete',
        editPath: '/role/update',
        searchPermisssionPath: '/role/authorities',
        addPermisssionPath: '/role/config/authorities',
        searchMenuPath: '/role/menu',
        addMenuPath: '/role/config/menu'
      },
      permissionPath: {
        getPath: '/authority/page'
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
    // 初始化数据
    this.getRoleData()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    //  获取数据
    getRoleData() {
      baseService
        .basePostData(this.rolePath.getPath, {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          name: this.searchId
        })
        .then(res => {
          let result = res.data
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
          this.roleData = result.data.list
          this.totalSize = result.data.total
          let clientHieght = document.body.clientHeight
          this.tabMaxHeight = clientHieght - 60 - 30 - 30 - 50 - 50
        })
    },
    //  新增
    addRole() {
      this.addRoleData = {
        code: '',
        name: ''
      }
      this.addRoleDialogVisible = true
    },
    // 新增请求
    submitAddRole() {
      this.addRoleDialogVisible = false
      baseService.basePostData(this.rolePath.addPath, this.addRoleData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getRoleData()
      })
    },
    // 删除
    delRoleItem(row) {
      this.delRoleDialogVisible = true
      this.delRoleId = row.id
    },
    // 删除请求
    submitDelRole() {
      this.delRoleDialogVisible = false
      baseService.baseGetData(this.rolePath.delPath, this.delRoleId).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getRoleData()
      })
    },
    // 编辑
    editRoleItem(row) {
      this.editRoleData.id = row.id
      this.editRoleData.code = row.code
      this.editRoleData.name = row.name
      this.editRoleDialogVisible = true
    },
    // 编辑请求
    submitEditRole() {
      this.editRoleDialogVisible = false
      baseService.basePostData(this.rolePath.editPath, this.editRoleData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getRoleData()
      })
    },
    // 添加角色权限
    addRolePermission(row) {
      this.currentRoleId = row.id
      this.editRolePermissionDialogVisible = true
      // 获取权限列表
      baseService.basePostData(this.permissionPath.getPath, {}).then(res => {
        this.permissionData = res.data.data.list
      })
      // 获取角色已有权限列表
      baseService
        .basePostData(this.rolePath.searchPermisssionPath, {
          roleId: this.currentRoleId
        })
        .then(res => {
          this.rolePermissionData = res.data.data
        })
    },
    // 添加角色权限请求
    submitEditRolePermission() {
      this.editRolePermissionDialogVisible = false
      baseService
        .basePostData(this.rolePath.addPermisssionPath, {
          roleId: this.currentRoleId,
          authorityIds: this.rolePermissionData
        })
        .then(res => {
          let result = res.data
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
          this.getRoleData()
        })
    },
    // 添加角色菜单
    addRoleMenu(row) {
      this.currentRoleId = row.id
      this.editRoleMenuDialogVisible = true
      // 获取菜单列表
      baseService.basePostData(this.menuPath.getPath, {}).then(res => {
        this.menuList = res.data.data
      })
      // 获取角色已有菜单
      baseService
        .basePostData(this.rolePath.searchMenuPath, {
          roleId: this.currentRoleId
        })
        .then(res => {
          this.roleMenuData = res.data.data
        })
    },
    // 添加角色菜单请求
    submitEditRoleMenu() {
      this.editRoleMenuDialogVisible = false
      baseService
        .basePostData(this.rolePath.addMenuPath, {
          roleId: this.currentRoleId,
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
          this.getRoleData()
        })
    },
    // 关闭弹窗
    handleClose() {
      this.addRoleDialogVisible = false
      this.delRoleDialogVisible = false
      this.editRoleDialogVisible = false
      this.editRolePermissionDialogVisible = false
      this.editRoleMenuDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoleData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getRoleData()
    }
  }
}
</script>


