<template>
    <div class="view-container">
        <!--面包屑导航-->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item>审验教育考试公告设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="main-page">
            <div>
                <label for="">
                    <span>公告标题：</span>
                    <el-input v-model="data.title"></el-input>
                </label>
            </div>
            <div class="row">
                <label for="">
                    <span>公告内容：</span>
                    <el-input v-model="data.content" type="textarea" rows="10"></el-input>
                </label>
            </div>
            <div class="row">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
            </div>
        </div>
    </div>

</template>
<script>
import baseService from '../../service/baseService.js'
export default {
  name: 'notice',
  data() {
    return {
      data: {
        title: '',
        content: ''
      },
      checkPath: {
        getPath: '/notice/find/checkquestion',
        savePath: '/notice/config/checkquestion'
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
        if (result) {
          this.data.title = result.data.title
          this.data.content = result.data.content
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
        }
      })
    },
    submitForm() {
      if (this.data.title && this.data.content) {
        baseService.basePostData(this.checkPath.savePath, this.data).then(res => {
          let result = res.data
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          } else {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
          }
          this.getData()
        })
      } else {
        this.$message({
          message: '请输入标题和内容',
          type: 'warning'
        })
      }
    }
  }
}
</script>
