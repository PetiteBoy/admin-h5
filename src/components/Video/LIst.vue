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
          <el-table-column label="视频时长" prop="duration" width="80">
            <template slot-scope="scope">
              <div>{{timer(scope.row.duration)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="视频大小" prop="fileSize" width="70">
            <template slot-scope="scope">
              <div>{{(Number(scope.row.fileSize)/1000/1000).toFixed(2)}}M</div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="96">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="最近修改时间" prop="updateTime" width="96">
            <template slot-scope="scope">
              <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
              <div v-if="!scope.row.updateTime">-</div>
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
      <el-form label-position="right" label-width="120px" :model="addVideoData" :rules="addRules" ref="addFrom">
        <el-form-item label="视频分类：" prop="categoryId">
          <el-select v-model="addVideoData.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryData" :key="item.name" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称：" prop="name">
          <el-input v-model="addVideoData.name" placeholder="请输入视频名称"></el-input>
        </el-form-item>
        <el-form-item label="视频简介：" prop="introduction">
          <el-input v-model="addVideoData.introduction" type="textarea" placeholder="请输入视频简介" rows="7"></el-input>
        </el-form-item>
        <el-form-item label="上传视频：" prop="videoToken">
          <el-upload :action="upload.video" :on-error="handleErrVideo" accept="video/*" :disabled="uploading" :before-upload="handlePreviewVideo" :on-success="handleSuccessVideo" :headers="headers">
            <el-button size="small" type="primary" :loading="uploading">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个mp4 文件，且不超过 1G</div>
          </el-upload>
          <video :src="videoUrl" controls v-if="videoUrl" id="addVideoTime" preload autoplay></video>
        </el-form-item>
        <el-form-item label="视频时长：" prop="duration" class="video-druction">
          <el-input v-model="addVideoData.duration" size="small" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="上传缩略图：" prop="thumbToken">
          <el-upload :action="upload.pic" accept="image/*" :headers="headers" :on-success="handleSuccessPic">
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个jpg/png 文件，且不超过 800K，分辨率800*600</div>
          </el-upload>
          <img :src="imgUrl" alt="" class="pic-1" v-if="imgUrl">
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addVideoDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAddVideo('addFrom')">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑视频弹窗 -->
    <el-dialog title="编辑视频" class="add-video" :visible.sync="editVideoDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="right" label-width="120px" :model="editVideoData" :rules="addRules" ref="editFrom">
        <el-form-item label="视频分类：" prop="">
          <el-select v-model="editVideoData.categoryId" placeholder="请选择">
            <el-option v-for="item in categoryData" :key="item.name" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视频名称：" prop="name">
          <el-input v-model="editVideoData.name" placeholder="请输入视频名称"></el-input>
        </el-form-item>
        <el-form-item label="视频简介： " prop="introduction">
          <el-input v-model="editVideoData.introduction" type="textarea" placeholder="请输入视频简介" rows="7"></el-input>
        </el-form-item>
        <el-form-item label="上传视频" prop="">
          <el-upload :action="upload.video" :on-error="handleErrVideo" :before-upload="handlePreviewVideo" :disabled="uploading" accept="video/*" :on-success="handleSuccessVideoEdit" :headers="headers">
            <el-button size="small" type="primary" :loading="uploading" :disabled="uploading">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个mp4 文件，且不超过 1G</div>
          </el-upload>
          <video :src="videoUrledit" controls v-if="videoUrledit" id="editVideoTime" autoplay preload></video>
        </el-form-item>
        <el-form-item label="视频时长" prop="duration" class="video-druction">
          <el-input v-model="editVideoData.duration" size="small" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="上传缩略图" prop="">
          <el-upload :action="upload.pic" accept="image/*" :headers="headers" :on-success="handleSuccessPicEdit">
            <el-button size="small" type="primary">上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传单个jpg/png 文件，且不超过 800K，分辨率800*600</div>
          </el-upload>
          <img :src="imgUrl" alt="" class="pic-1" v-if="imgUrl">
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editVideoDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitEditVideo('editFrom')">确 定</el-button>
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
import config from '../../config.json'
export default {
  name: 'video-list',
  data() {
    return {
      headers: {
        authKey: getSessionStorage('authKey')
      },
      upload: {
        pic: `${config.service.host}/file/image/upload`,
        video: `${config.service.host}/file/video/upload`
      },
      imgUrl: '',
      videoUrl: '',
      videoUrledit:'',
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
      addRules: {
        categoryId: [{ required: true, message: '请选择视频分类', trigger: 'change' }],
        name: [{ required: true, message: '请输入视频名称', trigger: 'blur' }],
        introduction: [{ required: true, message: '请输入视频简介', trigger: 'blur' }],
        videoToken: [{ required: true, message: '请上传视频', trigger: 'blur' }],
        thumbToken: [{ required: true, message: '请上传图片', trigger: 'blur' }],
        duration: [{ required: true, message: '请输入视频时长', trigger: 'change' }]
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
      totalSize: 0,
      uploading: false
    }
  },
  mounted() {
    this.getVideoDate()
  },
  methods: {
    timer(time) {
      let h = Math.floor((time / 3600) % 24) < 10 ? '0' + Math.floor((time / 3600) % 24) : Math.floor((time / 3600) % 24)
      let m = Math.floor((time / 60) % 60) < 10 ? '0' + Math.floor((time / 60) % 60) : Math.floor((time / 60) % 60)
      let s = Math.floor(time % 60) < 10 ? '0' + Math.floor(time % 60) : Math.floor(time % 60)
      return `${h}:${m}:${s}`
    },
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
      this.imgUrl = ''
      this.videoUrl = ''
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
    submitAddVideo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          baseService.basePostData(this.videoPath.addPath, this.addVideoData).then(res => {
            let result = res.data
            if (result.status !== '0x0000') {
              this.$message({
                message: result.message,
                type: 'warning'
              })
            } else {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.addVideoDialogVisible = false
            }
            this.getVideoDate()
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
      this.uploading = false
      this.imgUrl = ''
      this.videoUrledit = ''

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
      this.imgUrl = row.thumbUrl
      this.videoUrledit = row.url

      this.editVideoDialogVisible = true
    },
    // 编辑视频请求
    submitEditVideo(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          baseService.basePostData(this.videoPath.editPath, this.editVideoData).then(res => {
            let result = res.data
            if (result.status !== '0x0000') {
              this.$message({
                message: result.message,
                type: 'warning'
              })
            } else {
              this.editVideoDialogVisible = false
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
            }
            this.getVideoDate()
          })
        } else {
          console.log('error submit!!')
          return false
        }
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
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.uploading = false
      this.addVideoData.videoToken = val.data.token
      this.videoUrl = val.data.url
      let _this = this
      setTimeout(() => {
        let addVideoTime = document.getElementById('addVideoTime')
        addVideoTime.oncanplay = function() {
          _this.addVideoData.duration = parseInt(addVideoTime.duration)
        } 
      }, 100)
    },
    handleSuccessPic(val) {
      this.addVideoData.thumbToken = val.data.token
      this.imgUrl = val.data.url
    },
    handleSuccessVideoEdit(val) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.uploading = false
      this.editVideoData.videoToken = val.data.token
      this.videoUrledit = val.data.url
      let _this = this
      setTimeout(() => {
        let editVideoTime = document.getElementById('editVideoTime')
        editVideoTime.oncanplay = function() {
          _this.editVideoData.duration = parseInt(editVideoTime.duration)
          console.log(editVideoTime.duration)
        } 
      }, 100)
    },
    handleSuccessPicEdit(val) {
      this.editVideoData.thumbToken = val.data.token
      this.imgUrl = val.data.url
    },
    handleErrVideo(err, file, fileList) {
      this.uploading = false
      console.log(err, file, fileList)
      this.$message({
        message: '上传失败，请重新上传',
        type: 'warning'
      })
    },
    handlePreviewVideo(file) {
      console.log(file)
      this.uploading = true
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
video {
  width: 200px;
}
.pic-1 {
  width: 200px;
}
</style>

