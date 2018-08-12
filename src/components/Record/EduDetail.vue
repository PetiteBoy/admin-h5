<template>
  <div class="view-container">
    <div class="row breadcrumb-container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/bm'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/edu-record-list'}">教育记录列表</el-breadcrumb-item>
        <el-breadcrumb-item>记录详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="row main-page">
      <div id="print">
        <div class="print">
          <div class="title">机动车驾驶人审验教育记录单</div>
          <div class="con1 row">
            <div class="info">
              <div class="info-item row">
                <span> 姓名：{{data.realname}}</span>
                <span> 准驾车型：{{data.licenseType}}</span>
              </div>
              <div class="info-item row">
                <span>档案编号：{{data.licenseNo}}</span>
                <span>身份证号:{{data.idNo}}</span>
              </div>
            </div>
            <div class="img">
              <img :src="data.headUrl" alt="">
            </div>
          </div>
          <div class="con2 row">
            该驾驶人于{{moment2(data.createTime)}}参加了道路交通安全法律法规、交通安全文明驾驶、应急处置等知识学习和交通事故案例警示教育。
          </div>
          <div class="con3">
            <div class="row">市（县、区）公安机关</div>
            <div class="row">交通管理部门（印章）</div>
            <div class="row"> 年&nbsp;&nbsp;月&nbsp;&nbsp;日</div>
          </div>
          <div class="con4">
            <div class="title">参加审验教育须知</div>
            <div class="row">
              机动车驾驶人参加审验教育不得由他人替学，不得扰乱课堂纪律，不得迟到早退，违反相关规定者取消本次参加教育资格，另行预约参加教育。
            </div>
          </div>
          <div class="con5">
            驾驶人签字：
          </div>
        </div>
      </div>
      <el-button type="primary" @click="print()">打印</el-button>
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
        detail: '/edurecord/detail'
      }
    }
  },
  computed: {
    dataAuditStatus() {
      return this.$store.state.data.dataAuditStatus
    },
    dataIdType() {
      return this.$store.state.data.dataIdType
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    // 时间转化
    moment(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    },
    moment2(time) {
      return moment(time).format('YYYY-MM-DD')
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
    },
    print() {
      this.remove_ie_header_and_footer()
      let subOutputRankPrint = document.getElementById('print')
      let newContent = subOutputRankPrint.innerHTML
      let oldContent = document.body.innerHTML
      document.body.innerHTML = newContent
      window.print()
      window.location.reload()
      return false
    },

    remove_ie_header_and_footer() {
      var hkey_path
      hkey_path = 'HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\'
      try {
        var RegWsh = new ActiveXObject('WScript.Shell')
        RegWsh.RegWrite(hkey_path + 'header', '')
        RegWsh.RegWrite(hkey_path + 'footer', '')
      } catch (e) {}
    }
  }
}
</script>

<style>
.print {
  margin-top: 20px;
}
.print .title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
}
.con1,
.con2 {
  display: flex;
  padding: 40px;
  box-sizing: border-box;
}
.info {
  flex: 1;
}
.img {
  width: 90px;
  height: 120px;
  box-sizing: border-box;
}
.img img {
  width: 100%;
  height: 100%;
}
.info-item {
  display: flex;
}
.info-item span {
  flex: 1;
}
.con3,
.con4,
.con5 {
  padding: 40px;
  box-sizing: border-box;
}
.con3 div {
  text-align: right;
}
.con5 {
  text-align: right;
  margin-right: 100px;
}
</style>

