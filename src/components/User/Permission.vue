<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main-page">
      <!-- 操作按钮 -->
      <div>
        <el-button type="success" size="small" @click="addPermission()">新增</el-button>
        <Search v-on:search="getPermissionData()"></Search>
      </div>

      <!-- 数据列表 -->
      <div class="row">
        <el-table :data="permissionData" border style="width: 100%">
          <el-table-column label="ID" prop="id" width="50">
          </el-table-column>
          <el-table-column label="名称" prop="name" width="150">
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" prop="updateTime">
            <template slot-scope="scope">
              <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">

              <el-button type="primary" size="mini" @click="editPermissionItem(scope.row)">
                编辑
              </el-button>
              <el-button type="danger" size="mini" @click="delPermissionItem(scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 分页器 -->
      <div class="row">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
        </el-pagination>
      </div>
    </div>

    <!-- 新增权限弹窗 -->
    <el-dialog title="新增权限" :visible.sync="addPermissionDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="addPermissionData">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addPermissionData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="action">
          <el-input v-model="addPermissionData.action"></el-input>
        </el-form-item>
        <el-form-item label="所属页面" prop="menuId">
          <el-select v-model="addPermissionData.menuId" placeholder="请选择">
            <el-option v-for="item in allLeafData" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属按钮" prop="idOnPage">
          <el-input v-model="addPermissionData.idOnPage"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addPermissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAddPermission()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除权限列表 -->
    <el-dialog title="删除权限" :visible.sync="delPermissionDialogVisible" width="30%" :before-close="handleClose">
      <span>你确定要删除该权限</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="delPermissionDialogVisible = false">取 消</el-button>
        <el-button type="danger" size="small" @click="submitDelPermission()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑权限弹窗 -->
    <el-dialog title="编辑权限" :visible.sync="editPermissionDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="editPermissionData">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editPermissionData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="action">
          <el-input v-model="editPermissionData.action"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editPermissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitEditPermission()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import Search from './Commen/Search.vue'
import { apiStatusFn } from '../../utils/base.js'
import baseService from '../../service/baseService.js'
import moment from 'moment'

export default {
  name: 'permission',
  data() {
    return {
      // 新增权限弹窗状态
      addPermissionDialogVisible: false,
      // 新增权限数据
      addPermissionData: {
        name: '',
        action: '',
        menuId: '',
        idOnPage: ''
      },
      //  删除权限弹窗状态
      delPermissionDialogVisible: false,
      // 删除权限id
      delPermissionId: 0,
      //  编辑权限弹窗
      editPermissionDialogVisible: false,
      //  编辑权限
      editPermissionData: {
        id: '',
        name: '',
        action: ''
      },
      //页码相关
      currentPage: 1,
      pageSize: 20,
      totalSize: 0,
      // 权限列表
      permissionData: [],
      // 子目录列表
      allLeafData: [],
      // 表格最大高度
      tabMaxHeight: 0,
      permissionPath: {
        getPath: '/authority/page',
        addPath: '/authority/add',
        editPath: '/authority/update',
        delPath: '/authority/delete'
      },
      menuPath: {
        allLeafPath: '/menu/all-leaf'
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
    this.getPermissionData()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    //  获取数据
    getPermissionData() {
      baseService
        .basePostData(this.permissionPath.getPath, {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          name: this.searchId
        })
        .then(res => {
          let result = res.data
          this.permissionData = result.data.list
          this.totalSize = result.data.total
          let clientHieght = document.body.clientHeight
          this.tabMaxHeight = clientHieght - 60 - 30 - 30 - 50 - 50
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
        })
    },
    //  新增
    addPermission() {
      this.addPermissionData = {
        name: '',
        action: '',
        menuId: '',
        idOnPage: ''
      }
      this.addPermissionDialogVisible = true
      // 获取叶子节点数据
      baseService
        .basePostData(this.menuPath.allLeafPath)
        .then(res => {
          let result = res.data.data
          this.allLeafData = result
        })
        .catch(err => {
          throw err
        })
    },
    // 新增请求
    submitAddPermission(formName) {
      this.addPermissionDialogVisible = false
      baseService.basePostData(this.permissionPath.addPath, this.addPermissionData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getPermissionData()
      })
    },
    // 删除
    delPermissionItem(row) {
      this.delPermissionId = row.id
      this.delPermissionDialogVisible = true
    },
    // 删除请求
    submitDelPermission() {
      this.delPermissionDialogVisible = false
      baseService.baseGetData(this.permissionPath.delPath, this.delPermissionId).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getPermissionData()
      })
    },
    // 编辑
    editPermissionItem(row) {
      this.editPermissionData.id = row.id
      this.editPermissionData.name = row.name
      this.editPermissionData.action = row.action
      this.editPermissionDialogVisible = true
      // 获取叶子节点数据
      baseService
        .basePostData(this.menuPath.allLeafPath)
        .then(res => {
          let result = res.data.data
          this.allLeafData = result
        })
        .catch(err => {
          throw err
        })
    },
    // 编辑请求
    submitEditPermission() {
      this.editPermissionDialogVisible = false
      baseService.basePostData(this.permissionPath.editPath, this.editPermissionData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getPermissionData()
      })
    },
    // 关闭弹窗
    handleClose() {
      this.addPermissionDialogVisible = false
      this.delPermissionDialogVisible = false
      this.editPermissionDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.pageSize = val
      this.getPermissionData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPermissionData()
    }
  }
}
</script>

