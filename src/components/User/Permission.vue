<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 操作按钮 -->
    <div class="row ope-container">
      <el-button type="primary" icon="el-icon-refresh" size="small" @click="getPermissionData()">刷新</el-button>
      <el-button type="success" size="small" @click="addPermission()">新增</el-button>
      <Search v-on:search="getPermissionData()"></Search>
    </div>

    <!-- 数据列表 -->
    <div class="row data-container">
      <el-table :data="permissionData" border style="width: 100%" :max-height="tabMaxHeight">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="标识" prop="code">
        </el-table-column>
        <el-table-column label="名称" prop="name">
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime">
        </el-table-column>
        <el-table-column label="更新时间" prop="updateTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="delPermissionItem(scope.row)">
              <i class="el-icon-delete"></i>
            </el-button>
            <el-button type="primary" size="mini" @click="editPermissionItem(scope.row)">
              <i class="el-icon-edit"></i>
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

    <!-- 新增权限弹窗 -->
    <el-dialog title="新增权限" :visible.sync="addPermissionDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="addPermissionData">
        <el-form-item label="标识" prop="code">
          <el-input v-model="addPermissionData.code"></el-input>
        </el-form-item>
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
        <el-form-item label="标识" prop="code">
          <el-input v-model="editPermissionData.code"></el-input>
        </el-form-item>
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
import permissionService from '../../service/permissionService.js'
import menuService from '../../service/menuService.js'

export default {
  name: 'permission',
  data() {
    return {
      // 新增权限弹窗状态
      addPermissionDialogVisible: false,
      // 新增权限数据
      addPermissionData: {
        code: '',
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
        code: '',
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
    //  获取数据
    getPermissionData() {
      permissionService
        .getPermissionData(this.permissionPath.getPath, {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          name: this.searchId
        })
        .then(res => {
          let result = res.data.data
          this.permissionData = result.list
          this.totalSize = result.total
          let clientHieght = document.body.clientHeight
          this.tabMaxHeight = clientHieght - 60 - 30 - 30 - 50 - 50
        })
    },
    //  新增
    addPermission() {
      this.addPermissionData = {
        code: '',
        name: '',
        action: '',
        menuId: '',
        idOnPage: ''
      }
      this.addPermissionDialogVisible = true
      // 获取叶子节点数据
      menuService
        .getAllLeaf(this.menuPath.allLeafPath)
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
      permissionService.addPermissionData(this.permissionPath.getPath, this.addPermissionData).then(res => {
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
      permissionService.delPermissionData(this.permissionPath.delPath, this.delPermissionId).then(res => {
        this.getPermissionData()
      })
    },
    // 编辑
    editPermissionItem(row) {
      this.editPermissionData.id = row.id
      this.editPermissionData.code = row.code
      this.editPermissionData.name = row.name
      this.editPermissionData.action = row.action
      this.editPermissionDialogVisible = true
      // 获取叶子节点数据
      menuService
        .getAllLeaf(this.menuPath.allLeafPath)
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
      permissionService.updatePermissionData(this.permissionPath.editPath, this.editPermissionData).then(res => {
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
<style>
.view-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.breadcrumb-container {
  height: 20px;
}
.ope-container {
  height: 40px;
}
.data-container {
  flex: 1;
  overflow: auto;
  display: flex;
}
.page-container {
  height: 40px;
}
</style>

