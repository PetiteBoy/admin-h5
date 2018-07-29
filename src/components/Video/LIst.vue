<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>视频列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main-page">
      <!-- 操作按钮 -->
      <div>
        <el-button type="primary" size="small" @click="addVideo()">新增视频</el-button>
      </div>
      <!-- 数据列表 -->
      <div class="row">
        <el-table :data="videoDate" border style="width: 100%">
          <el-table-column label="ID" prop="id" width="60">
          </el-table-column>
          <el-table-column label="所属分类" prop="categoryName">
          </el-table-column>
          <el-table-column label="视频名称" prop="name">
          </el-table-column>
          <el-table-column label="原始文件名" prop="originName">
          </el-table-column>
          <el-table-column label="视频时长" prop="duration" width="100">
            <template slot-scope="scope">
              <div>{{Math.floor((scope.row.duration/ 3600)%24)}} 时 {{Math.floor((scope.row.duration / 60) % 60)}} 分 {{Math.floor(scope.row.duration % 60) }}秒</div>
            </template>
          </el-table-column>
          <el-table-column label="视频大小" prop="fileSize" width="96">
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="96">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="最近修改时间" prop="updateTime" width="96">
            <template slot-scope="scope">
              <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="editVideoItem(scope.row)">编辑
                </el-button>
                <el-button type="primary" size="mini" @click="detailVideoItem(scope.row)">查看
                </el-button>
              </div>
              <div class="row">
                <el-button type="danger" size="mini" @click="delVideoItem(scope.row)">删除
                </el-button>
              </div>

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

    <!-- 新增视频弹窗 -->
    <el-dialog title="新增视频" class="add-video" :visible.sync="addVideoDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="120px" :model="addVideoData">
        <el-form-item label="视频分类" prop="">
          <el-select v-model="addVideoData.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryData" :key="item.name" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称" prop="">
          <el-input v-model="addVideoData.name"></el-input>
        </el-form-item>
        <el-form-item label="视频简介" prop="">
          <el-input v-model="addVideoData.introduction" type="textarea" rows="7"></el-input>
        </el-form-item>
        <el-form-item label="上传视频" prop="">
          <el-upload action="http://47.95.250.247/admin-api/file/video/upload" accept="video/*" :on-success="handleSuccessVideo" :headers="headers">
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个mp4 文件，且不超过 1G</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频时长" prop="" class="video-druction">
          <el-input v-model="duration.hour" size="small" min='0' max="59" type="number"></el-input> 时
          <el-input v-model="duration.minute" size="small" min='0' max="59" type="number"></el-input> 分
          <el-input v-model="duration.second" size="small" min='0' max="59" type="number"></el-input> 秒
        </el-form-item>
        <el-form-item label="上传缩略图" prop="">
          <el-upload action="http://47.95.250.247/admin-api/file/image/upload" accept="image/*" :headers="headers" :on-success="handleSuccessPic">
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个jpg/png 文件，且不超过 800K，分辨率800*600</div>
          </el-upload>
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
          <el-select v-model="editVideoData.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryData" :key="item.name" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称" prop="name">
          <el-input v-model="editVideoData.name"></el-input>
        </el-form-item>
        <el-form-item label="视频简介" prop="introduction">
          <el-input v-model="editVideoData.introduction" type="textarea" rows="7"></el-input>
        </el-form-item>
        <el-form-item label="上传视频" prop="">
          <el-upload action="http://47.95.250.247/admin-api/file/video/upload" accept="video/*" :on-success="handleSuccessVideoEdit" :headers="headers">
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个mp4 文件，且不超过 1G</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="视频时长" prop="" class="video-druction">
          <el-input v-model="duration.hour" size="small" min='0' max="59" type="number"></el-input> 时
          <el-input v-model="duration.minute" size="small" min='0' max="59" type="number"></el-input> 分
          <el-input v-model="duration.second" size="small" min='0' max="59" type="number"></el-input> 秒
        </el-form-item>
        <el-form-item label="上传缩略图" prop="">
          <el-upload action="http://47.95.250.247/admin-api/file/image/upload" accept="image/*" :headers="headers" :on-success="handleSuccessPicEdit">
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个jpg/png 文件，且不超过 800K，分辨率800*600</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editVideoDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitEditVideo()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除视频弹窗 -->
    <el-dialog title="删除视频" class="add-video" :visible.sync="delVideoDialogVisible" width="30%" :before-close="handleClose">
      <span>你确认要删除该视频？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="delVideoDialogVisible = false">取 消</el-button>
        <el-button type="danger" size="small" @click="submitDelVideo()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseService from '../../service/baseService.js'
