<template>
  <el-aside width="250px">
    <el-menu default-active="1" :router="true" :unique-opened="true" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
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
export default {
  name: 'Aside',
  computed: {
    asideList() {
      return this.$store.state.aside.asideList
    }
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    toString(item) {
      return item.tostring()
    }
  }
}
</script>
<style>
.el-aside {
  height: 100%;
  background: #545c64;
  overflow: auto;
}
</style>

