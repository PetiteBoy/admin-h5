<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>驾驶人列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="main-page">
      <div class=" base-search">
        <label for="">
          <span class="label-span">用户id：</span>
          <el-input size="small" v-model="search.id" placeholder="用户id"></el-input>
        </label>
        <label for="">
          <span class="label-span">手机号码：</span>
          <el-input size="small" v-model="search.phone" placeholder="请输入手机号码"></el-input>
        </label>

      </div>
      <div class="row senior-search">
        <label for="">
          <span class="label-span">证件类型：</span>
          <el-select size="small" v-model="search.idType">
            <el-option v-for="(item, index) in idList" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </label>
        <label for="">
          <span class="label-span">证件号码：</span>
          <el-input size="small" v-model="search.idNo" placeholder="请输入证件号码"></el-input>
        </label>
        <label for="">
          <span class="label-span">真实姓名：</span>
          <el-input size="small" v-model="search.realname" placeholder="请输入您的真实姓名"></el-input>
        </label>
      </div>

      <div class="row senior-search">
        <label for="">
          <span class="label-span">驾驶证类型：</span>
          <el-select size="small" v-model="search.licenseType">
            <el-option v-for="(item, index) in licenseList" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </label>
        <label for="">
          <span class="label-span">档案编号：</span>
          <el-input size="small" v-model="search.licenseNo" placeholder="请输入档案编号"></el-input>
        </label>
      </div>
      <div class="row senior-search">
        <label for="">
          <span class="label-span">黑白名单：</span>
          <el-select size="small" v-model="search.disabled">
            <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </label>
        <label for="">
          <span class="label-span">审核状态：</span>
          <el-select size="small" v-model="search.auditState">
            <el-option v-for="(item, index) in auditList" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </label>
      </div>
      <div class="row senior-search">
        <label for="">
          <span>注册时间范围：</span>
          <el-date-picker size="small" v-model="creatTime" type="daterange" range-separator="" start-placeholder="开始时间" end-placeholder="结束时间" @change="creatTimeChange" value-format="timestamp">
          </el-date-picker>
        </label>
        <label for="">
          <span>审核时间范围：</span>
          <el-date-picker size="small" v-model="auditTime" type="daterange" range-separator="" start-placeholder="开始时间" end-placeholder="结束时间" @change="auditTimeChange" value-format="timestamp">
          </el-date-picker>
        </label>
        <div style="float:right;">
          <el-button size="small" type="primary" @click="getData()">搜索</el-button>
          <el-button size="small" type="primary" @click="reset()">重置</el-button>
          <el-button size="small" type="primary" @click="add()">添加</el-button>
        </div>
      </div>

      <!-- 数据列表 -->
      <div class="row-data">
        <el-table :data="data" border style="width: 100%" min-height="409">
          <el-table-column label="用户id" prop="id" width="60">
          </el-table-column>
          <el-table-column label="真实姓名" prop="realname">
          </el-table-column>
          <el-table-column label="用户手机" prop="phone">
          </el-table-column>
          <el-table-column label="证件类型" prop="idType" width="90">
            <template slot-scope="scope">
              <div>{{dataIdType[scope.row.idType]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="证件号" prop="idNo">
          </el-table-column>
          <el-table-column label="准驾车型" prop="licenseType" width="60">
          </el-table-column>
          <el-table-column label="驾驶证档案编号" prop="licenseNo">
          </el-table-column>
          <el-table-column label="注册时间" prop="createTime" width="96">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="审核时间" prop="auditTime" width="96">
            <template slot-scope="scope">
              <div v-if="scope.row.auditTime">{{moment(scope.row.auditTime)}}</div>
              <div v-if="!scope.row.auditTime">-</div>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" prop="auditState" width="70">
            <template slot-scope="scope">
              <div>{{dataAuditStatus[scope.row.auditState]}}</div>
            </template>
          </el-table-column>
          <el-table-column label="拉黑状态" width="70">
            <template slot-scope="scope">
              <div v-if="scope.row.disabled">已拉黑</div>
              <div v-if="!scope.row.disabled">正常</div>
            </template>
          </el-table-column>
          <el-table-column label="最近修改时间" prop="updateTime" width="96">
            <template slot-scope="scope">
              <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
              <div v-if="!scope.row.updateTime">-</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="detail(scope.row)">
                  查看
                </el-button>
                <el-button :disabled="scope.row.auditState !== 'INHAND'" type="primary" size="mini" @click="auditItem(scope.row)">
                  审核
                </el-button>
              </div>
              <div class="row">
                <el-button type="primary" size="mini" @click="edit(scope.row)">
                  编辑
                </el-button>
                <el-button type="primary" size="mini" v-if="!scope.row.disabled" @click="blackItem(scope.row)">
                  拉黑
                </el-button>
                <el-button type="primary" size="mini" v-if="scope.row.disabled" @click="whiteItem(scope.row)">
                  解封
                </el-button>
              </div>

            </template>
          </el-table-column>s
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class=" page-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.currentPage" :page-sizes="[10, 50]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
        </el-pagination>
      </div>
    </div>

    <!-- 添加弹窗 -->
    <el-dialog title="添加驾驶人" class="driver-" :visible.sync="addDialogVisible" width="40%" :before-close="handleClose">
      <el-form class="add-form" label-position="left" label-width="0px" :model="addData" :rules="addRules" ref="addFrom">
        <el-form-item label="" prop="idType">
          <label for="" class="driver-label">
            <span class="label-span ">证件类型：</span>
            <el-select size="small" v-model="addData.idType" placeholder="用户证件类型">
              <el-option v-for="(item, index) in idListone" :key="index" :label="item.name" :value="item.val">
              </el-option>
            </el-select>
          </label>
        </el-form-item>

        <el-form-item label="" prop="idNo">
          <label for="" class="driver-label">
            <span class="label-span ">证件号码：</span>
            <el-input size="small" v-model="addData.idNo" placeholder="请输入证件号码"></el-input>
          </label>
        </el-form-item>

        <el-form-item label="" prop="realname">
          <label for="" class="driver-label">
            <span class="label-span ">真实姓名：</span>
            <el-input size="small" v-model="addData.realname" placeholder="请输入您的真实姓名"></el-input>
          </label>
        </el-form-item>

        <el-form-item label="" prop="licenseType">
          <label for="" class="driver-label">
            <span class="label-span ">驾驶证类型：</span>
            <el-select size="small" v-model="addData.licenseType" multiple placeholder="驾驶证类型">
              <el-option v-for="(item, index) in licenseListone" :key="index" :label="item.name" :value="item.name"> </el-option>
            </el-select>

          </label>

        </el-form-item>
        <el-form-item label="" prop="licenseNo">
          <label for="" class="driver-label">
            <span class="label-span ">驾驶证档案编号：</span>
            <el-input size="small" v-model="addData.licenseNo" placeholder="请输入驾驶证档案编号"></el-input>
          </label>

        </el-form-item>
        <el-form-item label="" prop="licenseBeginDate">
          <label for="" class="driver-label">
            <span class="label-span ">注册时间范围：</span>
            <el-date-picker size="small" v-model="driverTimeadd" type="daterange" range-separator="" start-placeholder="请选择注册时间范围" end-placeholder="" @change="driverTimeChangeadd" value-format="timestamp">
            </el-date-picker>
          </label>

        </el-form-item>
        <el-form-item label="" prop="idCardImgUrlToken">
          <el-upload class="upload-demo" :action="upload.pic" :on-success="handleSuccessIdCard" :headers="headers">
            <el-button size="small" type="primary">上传驾驶人证件图片 （选填）</el-button>
          </el-upload>
          <img :src="idCardImgUrl" alt="" class="pic" v-if="idCardImgUrl">
        </el-form-item>
        <el-form-item label="" prop="headUrlToken">
          <el-upload class="upload-demo" :action="upload.pic" :on-success="handleSuccessHead" :headers="headers">
            <el-button size="small" type="primary">上传驾驶人本人头像（选填） </el-button>
          </el-upload>
          <img :src="headUrl" alt="" class="pic" v-if="headUrl">
        </el-form-item>
        <el-form-item label="" prop="phone">
          <label for="" class="driver-label">
            <span class="label-span ">手机号码：</span>
            <el-input size="small" v-model="addData.phone" placeholder="手机号码"></el-input>
          </label>
        </el-form-item>
        <el-form-item class="btn-">
          <el-button type="primary" size="small" @click="submitAdd('addFrom')">提 交</el-button>
          <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog title="编辑驾驶人" class="driver-" :visible.sync="editDialogVisible" width="40%" :before-close="handleClose">
      <el-form class="add-form" label-position="left" label-width="0px" :model="editData" :rules="addRules" ref="editFrom">
        <el-form-item label="" prop="idType">
          <label for="" class="driver-label">
            <span class="label-span ">证件类型：</span>
            <el-select size="small" v-model="editData.idType" placeholder="证件类型">
              <el-option v-for="(item, index) in idListone" :key="index" :label="item.name" :value="item.val">
              </el-option>
            </el-select>
          </label>
        </el-form-item>
        <el-form-item label="" prop="idNo">
          <label for="" class="driver-label">
            <span class="label-span ">证件号码：</span>
            <el-input size="small" v-model="editData.idNo" placeholder="请输入证件号码"></el-input>
          </label>
        </el-form-item>
        <el-form-item label="" prop="realname">
          <label for="" class="driver-label">
            <span class="label-span ">真实姓名：</span>
            <el-input size="small" v-model="editData.realname" placeholder="请输入您的真实姓名"></el-input>
          </label>
        </el-form-item>

        <el-form-item label="" prop="licenseType">
          <label for="" class="driver-label">
            <span class="label-span ">驾驶证类型：</span>
            <el-select size="small" v-model="editData.licenseType" multiple placeholder="驾驶证类型">
              <el-option v-for="(item, index) in licenseListone" :key="index" :label="item.name" :value="item.name"> </el-option>
            </el-select>
          </label>
        </el-form-item>
        <el-form-item label="" prop="licenseNo">
          <label for="" class="driver-label">
            <span class="label-span ">驾驶证档案编号：</span>
            <el-input size="small" v-model="editData.licenseNo" placeholder="请输入驾驶证档案编号"></el-input>
          </label>
        </el-form-item>
        <el-form-item label="" prop="licenseBeginDate">
          <label for="" class="driver-label">
            <span class="label-span ">注册时间范围：</span>
            <el-date-picker size="small" v-model="driverTimeedit" type="daterange" range-separator="" start-placeholder="请选择注册时间范围" end-placeholder="" @change="driverTimeChangeedit" value-format="timestamp">
            </el-date-picker>
          </label>
        </el-form-item>
        <el-form-item label="" prop="idCardImgUrlToken">
          <el-upload class="upload-demo" :action="upload.pic" :show-file-list="false" :on-success="handleSuccessIdCard" :headers="headers">
            <el-button size="small" type="primary">上传驾驶人证件图片 （选填）</el-button>
          </el-upload>
          <img :src="idCardImgUrl" alt="" class="pic" v-if="idCardImgUrl">
        </el-form-item>
        <el-form-item label="" prop="headUrlToken">
          <el-upload class="upload-demo" :action="upload.pic" :show-file-list="false" :on-success="handleSuccessHead" :headers="headers">
            <el-button size="small" type="primary">上传驾驶人本人头像（选填） </el-button>
          </el-upload>
          <img :src="headUrl" alt="" class="pic" v-if="headUrl">
        </el-form-item>
        <el-form-item label="" prop="phone">
          <label for="" class="driver-label">
            <span class="label-span ">手机号码：</span>
            <el-input size="small" v-model="editData.phone" placeholder="手机号码"></el-input>
          </label>
        </el-form-item>
        <el-form-item class="btn-">
          <el-button type="primary" size="small" @click="submitEdit('editFrom')">提 交</el-button>
          <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
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

    <!-- 解封弹窗 -->
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
import { getSessionStorage } from '../../utils/base.js'
import moment from 'moment'
import config from '../../config.json'
export default {
  name: '',
  data() {
    return {
      upload: {
        pic: `${config.service.host}/file/image/upload`
      },
      headers: {
        authKey: getSessionStorage('authKey')
      },
      tabMaxHeight: 0,
      // api列表
      apiPath: {
        get: '/driver/page',
        audit: '/driver/audit',
        black: '/driver/ops/black',
        white: '/driver/ops/white',
        add: '/driver/add',
        edit: '/driver/update'
      },
      // 列表数据
      data: [],
      // 搜索数据
      search: {
        pageSize: 20,
        pageNum: 1,
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
        disabled: '',
        // 真实姓名
        realname: ''
      },
      creatTime: '',
      auditTime: '',
      driverTimeadd: [],
      driverTimeedit: [],
      totalSize: 0,
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
      // 添加数据
      addData: {
        realname: '',
        idType: '',
        idNo: '',
        licenseType: [],
        licenseNo: '',
        licenseBeginDate: '',
        licenseEndDate: '',
        idCardImgUrlToken: '',
        headUrlToken: '',
        phone: ''
      },
      idCardImgUrl: '',
      headUrl: '',
      addRules: {
        realname: [{ required: true, message: '请输入您的真实姓名', trigger: 'blur' }],
        idType: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        idNo: [{ required: true, message: '请输入证件号', trigger: 'blur' }],
        licenseType: [{ required: true, message: '请选择驾照', trigger: 'change' }],
        licenseNo: [{ required: true, message: '请输入驾照编号', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        licenseBeginDate: [{ required: true, message: '选择注册时间', trigger: 'blur' }]
      },
      // 编辑弹窗
      editDialogVisible: false,
      // 添加数据
      editData: {
        realname: '',
        id: '',
        idType: '',
        idNo: '',
        licenseType: [],
        licenseNo: '',
        licenseBeginDate: '',
        licenseEndDate: '',
        idCardImgUrlToken: '',
        headUrlToken: '',
        phone: ''
      }
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
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    // 获取列表数据
    getData() {
      baseService.basePostData(this.apiPath.get, this.search).then(res => {
        let result = res.data
        this.data = result.data.list
        this.totalSize = result.data.total
        let clientHieght = document.body.clientHeight
        this.tabMaxHeight = clientHieght - 60 - 30 - 117 - 50 - 50
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
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
    // 添加
    add() {
      this.idCardImgUrl = ''
      this.headUrl = ''
      this.addData = {
        idType: '',
        idNo: '',
        licenseType: [],
        licenseNo: '',
        licenseBeginDate: '',
        licenseEndDate: '',
        idCardImgUrlToken: '',
        headUrlToken: '',
        phone: ''
      }
      this.driverTime = ''
      this.addDialogVisible = true
    },
    // 添加请求
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let licenseType = this.addData.licenseType.join(',')
          this.addData.licenseType = licenseType
          baseService.basePostData(this.apiPath.add, this.addData).then(res => {
            this.getData()
            let result = res.data
            if (result.status !== '0x0000') {
              this.$message({
                message: result.message,
                type: 'warning'
              })
            } else {
              this.addDialogVisible = false
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    edit(row) {
      this.idCardImgUrl = ''
      this.headUrl = ''
      this.editData.id = row.id
      this.editData.realname = row.realname
      this.editData.idType = row.idType
      this.editData.idNo = row.idNo
      this.editData.licenseType = row.licenseType.split(',')
      this.editData.licenseNo = row.licenseNo
      this.editData.licenseBeginDate = row.licenseBeginDate
      this.editData.licenseEndDate = row.licenseEndDate
      this.editData.phone = row.phone
      this.editDialogVisible = true
      this.driverTimeedit[0] = row.licenseBeginDate
      this.driverTimeedit[1] = row.licenseEndDate
    },
    // 编辑请求
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let licenseType = this.editData.licenseType.join(',')
          this.editData.licenseType = licenseType
          baseService.basePostData(this.apiPath.edit, this.editData).then(res => {
            let result = res.data
            if (result.status !== '0x0000') {
              this.$message({
                message: result.message,
                type: 'warning'
              })
            } else {
              this.editDialogVisible = false
              this.$message({
                message: '编辑成功',
                type: 'success'
              })
            }
            this.getData()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
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
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
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
        let result = res.data
        if (result.status !== '0x0000') {
          this.$message({
            message: result.message,
            type: 'warning'
          })
        }
        this.getData()
      })
    },
    // 关闭弹窗
    handleClose() {
      this.auditDialogVisible = false
      this.balckDialogVisible = false
      this.whiteDialogVisible = false
      this.addDialogVisible = false
      this.editDialogVisible = false
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
    },
    auditTimeChange(val) {
      this.search.auditTimeBegin = val[0]
      this.search.auditTimeEnd = val[1]
    },
    driverTimeChangeadd(val) {
      this.addData.licenseBeginDate = val[0]
      this.addData.licenseEndDate = val[1]
    },
    driverTimeChangeedit(val) {
      this.editData.licenseBeginDate = val[0]
      this.editData.licenseEndDate = val[1]
    },
    handleSuccessIdCard(val) {
      this.addData.idCardImgUrlToken = val.data.token
      this.idCardImgUrl = val.data.url
    },
    handleSuccessHead(val) {
      this.addData.headUrlToken = val.data.token
      this.headUrl = val.data.url
    }
  }
}
</script>


