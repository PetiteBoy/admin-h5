<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>教育记录列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main-page">
      <div class=" base-search">
        <label for="">
          <span class="label-span">手机号码：</span>
          <el-input size="small" v-model="search.phone" placeholder="请输入手机号码"></el-input>
        </label>
        <label for="">
          <span class="label-span">真实姓名：</span>
          <el-input size="small" v-model="search.realname" placeholder="请输入您的姓名"></el-input>
        </label>
      </div>

      <div class="row senior-search">
        <label for="">
          <span>注册时间范围：</span>
          <el-date-picker size="small" v-model="creatTime" type="daterange" range-separator="" start-placeholder="开始时间" end-placeholder="结束时间" @change="creatTimeChange" value-format="timestamp">
          </el-date-picker>
        </label>

        <div style="float:right;">
          <el-button size="small" type="primary" @click="getData()">搜索</el-button>
          <el-button size="small" type="primary" @click="reset()">重置</el-button>
        </div>
      </div>

      <!-- 数据列表 -->
      <div class="row-data">
        <el-table :data="data" border style="width: 100%" min-height="409">
          <el-table-column label="真实姓名" prop="realname" width="100">
          </el-table-column>
          <el-table-column label="手机号" prop="phone" width="100">
          </el-table-column>
          <el-table-column label="考试批次" prop="batchNum" width="100">
          </el-table-column>
          <el-table-column label="教育类型" prop="eduType" width="100">
            <template slot-scope="scope">
              <div v-if="scope.row.eduType === 'CHECK'">审验教育</div>
            </template>
          </el-table-column>
          <el-table-column label="证件类型" prop="idType" width="100">
            <template slot-scope="scope">
              <div>{{dataIdType[scope.row.idType]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="证件号" prop="idNo">
          </el-table-column>
          <el-table-column label="驾驶证档案编号" prop="licenseNo">
          </el-table-column>
          <el-table-column label="注册时间" prop="createTime" width="96">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="detail(scope.row)">
                查看
              </el-button>
              <el-button type="primary" size="mini" @click="look(scope.row)">
                抓拍
              </el-button>
            </template>
          </el-table-column>s
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class=" page-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.currentPage" :page-sizes="[10, 50]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
        </el-pagination>
      </div>

      <!-- 审核弹窗 -->
      <el-dialog title="抓拍记录" :visible.sync="bgDialogVisible" width="30%" :before-close="handleClose">
        <div v-if="eduRecordBgList.length === 0">暂无数据</div>
        <div else-if>
          <div v-for="item in eduRecordBgList" :key="item" class="piclist">
            <img :src="item.imgUrl" alt="">
          </div>

        </div>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import baseService from '../../service/baseService.js'
import { getSessionStorage } from '../../utils/base.js'
import moment from 'moment'
export default {
  name: '',
  data() {
    return {
      headers: {
        authKey: getSessionStorage('authKey')
      },
      // api列表
      apiPath: {
        get: '/edurecord/page',
        grabrecord: '/edurecord/grabrecord'
      },
      // 列表数据
      data: [],
      // 搜索数据
      search: {
        pageSize: 20,
        pageNum: 1,
        // 手机号
        phone: '',
        //创建开始时间
        createTimeBegin: '',
        // 创建结束时间
        createTimeEnd: '',
        realname: ''
      },
      creatTime: '',
      totalSize: 0,
      eduRecordId: '',
      eduRecordBgList: [],
      bgDialogVisible: false
    }
  },
  computed: {
    typeList() {
      return this.$store.state.data.typeList
    },
    idList() {
      return this.$store.state.data.idList
    },
    licenseList() {
      return this.$store.state.data.licenseList
    },
    auditList() {
      return this.$store.state.data.auditList
    },
    dataIdType() {
      return this.$store.state.data.dataIdType
    },
    dataAuditStatus() {
      return this.$store.state.data.dataAuditStatus
    },
    licenseListone() {
      return this.$store.state.data.licenseListone
    },
    idListone() {
      return this.$store.state.data.idListone
    }
  },
  mounted() {
    // 初始化数据
    this.getData()
  },
  methods: {
    look(row) {
      this.eduRecordId = row.id
      this.getGrabrecord()
      this.bgDialogVisible = true
    },
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 获取列表数据
    getData() {
      baseService
        .basePostData(this.apiPath.get, {
          phone: this.search.phone || null,
          createTimeBegin: this.search.createTimeBegin || null,
          createTimeEnd: this.search.createTimeEnd || null,
          realname: this.search.realname || null,
          pageNum: this.search.pageNum,
          pageSize: this.search.pageSize
        })
        .then(res => {
          let result = res.data
          this.data = result.data.list
          this.totalSize = result.data.total
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
        })
    },
    //
    getGrabrecord() {
      baseService.baseGetData(`${this.apiPath.grabrecord}?eduRecordId=${this.eduRecordId}`).then(res => {
        this.eduRecordBgList = res.data.data
      })
    },
    // 重置
    reset() {
      this.search = {
        // 手机号
        phone: '',
        //创建开始时间
        createTimeBegin: '',
        // 创建结束时间
        createTimeEnd: '',
        realname: ''
      }
      this.creatTime = ''
      this.getData()
    },
    // 查看详情
    detail(row) {
      this.$router.push(`/edu-record-detail?id=${row.id}`)
    },
    handleClose() {
      this.bgDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.search.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.search.pageNum = val
      this.getData()
    },
    creatTimeChange(val) {
      this.search.createTimeBegin = val[0]
      this.search.createTimeEnd = val[1]
    }
  }
}
</script>
<style>
.piclist {
  overflow: hidden;

  margin-top: 5px;
  text-align: center;
}
.piclist img {
  margin: 0 auto;
  width: 240px;
  height: 180px;
  padding: 0;
}
</style>



