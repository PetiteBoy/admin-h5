<template>
    <div class="view-container">
        <div class="row breadcrumb-container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/driver/list'}">驾驶人列表</el-breadcrumb-item>
                <el-breadcrumb-item>驾驶人详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="row main-page">
            <el-form ref="form" label-width="200px" label-position="right">
                <el-form-item label="用户id：">
                    <div>{{data.id}}</div>
                </el-form-item>
                <el-form-item label="真实姓名：">
                    <div>{{data.realname}}</div>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <div>{{data.phone}}</div>
                </el-form-item>
                <el-form-item label="证件类型：">
                    <div>{{dataIdType[data.idType]}}</div>
                </el-form-item>
                <el-form-item label="证件号码：">
                    <div>{{data.idNo}}</div>
                </el-form-item>
                <el-form-item label="证件图片：">
                    <img :src="data.idCardImgUrl" alt="" class="pic" style="margin:0px;">
                </el-form-item>
                <el-form-item label="驾驶人本人头像：">
                    <img :src="data.headUrl" alt="" class="pic" style="margin:0px;">
                </el-form-item>
                <el-form-item label="准驾车型：">
                    <div>{{data.licenseType}}</div>
                </el-form-item>
                <el-form-item label="驾驶证档案编号：">
                    <div>{{data.licenseNo}}</div>
                </el-form-item>
                <el-form-item label="驾驶证有效期限：">
                    <div>{{moment(data.licenseBeginDate)}} --- {{moment(data.licenseEndDate)}}</div>
                </el-form-item>
                <el-form-item label="注册时间：">
                    <div>{{moment(data.createTime)}}</div>
                </el-form-item>
                <el-form-item label="最近修改时间：">
                    <div v-if="data.updateTime">{{moment(data.updateTime)}}</div>
                </el-form-item>
                <el-form-item label="审验状态：">
                    <div>{{dataAuditStatus[data.auditState]}}</div>
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
        detail: '/driver/find-by-id'
      }
    }
  },
  computed: {
    dataAuditStatus() {
      return this.$store.state.data.dataAuditStatus
    },
    dataIdType() {
      return this.$store.state.data.dataIdType
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
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
