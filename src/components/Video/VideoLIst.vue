<template>
    <div class="view-container">

        <!--面包屑导航-->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>视频列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 操作按钮 -->
        <div class="row ope-container">
            <el-button type="success" size="small" @click="addVideo()">新增视频</el-button>
        </div>

        <!-- 数据列表 -->
        <div class="row data-container">
            <el-table :data="videoDate" border style="width: 100%" :max-height="tabMaxHeight">
                <el-table-column label="ID" prop="">
                </el-table-column>
                <el-table-column label="所属分类" prop="">
                </el-table-column>
                <el-table-column label="视频名称" prop="">
                </el-table-column>
                <el-table-column label="原始文件名" prop="">
                </el-table-column>
                <el-table-column label="视频时长" prop="">
                </el-table-column>
                <el-table-column label="视频大小" prop="">
                </el-table-column>
                <el-table-column label="创建时间" prop="">
                </el-table-column>
                <el-table-column label="最近修改时间" prop="">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="danger" size="mini" @click="delVideoItem(scope.row)">
                            <i class="el-icon-delete"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="editVideoItem(scope.row)">
                            <i class="el-icon-edit"></i>
                        </el-button>
                        <el-button type="primary" size="mini" @click="detailVideoItem(scope.row)">
                            <i class="el-icon-tickets"></i>
                        </el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <!-- 新增视频弹窗 -->
        <el-dialog title="新增视频" class="add-video" :visible.sync="addVideoDialogVisible" width="30%" :before-close="handleClose">
            <el-form label-position="left" label-width="80px" :model="addVideoData">
                <el-form-item label="视频分类" prop="">
                    <el-select v-model="addVideoData.category" placeholder="请选择">
                        <el-option v-for="item in categoryData" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频名称" prop="">
                    <el-input v-model="addVideoData.name"></el-input>
                </el-form-item>
                <el-form-item label="视频简介" prop="">
                    <el-input v-model="addVideoData.sub"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="addVideoDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitAddVideo()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑视频弹窗 -->
        <el-dialog title="编辑视频" class="add-video" :visible.sync="editVideoDialogVisible" width="30%" :before-close="handleClose">
            <el-form label-position="left" label-width="80px" :model="editVideoData">
                <el-form-item label="视频分类" prop="">
                    <el-select v-model="editVideoData.category" placeholder="请选择">
                        <el-option v-for="item in categoryData" :key="item.name" :label="item.name" :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="视频名称" prop="">
                    <el-input v-model="editVideoData.name"></el-input>
                </el-form-item>
                <el-form-item label="视频简介" prop="">
                    <el-input v-model="editVideoData.sub"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="editVideoDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitEditVideo()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除视频弹窗 -->
        <el-dialog title="编辑视频" class="add-video" :visible.sync="delVideoDialogVisible" width="30%" :before-close="handleClose">
            <span>你确认要删除该视频？</span>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="delVideoDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitDelVideo()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'video-list',
  data() {
    return {
      // 视频列表
      videoDate: [''],
      tabMaxHeight: 300,

      //   添加弹窗状态
      addVideoDialogVisible: false,
      //   添加视频数据
      addVideoData: {
        category: '',
        name: '',
        sub: ''
      },
      //   编辑视频弹窗
      editVideoDialogVisible: false,
      //   编辑视频数据
      editVideoData: {
        category: '',
        name: '',
        sub: ''
      },
      //删除视频弹窗
      delVideoDialogVisible: false,
      //   视频分类
      categoryData: [
        {
          name: '1'
        }
      ]
    }
  },
  methods: {
    //   获取数据
    getVideoDate() {
      this.$store
    },
    //   添加视频
    addVideo() {
      this.addVideoDialogVisible = true
    },
    // 添加视频请求
    submitAddVideo() {},
    //删除视频
    delVideoItem() {
      this.delVideoDialogVisible = true
    },
    // 删除视频请求
    submitDelVideo() {},
    // 编辑视频
    editVideoItem() {
      this.editVideoDialogVisible = true
    },
    // 编辑视频请求
    submitEditVideo() {},
    // 查看视频详情
    detailVideoItem() {
      this.$router.push('/video/detail')
    },
    // 关闭弹窗
    handleClose() {
      this.addVideoDialogVisible = false
      this.editVideoDialogVisible = false
      this.delVideoDialogVisible = false
    }
  }
}
</script>

<style>
.add-video .el-select {
  width: 100%;
}
</style>

