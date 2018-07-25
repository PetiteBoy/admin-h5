<template>
  <div class="view-container">
    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审验教育视频学习设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="row main-container">
      <el-form ref="ruleForm" label-width="250px" class="demo-ruleForm">
        <el-form-item v-for="(item,index) in data" :key="item.categoryId" :label="item.categoryName">
          <el-input v-model="data[index].learnNum" :disabled="!item.videoNum" placeholder="分类视频数量">
            <template slot="append">该分类共有{{item.videoNum || 0}}个视频</template>
          </el-input>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import baseService from '../../service/baseService.js'
export default {
  name: 'check-config',
  data() {
    return {
      data: [],
      checkPath: {
        getPath: '/video/config/check',
        savePath: '/video/config/check/setting'
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      baseService.baseGetData(this.checkPath.getPath, '').then(res => {
        let result = res.data
        if (result.status === '0x0000') {
          result.data.forEach(item => {
            this.data.push({
              categoryId: item.categoryId,
              learnNum: item.learnNum,
              videoNum: item.videoNum,
              id: item.id,
              categoryName: item.categoryName
            })
          })
        } else {
          this.$message({
            showClose: true,
            message: result.message,
            type: 'warning'
          })
        }

        console.log(result)
      })
    },
    submitForm() {
      baseService.basePostData(this.checkPath.savePath, this.data).then(res => {
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            showClose: true,
            message: result.message,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style>
.main-container .el-form {
  width: 600px;
}
</style>

