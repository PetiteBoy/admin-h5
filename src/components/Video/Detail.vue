<template>
    <div class="video-detail">
        <!--面包屑导航-->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/video/list'}">视频列表</el-breadcrumb-item>
                <el-breadcrumb-item>视频详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="row main-page">
            <el-form ref="form" label-width="150px" label-position="left">
                <el-form-item label="视频id">
                    <div>{{data.id}}</div>
                </el-form-item>
                <el-form-item label="所属分类">
                    <div>{{data.categoryName}}</div>
                </el-form-item>
                <el-form-item label="视频名称">
                    <div>{{data.name}}</div>
                </el-form-item>
                <el-form-item label="视频文件名">
                    <div>{{data.originName}}</div>
                </el-form-item>
                <el-form-item label="文件大小">
                    <div>{{data.fileSize}}</div>
                </el-form-item>
                <el-form-item label="视频时长">
                    <div>{{Math.floor((data.duration/ 3600)%24)}} 时 {{Math.floor((data.duration / 60) % 60)}} 分 {{Math.floor(data.duration % 60) }}秒</div>
                </el-form-item>
                <el-form-item label="缩略图">
                    <img :src="data.thumbUrl" alt="">
                </el-form-item>
                <el-form-item label="视频预览">
                    <video :src="data.url" controls></video>
                </el-form-item>
                <el-form-item label="添加时间">
                    <div>{{moment(data.updateTime)}}</div>
                </el-form-item>
                <el-form-item label="最近修改时间">
                    <div v-if="data.updateTime">{{moment(data.updateTime)}}</div>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>
<script>
import moment from 'moment'
import baseService from '../../service/baseService.js'
export default {
  data() {
    return {
      data: {},
      path: {
        detail: '/video/find-by-id'
      }
    }
  },
  computed: {
    dataAuditStatus() {
      return this.$store.state.data.dataAuditStatus
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    getData() {
      let id = this.$route.query.id
      baseService.baseGetData(this.path.detail, id).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.data = res.data.data
      })
    }
  }
}
</script>
<style>
.video-detail .el-form-item img {
  width: 100px;
  height: 80px;
}
.video-detail .el-form-item video {
  width: 200px;
  height: 160px;
}
</style>



