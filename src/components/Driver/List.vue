<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 操作按钮 -->
    <div class="row ope-container">
      <div class="row base-search">
        <el-input size="small" v-model="search.id" placeholder="请输入用户id"></el-input>
        <el-input size="small" v-model="search.phone" placeholder="请输入手机号"></el-input>
        <el-select size="small" v-model="search.disabled" placeholder="请选择">
          <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.val">
          </el-option>
        </el-select>
        <el-select size="small" v-model="search.auditState" placeholder="用户审核状态">
          <el-option v-for="(item, index) in auditList" :key="index" :label="item.name" :value="item.val">
          </el-option>
        </el-select>
        <el-button size="small" type="primary" @click="getData()">搜索</el-button>
        <el-button size="small" type="primary" @click="reset()">重置</el-button>
        <el-button size="small" type="primary" @click="add()">添加</el-button>
      </div>
      <div class="row senior-search">
        <el-select size="small" v-model="search.idType" placeholder="用户证件类型">
          <el-option v-for="(item, index) in idList" :key="index" :label="item.name" :value="item.val">
          </el-option>
        </el-select>
        <el-input size="small" v-model="search.idNo" placeholder="请输入证件号"></el-input>
        <el-select size="small" v-model="search.licenseType" placeholder="用户驾驶证类型">
          <el-option v-for="(item, index) in licenseList" :key="index" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-input size="small" v-model="search.licenseNo" placeholder="请输入驾驶证号"></el-input>
      </div>
      <div class="row">
        <el-date-picker size="small" v-model="creatTime" type="daterange" range-separator="" start-placeholder="请选择注册时间范围" end-placeholder="" @change="creatTimeChange" value-format="timestamp">
        </el-date-picker>
        <el-date-picker size="small" v-model="auditTime" type="daterange" range-separator="" start-placeholder="请选择审核时间范围" end-placeholder="" @change="auditTimeChange" value-format="timestamp">
        </el-date-picker>
      </div>

    </div>

    <!-- 数据列表 -->
    <div class="row data-container">
      <el-table :data="data" border style="width: 100%" :max-height="tabMaxHeight">
        <el-table-column label="用户id" prop="id">
        </el-table-column>
        <el-table-column label="用户手机" prop="phone">
        </el-table-column>
        <el-table-column label="证件类型" prop="idType">
          <template slot-scope="scope">

          </template>
        </el-table-column>
        <el-table-column label="证件号" prop="idNo">
        </el-table-column>
        <el-table-column label="准驾车型" prop="licenseType">
        </el-table-column>
        <el-table-column label="驾驶证档案编号" prop="licenseNo">
        </el-table-column>
        <el-table-column label="注册时间" prop="createTime">
        </el-table-column>
        <el-table-column label="审核时间" prop="auditTime">
        </el-table-column>
        <el-table-column label="审核状态" prop="auditState">
          <template slot-scope="scope">
          </template>
        </el-table-column>
        <el-table-column label="最近修改时间" prop="updateTime">
        </el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="detail(scope.row)">
              查看
            </el-button>
            <el-button :disabled="scope.row.auditState === 'PASSED'" type="primary" size="mini" @click="auditItem(scope.row)">
              审核
            </el-button>
            <el-button type="primary" size="mini">
              修改
            </el-button>
            <el-button type="primary" size="mini" v-if="!scope.row.disabled" @click="blackItem(scope.row)">
              拉黑
            </el-button>
            <el-button type="primary" size="mini" v-if="scope.row.disabled" @click="whiteItem(scope.row)">
              解封
            </el-button>
          </template>
        </el-table-column>s
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="row page-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.currentPage" :page-sizes="[10, 20]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
      </el-pagination>
    </div>

    <!-- 添加弹窗 -->
    <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%" :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAudit()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 审核弹窗 -->
    <el-dialog title="审核" :visible.sync="auditDialogVisible" width="30%" :before-close="handleClose">
      <div>
        <el-radio v-model="auditDate.auditState" label="PASSED">通过</el-radio>
        <el-radio v-model="auditDate.auditState" label="REJECT">驳回</el-radio>
        <el-input v-if="auditDate.auditState === 'REJECT'" v-model="auditDate.auditDesc"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="auditDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAudit()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 拉黑弹窗 -->
    <el-dialog title="拉黑" :visible.sync="balckDialogVisible" width="30%" :before-close="handleClose">
      <span>确认要将用户拉黑？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="balckDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitBlack()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 洗白弹窗 -->
    <el-dialog title="解封" :visible.sync="whiteDialogVisible" width="30%" :before-close="handleClose">
      <span>确认要将用户解封？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="whiteDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitWhite()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import baseService from '../../service/baseService.js'

