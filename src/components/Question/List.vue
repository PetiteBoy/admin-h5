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
            <el-button @click="add()">添加试题</el-button>
        </div>

        <!-- 数据列表 -->
        <div class="row data-container">
            <el-table :data="data" border style="width: 100%" :max-height="tabMaxHeight">
                <el-table-column label="题目id" prop="id">
                </el-table-column>
                <el-table-column label="科目类别" prop="phone">
                    <template slot-scope="scope">
                        <div v-if="scope.row.subject === '1'">科目一</div>
                        <div v-if="scope.row.subject === '4'">科目四</div>
                    </template>
                </el-table-column>
                <el-table-column label="题目类型" prop="type">
                </el-table-column>
                <el-table-column label="题目分类" prop="licenseType">
                    <template slot-scope="scope">
                        <el-select size="small" v-model="categoryIds[scope.$index]" placeholder="请选择" @change="change(scope.$index,scope.row)">
                            <el-option v-for="(item, index) in categoryDate" :key="index" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="题目问题" prop="answer">
                </el-table-column>
                <el-table-column label="创建时间" prop="createTime">
                </el-table-column>
                <el-table-column label="最近修改时间" prop="updateTime">
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="detail(scope.row)">
                            查看
                        </el-button>
                        <el-button type="primary" size="mini" @click="edit(scope.row)">
                            编辑
                        </el-button>
                        <el-button type="primary" size="mini" @click="del(scope.row)">
                            删除
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

        <!-- 添加 -->
        <el-dialog title="添加" :visible.sync="addDialogVisible" width="30%" :before-close="handleClose">
            <el-select size="small" v-model="addData.subject" placeholder="请选择">
                <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.val">
                </el-option>
            </el-select>
            <el-checkbox-group v-model="addData.type">
                <el-checkbox v-for="(item, index) in typeList" :key="index" :label="item"></el-checkbox>
            </el-checkbox-group>
            <el-input v-model="addData.question" placeholder="请输入题目问题"></el-input>
            <el-input v-model="addData.item1" placeholder="请输入题目选项A（必填）"></el-input>
            <el-input v-model="addData.item2" placeholder="请输入题目选项B（必填）"></el-input>
            <el-input v-model="addData.item3" placeholder="请输入题目选项C"></el-input>
            <el-input v-model="addData.item4" placeholder="请输入题目选项D"></el-input>
            <el-select size="small" v-model="addData.answer" placeholder="请选择题目答案">
                <el-option v-for="(item, index) in answerList" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-input v-model="addData.explains" placeholder="请输入题目详解"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="addDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitAdd()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 编辑 -->
        <el-dialog title="编辑" :visible.sync="editDialogVisible" width="30%" :before-close="handleClose">
            <el-select size="small" v-model="editData.subject" placeholder="请选择">
                <el-option v-for="(item, index) in subjectList" :key="index" :label="item.name" :value="item.val">
                </el-option>
            </el-select>
            <el-checkbox-group v-model="editData.type">
                <el-checkbox v-for="(item, index) in typeList" :key="index" :label="item"></el-checkbox>
            </el-checkbox-group>
            <el-input v-model="editData.question" placeholder="请输入题目问题"></el-input>
            <el-input v-model="editData.item1" placeholder="请输入题目选项A（必填）"></el-input>
            <el-input v-model="editData.item2" placeholder="请输入题目选项B（必填）"></el-input>
            <el-input v-model="editData.item3" placeholder="请输入题目选项C"></el-input>
            <el-input v-model="editData.item4" placeholder="请输入题目选项D"></el-input>
            <el-select size="small" v-model="editData.answer" placeholder="请选择题目答案">
                <el-option v-for="(item, index) in answerList" :key="index" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-input v-model="editData.explains" placeholder="请输入题目详解"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitEdit()">确 定</el-button>
            </span>
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
        id: ''
      },
      totalSize: 0,
      //   添加弹窗
      addDialogVisible: false,
      //   添加数据
      addData: {
        subject: '',
        type: [],
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        answer: ''
      },
      editData: {
        id: '',
        subject: '',
        type: [],
        item1: '',
        item2: '',
        item3: '',
        item4: '',
        answer: '',
        categoryIds: ''
      },
      typeList: ['C1', 'C2', 'A1'],
      subjectList: [
        {
          name: '科目一',
          val: 1
        },
        {
          name: '科目四',
          val: 4
        }
      ],
      answerList: ['A', 'B', 'C', 'D'],
      tabMaxHeight: 0,
      editDialogVisible: false,
      delDialogVisible: false,
      delId: '',
      categoryDate: [],
      categoryPath: {
        getPath: '/category/question'
      },
      categoryIds: []
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
        this.categoryIds = []
        for (let i = 0; i < this.data.length; i++) {
          this.categoryIds.push(this.data[i].categoryId)
        }
        let clientHieght = document.body.clientHeight
        this.tabMaxHeight = clientHieght - 60 - 30 - 117 - 50 - 50
      })

      baseService.basePostData(this.categoryPath.getPath, {}).then(res => {
        let result = res.data.data
        this.categoryDate = result
      })
    },
    add() {
      this.addDialogVisible = true
    },
    submitAdd() {
      this.addDialogVisible = false
      baseService.basePostData(this.apiPath.add, this.addData).then(res => {
        this.getData()
      })
    },
    edit(row) {
      this.editData = row
      this.editDialogVisible = true
    },
    submitEdit() {
      this.editDialogVisible = false
      baseService.basePostData(this.apiPath.edit, this.editData).then(res => {
        this.getData()
      })
    },
    del(row) {
      this.delId = row.id
      this.delDialogVisible = true
    },
    submitDel() {
      this.delDialogVisible = false
      baseService.baseGetData(this.apiPath.del, this.delId).then(res => {
        this.getData()
      })
    },
    change(index, row) {
      this.editData = row
      this.editData.categoryId = this.categoryIds[index]
      baseService.basePostData(this.apiPath.edit, this.editData).then(res => {
        this.getData()
      })
    },
    handleClose() {
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.delDialogVisible = false
    },
    // --------------------------分页相关--------------------------
    handleSizeChange(val) {
      this.search.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.search.currentPage = val
      this.getData()
    }
  }
}
</script>
