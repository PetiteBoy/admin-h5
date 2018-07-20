<template>
    <div class="view-container">
        <!--面包屑导航-->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>视频分类</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 操作按钮 -->
        <div class="row ope-container">
            <el-button type="success" size="small" @click="addCategory()">新增分类 </el-button>
        </div>

        <!-- 数据列表 -->
        <div class="row data-container">
            <el-table :data="categoryDate" border style="width: 100%" :max-height="tabMaxHeight">
                <el-table-column label="ID" prop="">
                </el-table-column>

                <el-table-column label="分类名称" prop="">
                </el-table-column>
                <el-table-column label="创建时间" prop="">
                </el-table-column>
                <el-table-column label="最近修改时间" prop="">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="delCategoryItem(scope.row)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="editCategoryItem(scope.row)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

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
export default {
  name: 'video-list',
  data() {
    return {
      // 分类列表
      categoryDate: [''],
      tabMaxHeight: 300,

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
      delCategoryDialogVisible: false
    }
  },
  methods: {
    //   添加
    addCategory() {
      this.addCategoryDialogVisible = true
    },
    // 添加请求
    submitAddCategory() {},
    //删除
    delCategoryItem() {
      this.delCategoryDialogVisible = true
    },
    // 删除请求
    submitDelCategory() {},
    // 编辑
    editCategoryItem() {
      this.editCategoryDialogVisible = true
    },
    // 编辑请求
    submitEditCategory() {},
    // 关闭弹窗
    handleClose() {
      this.addCategoryDialogVisible = false
      this.editCategoryDialogVisible = false
      this.delCategoryDialogVisible = false
    }
  }
}
</script>

<style>
.add-video .el-select {
  width: 100%;
}
</style>