export default {
  name: '',
  data() {
    return {
      tabMaxHeight: 0,
      // api列表
      apiPath: {
        get: '/driver/page',
        audit: '/driver/audit',
        black: '/driver/ops/black',
        white: '/driver/ops/white'
      },
      // 列表数据
      data: [],
      // 搜索数据
      search: {
        pageSize: 20,
        currentPage: 1,
        // id
        id: '',
        // 手机号
        phone: '',
        // 审核状态
        auditState: '',
        //证件类型
        idType: '',
        //证件号码
        idNo: '',
        //驾驶证类型
        licenseType: '',
        //驾驶证编号
        licenseNo: '',
        //创建开始时间
        createTimeBegin: '',
        // 创建结束时间
        createTimeEnd: '',
        // 审核时间开始
        auditTimeBegin: '',
        // 审核时间结束
        auditTimeEnd: '',
        //拉黑/洗白
        disabled: ''
      },
      creatTime: '',
      auditTime: '',
      totalSize: 0,
      // 审核状态列表
      typeList: [
        {
          name: '全部',
          val: ''
        },
        {
          name: '黑名单',
          val: true
        },
        {
          name: '白名单',
          val: false
        }
      ],
      // 证件类型列表
      idList: [
        {
          name: '居民身份证',
          val: 'IDCARD'
        },
        {
          name: '军官证',
          val: 'OFFICER'
        },
        {
          name: '士兵证',
          val: 'SOLDIER'
        },
        {
          name: '军官离退休证',
          val: 'RETIRED'
        },
        {
          name: '境外人员身份证',
          val: 'OUTSIDE'
        },
        {
          name: '外交人员身份证明',
          val: 'DIPLOMATIC'
        }
      ],
      //驾驶证类别列表
      licenseList: [
        {
          name: 'A1'
        },
        {
          name: 'A2'
        },
        {
          name: 'B1'
        },
        {
          name: 'B2'
        }
      ],
      // 审核状态
      auditList: [
        {
          name: '待审核',
          val: 'INHAND'
        },
        {
          name: '驳回',
          val: 'REJECT'
        },
        {
          name: '通过',
          val: 'PASSED'
        },
        {
          name: '重新提交',
          val: 'REINHAND'
        }
      ],
      // 审核弹窗
      auditDialogVisible: false,
      // 审核数据
      auditDate: {
        id: '',
        auditState: '',
        auditDesc: ''
      },
      // 拉黑弹窗
      balckDialogVisible: false,
      // 洗白弹窗
      whiteDialogVisible: false,
      // 当前用户id
      currentId: '',
      // 添加弹窗
      addDialogVisible: false,
      addDate: {}
    }
  },
  mounted() {
    // 初始化数据
    this.getData()
  },
  methods: {
    // 获取列表数据
    getData() {
      baseService.basePostData(this.apiPath.get, this.search).then(res => {
        this.data = res.data.data.list
        this.totalSize = res.data.data.total
        let clientHieght = document.body.clientHeight
        this.tabMaxHeight = clientHieght - 60 - 30 - 117 - 50 - 50
      })
    },
    // 重置
    reset() {
      this.search = {
        // id
        id: '',
        // 手机号
        phone: '',
        // 审核状态
        auditState: '',
        //证件类型
        idType: '',
        //证件号码
        idNo: '',
        //驾驶证类型
        licenseType: '',
        //驾驶证编号
        licenseNo: '',
        //创建开始时间
        createTimeBegin: '',
        // 创建结束时间
        createTimeEnd: '',
        // 审核时间开始
        auditTimeBegin: '',
        // 审核时间结束
        auditTimeEnd: '',
        //拉黑/洗白
        disabled: ''
      }
      this.creatTime = ''
      this.auditTime = ''
      this.getData()
    },
    add() {
      this.addDialogVisible = true
    },
    // 查看详情
    detail(row) {
      this.$router.push(`/driver/detail?id=${row.id}`)
    },
    // 审核
    auditItem(row) {
      this.auditDate = {
        id: '',
        auditState: '',
        auditDesc: ''
      }
      this.auditDate.id = row.id
      this.auditDialogVisible = true
    },
    // 审核请求
    submitAudit() {
      this.auditDialogVisible = false
      if (this.auditDate.auditState === 'PASSED') {
        this.auditDate.auditDesc = '通过'
      }
      baseService.basePostData(this.apiPath.audit, this.auditDate).then(res => {
        this.getData()
      })
    },
    // 拉黑
    blackItem(row) {
      this.currentId = row.id
      this.balckDialogVisible = true
    },
    // 拉黑请求
    submitBlack() {
      this.balckDialogVisible = false
      baseService.baseGetData(this.apiPath.black, this.currentId).then(res => {
        this.getData()
      })
    },
    // 洗白
    whiteItem(row) {
      this.currentId = row.id
      this.whiteDialogVisible = true
    },
    // 洗白请求
    submitWhite() {
      this.whiteDialogVisible = false
      baseService.baseGetData(this.apiPath.white, this.currentId).then(res => {
        this.getData()
      })
    },
    // 关闭弹窗
    handleClose() {
      this.auditDialogVisible = false
      this.balckDialogVisible = false
      this.whiteDialogVisible = false
      this.addDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.search.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.search.currentPage = val
      this.getData()
    },
    creatTimeChange(val) {
      this.search.createTimeBegin = val[0]
      this.search.createTimeEnd = val[1]
    },
    auditTimeChange(val) {
      this.search.auditTimeBegin = val[0]
      this.search.auditTimeEnd = val[1]
    }
  }
}
</script>

<style>
.base-search .el-input {
  width: 150px;
}
.senior-search .el-input {
  width: 200px;
}
</style>

