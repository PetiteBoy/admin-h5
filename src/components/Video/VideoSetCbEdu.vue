<template>
    <div class="view-container">
        <!--面包屑导航-->
        <div class="row breadcrumb-container">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>审验教育视频学习设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="row cb-edu">
            <el-form ref="form" :model="cbEduDate" label-width="150px">
                <el-form-item label="分类视频数量控制">
                    <el-switch :disabled="noEditStatus" v-model="cbEduDate.delivery"></el-switch>
                </el-form-item>
                <el-form-item v-for="(item, index) in categotyDate" :label="item.name" :key="index">
                    <el-input :disabled="noEditStatus" v-model="cbEduDate.categoty[index]"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button @click="noEditStatus = false">编辑</el-button>
                    <el-button type="primary" @click="save()">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
  name: 'cb-edu',
  data() {
    return {
      // 审验教育配置
      cbEduDate: {
        delivery: false,
        categoty: ['', '', '']
      },
      categotyDate: [
        {
          name: '分类1'
        },
        {
          name: '分类2'
        },
        {
          name: '分类3'
        }
      ],
      //   不可编辑状态
      noEditStatus: true
    }
  },
  methods: {
    //   保存
    save() {
      this.noEditStatus = true
    }
  }
}
</script>

<style>
.cb-edu .el-input {
  width: 100px;
}
</style>