import { getSessionStorage } from '../../utils/base.js'
import moment from 'moment'
export default {
  name: 'video-list',
  data() {
    return {
      headers: {
        authKey: getSessionStorage('authKey')
      },
      // 视频列表
      videoDate: [],
      tabMaxHeight: 0,
      //   添加弹窗状态
      addVideoDialogVisible: false,
      //   添加视频数据
      addVideoData: {
        categoryId: '',
        name: '',
        introduction: '',
        videoToken: '',
        thumbToken: '',
        duration: 0
      },
      //   编辑视频弹窗
      editVideoDialogVisible: false,
      //   编辑视频数据
      editVideoData: {
        id: '',
        categoryId: '',
        name: '',
        introduction: '',
        videoToken: '',
        thumbToken: '',
        duration: 0
      },
      duration: {
        hour: 0,
        minute: 0,
        second: 0
      },
      //删除视频弹窗
      delVideoDialogVisible: false,
      //   删除视频ID
      delVideoId: '',
      //   视频分类
      categoryData: [],
      videoPath: {
        getPath: '/video/page',
        addPath: '/video/add',
        editPath: '/video/update',
        delPath: '/video/delete'
      },
      categoryPath: {
        getPath: '/category/video'
      },
      //页码相关
      currentPage: 1,
      pageSize: 20,
      totalSize: 0
    }
  },
  mounted() {
    this.getVideoDate()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    //   获取数据
    getVideoDate() {
      baseService
        .basePostData(this.videoPath.getPath, {
          pageNum: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          let result = res.data
          this.videoDate = result.data.list
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
    //   添加视频
    addVideo() {
      this.addVideoData = {
        categoryId: '',
        name: '',
        introduction: '',
        videoToken: '',
        thumbToken: '',
        duration: 0
      }
      this.duration = {
        hour: 0,
        minute: 0,
        second: 0
      }
      //获取分类列表
      baseService.basePostData(this.categoryPath.getPath).then(res => {
        let result = res.data.data
        this.categoryData = result
      })
      this.addVideoDialogVisible = true
    },
    // 添加视频请求
    submitAddVideo() {
      this.addVideoData.duration = Number(this.duration.hour) * 60 * 60 + Number(this.duration.minute) * 60 + Number(this.duration.second)
      this.addVideoDialogVisible = false
      baseService.basePostData(this.videoPath.addPath, this.addVideoData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getVideoDate()
      })
    },
    //删除视频
    delVideoItem(row) {
      this.delVideoId = row.id
      this.delVideoDialogVisible = true
    },
    // 删除视频请求
    submitDelVideo() {
      this.delVideoDialogVisible = false
      baseService.baseGetData(this.videoPath.delPath, this.delVideoId).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getVideoDate()
      })
    },
    // 编辑视频
    editVideoItem(row) {
      let t = Number(row.duration)
      let h = Math.floor((t / 3600) % 24)
      let m = Math.floor((t / 60) % 60)
      let s = Math.floor(t % 60)
      this.duration.hour = h
      this.duration.minute = m
      this.duration.second = s

      //获取分类列表
      baseService.basePostData(this.categoryPath.getPath).then(res => {
        let result = res.data.data
        this.categoryData = result
      })

      //   编辑视频数据
      this.editVideoData.id = row.id
      this.editVideoData.categoryId = row.categoryId
      this.editVideoData.name = row.name
      this.editVideoData.introduction = row.introduction
      this.editVideoData.duration = row.duration

      this.editVideoDialogVisible = true
    },
    // 编辑视频请求
    submitEditVideo() {
      this.editVideoData.duration = Number(this.duration.hour) * 60 * 60 + Number(this.duration.minute) * 60 + Number(this.duration.second)
      this.editVideoDialogVisible = false
      baseService.basePostData(this.videoPath.editPath, this.editVideoData).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getVideoDate()
      })
    },
    // 查看视频详情
    detailVideoItem(row) {
      this.$router.push(`/video/detail?id=${row.id}`)
    },
    // 关闭弹窗
    handleClose() {
      this.addVideoDialogVisible = false
      this.editVideoDialogVisible = false
      this.delVideoDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.pageSize = val
      this.getVideoDate()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getVideoDate()
    },
    handleSuccessVideo(val) {
      this.addVideoData.videoToken = val.data.token
    },
    handleSuccessPic(val) {
      this.addVideoData.thumbToken = val.data.token
    },
    handleSuccessVideoEdit(val) {
      this.editVideoData.videoToken = val.data.token
    },
    handleSuccessPicEdit(val) {
      this.editVideoData.thumbToken = val.data.token
    }
  }
}
</script>

<style>
.add-video .el-select {
  width: 100%;
}
.view-container .el-upload__tip {
  line-height: 14px;
}
.video-druction .el-input {
  width: 40px;
}
.video-druction .el-input__inner {
  padding: 2px;
}
</style>

