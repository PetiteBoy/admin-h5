<template>
    <div>
        <div class="row breadcrumb-container">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path:'/question/list'}">题目列表</el-breadcrumb-item>
                <el-breadcrumb-item>题目详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="row main-page">
            <el-form ref="form" label-width="200px">
                <el-form-item label="题目id：">
                    <div>{{data.id}}</div>
                </el-form-item>
                <el-form-item label="题目分类：">
                    <div>{{data.categoryName}}</div>
                </el-form-item>
                <el-form-item label="题目类型：">
                    <div>{{data.type}}</div>
                </el-form-item>
                <el-form-item label="题目题干：">
                    <div>{{data.question}}</div>
                </el-form-item>
                <el-form-item label="题目选项A：">
                    <div>{{data.item1}}</div>
                </el-form-item>
                <el-form-item label="题目选项B：">
                    <div>{{data.item2}}</div>
                </el-form-item>
                <el-form-item label="题目选项C：" v-if="data.item3">
                    <div>{{data.item3}}</div>
                </el-form-item>
                <el-form-item label="题目选项D：" v-if="data.item4">
                    <div>{{data.item4}}</div>
                </el-form-item>
                <el-form-item label="正确答案：">
                    <div>{{data.answer}}</div>
                </el-form-item>
                <el-form-item label="题目详解：">
                    <div>{{data.explains}}</div>
                </el-form-item>
                <el-form-item label="缩略图：" v-if="data.url">
                    <img :src="data.url" alt="">
                </el-form-item>
                <el-form-item label="添加时间：">
                    <div>{{moment(data.createTime)}}</div>
                </el-form-item>
                <el-form-item label="最近修改时间：">
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
        detail: '/question/find-by-id'
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
