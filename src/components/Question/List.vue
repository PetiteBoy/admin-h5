<template>
  <div class="view-container">
    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>试题管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main-page">

      <div class="row base-search">
        <label for="">
          <span class="label-span">题目id：</span>
          <el-input size="small" v-model="search.id" placeholder="题目id"></el-input>
        </label>
        <label for="">
          <span class="label-span">题目关键字：</span>
          <el-input size="small" v-model="search.question" placeholder="题目关键字"></el-input>
        </label>
      </div>
      <div class="row base-search">
        <label for="">
          <span class="label-span">科目类别：</span>
          <el-select size="small" v-model="search.subject">
            <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
        </label>
        <label for="">
          <span class="label-span">题目类型：</span>
          <el-select size="small" v-model="search.type">
            <el-option v-for="(item, index) in licenseList" :key="index" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </label>
      </div>
      <div class="row senior-search">
        <label for="">
          <span class="label-span">创建时间范围：</span>
          <el-date-picker size="small" v-model="creatTime" type="daterange" range-separator="" start-placeholder="" end-placeholder="" @change="creatTimeChange" value-format="timestamp">
          </el-date-picker>
        </label>
        <label for="">
          <span class="label-span">更新时间范围：</span>
          <el-date-picker size="small" v-model="updateTime" type="daterange" range-separator="" start-placeholder="" end-placeholder="" @change="updateTimeChange" value-format="timestamp">
          </el-date-picker>
        </label>
        <div style="float: right;">
          <el-button size="small" type="primary" @click="getData()">搜索</el-button>
          <el-button size="small" type="primary" @click="reset()">重置</el-button>
          <el-button size="small" type="primary" @click="add()">添加</el-button>
        </div>
      </div>

      <!-- 数据列表 -->
      <div class="row ">
        <el-table :data="data" border style="width: 100%">
          <el-table-column label="题目id" prop="id" width="60">
          </el-table-column>
          <el-table-column label="科目类别" prop="phone" width="80">
            <template slot-scope="scope">
              <div v-if="scope.row.subject === '1'">科目一</div>
              <div v-if="scope.row.subject === '4'">科目四</div>
            </template>
          </el-table-column>
          <el-table-column label="题目类型" prop="type" width="96">
          </el-table-column>
          <el-table-column label="题目分类" prop="licenseType">
            <template slot-scope="scope">
              <el-select size="small" v-model="categoryIds[scope.$index]" placeholder="请选择" @change="change(scope.$index,scope.row)">
                <el-option v-for="(item, index) in categoryDate" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="题目问题" prop="question">
          </el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="96">
            <template slot-scope="scope">
              <div>{{moment(scope.row.createTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="最近修改时间" prop="updateTime" width="96">
            <template slot-scope="scope">
              <div v-if="scope.row.updateTime">{{moment(scope.row.updateTime)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="detail(scope.row)">
                  查看
                </el-button>
                <el-button type="primary" size="mini" @click="edit(scope.row)">
                  编辑
                </el-button>
              </div>
              <div class="row">
                <el-button type="danger" size="mini" @click="del(scope.row)">
                  删除
                </el-button>
              </div>

            </template>
          </el-table-column>s
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="row page-container">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.pageNum" :page-sizes="[10, 50]" :page-size="search.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize">
        </el-pagination>
      </div>
    </div>

    <!-- 添加 -->
    <el-dialog title="添加试题" :visible.sync="addDialogVisible" width="30%" :before-close="handleClose">
      <el-form class="add-form" label-position="left" label-width="0px" :model="addData" :rules="addRules" ref="addFrom">
        <el-form-item label="" prop="subject">
          <label for="" class="driver-label">
            <span class="">科目类别：</span>
            <el-select size="small" v-model="addData.subject" placeholder="请选择科目类别">
              <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.val">
              </el-option>
            </el-select>
          </label>

        </el-form-item>
        <el-form-item label="" prop="type">
          <label for="">
            <span class="">题目类型：</span>
            <el-checkbox-group v-model="addData.type">
              <el-checkbox v-for="(item, index) in licenseList" :key="index" :label="item.name"></el-checkbox>
            </el-checkbox-group>
          </label>

        </el-form-item>
        <el-form-item label="" prop="question">
          <label for="">
            <span class="">题目问题：</span>
            <el-input v-model="addData.question" placeholder="请输入题目问题" type="textarea" rows="7"></el-input>
          </label>

        </el-form-item>
        <el-form-item label="" prop="item1">
          <label for="">
            <span class="">题目答案A：</span>
            <el-input v-model="addData.item1" placeholder="请输入题目选项A（必填）"></el-input>
          </label>

        </el-form-item>
        <el-form-item label="" prop="item2">
          <label for="">
            <span class="">题目答案B：</span>
            <el-input v-model="addData.item2" placeholder="请输入题目选项B（必填）"></el-input>
          </label>

        </el-form-item>
        <el-form-item label="" prop="item3">
          <label for="">
            <span class="">题目答案C：</span>
            <el-input v-model="addData.item3" placeholder="请输入题目选项C"></el-input>
          </label>

        </el-form-item>
        <el-form-item label="" prop="item4">
          <label for="">
            <span class="">题目答案D：</span>
            <el-input v-model="addData.item4" placeholder="请输入题目选项D"></el-input>
          </label>

        </el-form-item>
        <el-form-item label="" prop="answer">
          <label for="">
            <span class="">题目答案：</span>
            <el-select size="small" v-model="addData.answer" placeholder="请选择题目答案">
              <el-option v-for="(item, index) in answerList" :key="index" :label="item" :value="item">
              </el-option>
            </el-select>
          </label>

        </el-form-item>
        <el-form-item label="" prop="explains">
          <label for="">
            <span class="">题目详解</span>
            <el-input v-model="addData.explains" placeholder="请输入题目详解" type="textarea" rows="7"></el-input>
          </label>

        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="submitAdd('addFrom')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title="编辑试题" :visible.sync="editDialogVisible" width="30%" :before-close="handleClose">
      <el-form class="add-form" label-position="left" label-width="0px" :model="editData" :rules="addRules" ref="editData">
        <el-form-item label="" prop="subject">
          <label for="" class="driver-label">
            <span class="">科目类别：</span>
          <el-select size="small" v-model="editData.subject" placeholder="请选择科目类别">
           <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.val">
            </el-option>
          </el-select>
          </label>
        </el-form-item>
        <el-form-item label="" prop="type">
          <label for="">
            <span class="">题目类型：</span>
          <el-checkbox-group v-model="editData.type">
            <el-checkbox v-for="(item, index) in licenseList" :key="index" :label="item.name"></el-checkbox>
          </el-checkbox-group>
           </label>
        </el-form-item>
        <el-form-item label="" prop="question">
           <label for="">
            <span class="">题目问题：</span>
          <el-input v-model="editData.question" placeholder="请输入题目问题" type="textarea" rows="7"></el-input>
        </label>
        </el-form-item>
        <el-form-item label="" prop="item1">
            <label for="">
            <span class="">题目答案A：</span>
          <el-input v-model="editData.item1" placeholder="请输入题目选项A（必填）"></el-input>
          </label>
        </el-form-item>
        <el-form-item label="" prop="item2">
          <label for="">
            <span class="">题目答案B：</span>
          <el-input v-model="editData.item2" placeholder="请输入题目选项B（必填）"></el-input>
           </label>
        </el-form-item>
        <el-form-item label="" prop="item3">
          <label for="">
            <span class="">题目答案C：</span>
          <el-input v-model="editData.item3" placeholder="请输入题目选项C"></el-input>
          </label>
        </el-form-item>
        <el-form-item label="" prop="item4">
          <label for="">
            <span class="">题目答案D：</span>
          <el-input v-model="editData.item4" placeholder="请输入题目选项D"></el-input>
          </label>
        </el-form-item>
        <el-form-item label="" prop="answer">
          <label for="">
            <span class="">题目答案：</span>
          <el-select size="small" v-model="editData.answer" placeholder="请选择题目答案">
            <el-option v-for="(item, index) in answerList" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
           </label>
        </el-form-item>
        <el-form-item label="" prop="explains">
           <label for="">
            <span class="">题目详解</span>
          <el-input v-model="editData.explains" placeholder="请输入题目详解" type="textarea" rows="7"></el-input>
           </label>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="submitEdit('editData')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="delDialogVisible" width="30%" :before-close="handleClose">
      <span>确认要删除该试题？</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitDel()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import baseService from '../../service/baseService.js'
import moment from 'moment'
export default {
  name: '',
  data() {
    return {
      // api列表
      apiPath: {
        get: '/question/page',
        add: '/question/add',
        edit: '/question/update',
        del: '/question/delete'
      },
      // 列表数据
      data: [],
      //   搜索数据
      search: {
        id: null,
        subject: null,
        type: null,
        question: null,
        createTimeBegin: null,
        createTimeEnd: null,
        updateTimeBegin: null,
        updateTimeEnd: null,
        pageNum: 1,
        pageSize: 20
      },
      totalSize: 0,
      //   添加弹窗
      addDialogVisible: false,
      //   添加数据
      addData: {
        subject: '',
        type: [],
        question: '',
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        answer: '',
        explains: ''
      },
      // 规则
      addRules: {
        subject: [{ required: true, message: '请选择科目类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择题目类型', trigger: 'change' }],
        question: [{ required: true, message: '请填写题目', trigger: 'change' }],
        item1: [{ required: true, message: '请填写答案A', trigger: 'change' }],
        item2: [{ required: true, message: '请填写答案B', trigger: 'change' }],
        answer: [{ required: true, message: '请填写答案', trigger: 'change' }],
        explains: [{ required: true, message: '请填写详解', trigger: 'change' }]
      },
      // 编辑弹窗
      editDialogVisible: false,
      // 编辑数据
      editData: {
        id: '',
        subject: 0,
        type: [],
        question: '',
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        answer: '',
        explains: '',
        categoryIds: ''
      },
      // 科目列表
      subjectList: [
        {
          name: '科目一',
          val: '1'
        },
        {
          name: '科目四',
          val: '4'
        }
      ],
      // 答案列表
      answerList: ['A', 'B', 'C', 'D'],
      tabMaxHeight: 0,
      // 删除弹窗
      delDialogVisible: false,
      // 删除id
      delId: '',
      // 分类列表
      categoryDate: [],
      categoryPath: {
        getPath: '/category/question'
      },
      categoryIds: [],
      creatTime: '',
      updateTime: ''
    }
  },
  computed: {
    licenseList() {
      return this.$store.state.data.licenseListone
    }
  },
  mounted() {
    // 初始化数据
    this.getData()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD hh:mm:ss')
    },
    // 获取列表数据
    getData() {
      baseService
        .basePostData(this.apiPath.get, {
          id: this.search.id || null,
          subject: this.search.subject || null,
          type: this.search.type || null,
          question: this.search.question || null,
          createTimeBegin: this.search.createTimeBegin || null,
          createTimeEnd: this.search.createTimeEnd || null,
          updateTimeBegin: this.search.updateTimeBegin || null,
          updateTimeEnd: this.search.updateTimeEnd || null,
          pageNum: this.search.pageNum,
          pageSize: this.search.pageSize
        })
        .then(res => {
          this.data = []
          let result = res.data
          this.data = result.data.list
          this.totalSize = result.data.total
          this.categoryIds = []
          for (let i = 0; i < this.data.length; i++) {
            this.categoryIds.push(this.data[i].categoryId)
          }
          let clientHieght = document.body.clientHeight
          this.tabMaxHeight = clientHieght - 60 - 30 - 117 - 50 - 50
          if (result.status !== '0x0000') {
            this.$message({
              message: result.message,
              type: 'warning'
            })
          }
        })

      baseService.basePostData(this.categoryPath.getPath, {}).then(res => {
        let result = res.data.data
        this.categoryDate = result
      })
    },
    // 重置
    reset() {
      this.search = {
        id: null,
        subject: null,
        type: null,
        question: null,
        createTimeBegin: null,
        createTimeEnd: null,
        updateTimeBegin: null,
        updateTimeEnd: null,
        pageNum: this.search.pageNum,
        pageSize: this.search.pageSize
      }
      this.creatTime = ''
      this.updateTime = ''
      this.getData()
    },
    detail(row) {
      this.$router.push(`/question/detail?id=${row.id}`)
    },
    // 添加
    add() {
      this.addDialogVisible = true
    },
    // 添加请求
    submitAdd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addDialogVisible = false
          this.addData.type = this.addData.type.join(',')
          baseService.basePostData(this.apiPath.add, this.addData).then(res => {
            let result = res.data
            if (result.status !== '0x0000') {
              this.$message({
                message: result.message,
                type: 'warning'
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
    // 编辑
    edit(row) {
      this.editData.id = row.id
      this.editData.subject = row.subject
      this.editData.type = row.type.split(',')
      this.editData.question = row.question
      this.editData.item1 = row.item1
      this.editData.item2 = row.item2
      this.editData.item3 = row.item3
      this.editData.item4 = row.item4
      this.editData.answer = row.answer
      this.editData.explains = row.explains

      this.editDialogVisible = true
    },
    // 编辑请求
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.editDialogVisible = false
          this.editData.type = this.editData.type.join(',')

          baseService.basePostData(this.apiPath.edit, this.editData).then(res => {
            let result = res.data
            if (result.status !== '0x0000') {
              this.$message({
                message: result.message,
                type: 'warning'
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
    // 删除
    del(row) {
      this.delId = row.id
      this.delDialogVisible = true
    },
    // 删除请求
    submitDel() {
      this.delDialogVisible = false
      baseService.baseGetData(this.apiPath.del, this.delId).then(res => {
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
    // 修改类型
    change(index, row) {
      this.editData = row
      this.editData.categoryId = this.categoryIds[index]
      baseService.basePostData(this.apiPath.edit, this.editData).then(res => {
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
    handleClose() {
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.delDialogVisible = false
      this.getData()
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
    updateTimeChange(val) {
      this.search.updateTimeBegin = val[0]
      this.search.updateTimeEnd = val[1]
    }
  }
}
</script>

