<template>
  <el-aside width="250px">
    <el-menu default-active="1" :router="true" :unique-opened="true" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-submenu v-for="aside in asideList" :key="aside.id" :index="aside.name">
        <template slot="title">
          <span>{{aside.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item,index) in aside.children" :key="index" :index="`${item.action}?pageId=${item.id}`">{{item.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
import baseService from '../service/baseService.js'
export default {
  name: 'Aside',
  data() {
    return {
      asideList: [],
      path: '/bguser/menu'
    }
  },
  mounted() {
    this.getUserMenu()
  },
  methods: {
    getUserMenu() {
      baseService.basePostData(this.path).then(res => {
        this.asideList = res.data.data
      })
    }
  }
}
</script>
<style>
.el-aside {
  height: 100%;
  overflow: auto;
  background: #545c64;
}
</style>

