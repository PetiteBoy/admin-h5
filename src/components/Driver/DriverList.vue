<template>
    <div class="view-container">

        <!-- 面包屑导航 -->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>驾驶员列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 操作按钮 -->
        <div class="row ope-container">
            <div class="base-search">
                <el-input></el-input>
            </div>
            <div class="advanced-search"></div>
            <div class="base-btns"></div>
        </div>

        <!-- 数据列表 -->
        <div class="row data-container"></div>

        <!-- 分页器 -->
        <div class="row page-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
            </el-pagination>
        </div>
    </div>
</template>


<script>
export default {
  name: 'driver-list',
  data() {
    return {
      //页码相关
      currentPage: 1,
      pageSize: 20,
      totalSize: 0,
      //   搜索相关
      search: {
        id: '',
        phone: '',
        auditStatus: false,
        idType: '',
        idNo: '',
        licenseType: '',
        licenseNo: '',
        licenseTime: '',
        auditTime: ''
      },
      // 数据相关
      driverListData: []
    }
  },
  methods: {
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>
