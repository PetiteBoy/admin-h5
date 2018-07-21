<template>
  <div class="view-container">
    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>试题分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 操作按钮 -->
    <div class="row ope-container">
      <!-- <el-button type="success" size="small" @click="addCategory()">新增分类 </el-button> -->
    </div>

    <!-- 数据列表 -->
    <div class="row data-container">
      <el-table :data="categoryDate" border style="width: 100%" :max-height="tabMaxHeight">
        <el-table-column label="ID" prop="id">
        </el-table-column>
        <el-table-column label="分类名称" prop="name">
        </el-table-column>
        <!-- <el-table-column label="创建时间" prop="">
                </el-table-column> -->
        <!-- <el-table-column label="最近修改时间" prop="">
                </el-table-column> -->
        <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="delCategoryItem(scope.row)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="editCategoryItem(scope.row)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                    </template>
                </el-table-column> -->

      </el-table>
    </div>

    <!-- 分页器 -->
    <!-- <div class="row page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
      </el-pagination>
    </div> -->

    <!-- 新增分类弹窗 -->
    <el-dialog title="新增分类" :visible.sync="addCategoryDialogVisible" width="30%" :before-close="handleClose">
      <el-input v-model="addCategoryDate.name" placeholder="请填写分类名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAddCategory()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑分类弹窗 -->
    <el-dialog title="编辑分类" :visible.sync="editCategoryDialogVisible" width="30%" :before-close="handleClose">
      <el-input v-model="editCategoryDate.name" placeholder="请填写分类名称"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editCategoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitEditCategory()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除分类弹窗 -->
    <el-dialog title="删除分类" class="add-video" :visible.sync="delCategoryDialogVisible" width="30%" :before-close="handleClose">
      <span>你确认要删除该分类？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="delCategoryDialogVisible = false">取 消</el-button>
        <el-button type="danger" size="small" @click="submitDelCategory()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseService from '../../service/baseService.js'
export default {
  name: 'video-list',
  data() {
    return {
      // 分类列表
      categoryDate: [],
      tabMaxHeight: 0,
      //   添加弹窗
      addCategoryDialogVisible: false,
      //   添加数据
      addCategoryDate: {
        name: ''
      },
      //   编频弹窗
      editCategoryDialogVisible: false,
      //   编辑数据
      editCategoryDate: {
        name: ''
      },
      //删除弹窗
      delCategoryDialogVisible: false,
      //   删除分类id
      delCategoryId: '',

      //页码相关
      currentPage: 1,
      pageSize: 20,
      totalSize: 0,

      categoryPath: {
        getPath: '/category/question',
        addPath: '',
        editPath: '',
        delPath: ''
      }
    }
  },
  mounted() {
    this.getCategoryData()
  },
  methods: {
    getCategoryData() {
      baseService.basePostData(this.categoryPath.getPath, {}).then(res => {
        let result = res.data.data
        this.categoryDate = result
        this.totalSize = result.total
        let clientHieght = document.body.clientHeight
        this.tabMaxHeight = clientHieght - 60 - 30 - 30 - 50 - 50
      })
    },
    //   添加
    addCategory() {
      this.addCategoryDate = {
        name: ''
      }
      this.addCategoryDialogVisible = true
    },
    // 添加请求
    submitAddCategory() {
      this.addCategoryDialogVisible = false
      baseService.basePostData(this.categoryPath.addPath, this.addCategoryDate).then(res => {
        this.getCategoryData()
      })
    },
    //删除
    delCategoryItem(row) {
      this.delCategoryId = row.id
      this.delCategoryDialogVisible = true
    },
    // 删除请求
    submitDelCategory() {
      this.delCategoryDialogVisible = false
      baseService.baseGetData(this.categoryPath.delPath, this.delCategoryId).then(res => {
        this.getCategoryData()
      })
    },
    // 编辑
    editCategoryItem(row) {
      this.editCategoryDate.name = row.name
      this.editCategoryDialogVisible = true
    },
    // 编辑请求
    submitEditCategory() {
      this.editCategoryDialogVisible = false
      BaseService.basePostData(this.categoryPath.editPath, this.editCategoryDate).then(res => {
        this.getCategoryData()
      })
    },
    // 关闭弹窗
    handleClose() {
      this.addCategoryDialogVisible = false
      this.editCategoryDialogVisible = false
      this.delCategoryDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.pageSize = val
      this.getCategoryData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCategoryData()
    }
  }
}
</script>

<style>
.add-video .el-select {
  width: 100%;
}
</style>

