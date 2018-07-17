<template>
    <div class="user-search">
        <el-input v-model="userSearch" size="small"> </el-input>
        <el-button type="primary" size="small" @click="resetSearch()">重置</el-button>
        <el-button type="primary" size="small" icon="el-icon-search" :disabled="userSearch.length<=0" @click="StartSearch()">搜索</el-button>
    </div>
</template>
<script>
export default {
  name: 'userSearch',
  data() {
    return {
      userSearch: ''
    }
  },
  computed: {
    searchId() {
      return this.$store.state.user.searchId
    }
  },
  methods: {
    StartSearch() {
      this.$store.dispatch('updateSearchId', this.userSearch)
      this.$emit('search')
    },
    resetSearch() {
      if (this.searchId) {
        this.$store.dispatch('updateSearchId', '')
        this.$emit('search')
      }
    }
  }
}
</script>
<style>
.user-search {
  overflow: hidden;
  float: right;
}
.user-search .el-input {
  width: 200px;
}
</style>

