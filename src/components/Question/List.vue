<template>
    <div class="view-container">
        <!--面包屑导航-->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>试题管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="row ope-container">
            <div class="row base-search">
                <el-input size="small" v-model="search.id" placeholder="请输入用户id"></el-input>
            </div>
        </div>
    </div>
</template>

<script>
import baseService from '../../service/baseService.js'
export default {
  name: '',
  data() {
    return {
      // api列表
      apiPath: {
        get: '/driver/page',
        add: '',
        edit: '/driver/audit',
        del: '/driver/ops/black'
      },
      // 列表数据
      data: [],
      //   搜索数据
      search: {
        id: ''
      }
    }
  }
}
</script>
