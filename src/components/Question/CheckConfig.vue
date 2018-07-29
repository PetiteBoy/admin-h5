<template>
  <div class="view-container">
    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审验教育考试设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="row main-page">
      <el-form :model="ruleForm" ref="ruleForm" label-width="250px" class="demo-ruleForm">
        <el-form-item label="总题目数" prop="totalNum">
          <el-input v-model="ruleForm.totalNum"  placeholder="总题目数">
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="合格题数" prop="">
          <el-input disabled>
            <template slot="append">个</template>
          </el-input>
        </el-form-item>
        <el-form-item label="考试时间" prop="period">
          <el-input v-model="ruleForm.period" placeholder="考试时间">
            <template slot="append">分</template>
          </el-input>
        </el-form-item>
        <el-form-item v-for="(item,index) in ruleForm.detail" :key="item.categoryId" :label="item.categoryName">
          <el-input v-model="ruleForm.detail[index].learnNum" :disabled="!item.questionNum" placeholder="分类题目数">
            <template slot="append">共{{item.questionNum || 0}}个</template>
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
      ruleForm: {
        id: '',
        totalNum: 0,
        period: '',
        detail: []
      },
      checkPath: {
        getPath: '/question/config/check',
        savePath: '/question/config/check/setting'
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.ruleForm = {
        id: '',
        totalNum: 0,
        period: '',
        detail: []
      }
      baseService.baseGetData(this.checkPath.getPath, '').then(res => {
        let result = res.data
        this.ruleForm.id = result.data.id
        this.ruleForm.totalNum = result.data.totalNum
        this.ruleForm.period = result.data.period
        result.data.detail.forEach(item => {
          this.ruleForm.detail.push({
            categoryName: item.categoryName,
            categoryId: item.categoryId,
            learnNum: item.learnNum,
            id: item.id,
            questionNum: item.questionNum
          })
        })

        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
      })
    },
    submitForm() {
      let sum = 0
      this.ruleForm.detail.forEach(item => {
        sum += Number(item.learnNum)
      })
      if (sum === Number(this.ruleForm.totalNum)) {
        baseService.basePostData(this.checkPath.savePath, this.ruleForm).then(res => {
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
          message: '请检查你的分类题目数目',
          type: 'warning'
        })
      }
    }
  }
}
</script>
<style>
.main-page .el-form {
  width: 600px;
}
</style>

