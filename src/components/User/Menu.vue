<template>
  <div class="view-container">

    <!--面包屑导航-->
    <div class="row breadcrumb-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>菜单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="row data-container">
      <el-tree node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent" :data="menuList" :props="defaultProps">
      </el-tree>
    </div>

    <!-- 添加菜单 -->
    <el-dialog title="添加菜单" :visible.sync="addMenuDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="addMenu">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="action">
          <el-input v-model="addMenu.action"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortedOrder">
          <el-input v-model="addMenu.sortedOrder"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addMenuDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitAddmenu()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑菜单 -->
    <el-dialog title="编辑菜单" :visible.sync="editMenuDialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :model="editMenu">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editMenu.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="action">
          <el-input v-model="editMenu.action"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sortedOrder">
          <el-input v-model="editMenu.sortedOrder"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="editMenuDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitEditmenu()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 删除菜单 -->
    <el-dialog title="删除菜单" :visible.sync="delMenuDialogVisible" width="30%" :before-close="handleClose">
      <span>确认要删除该菜单？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="delMenuDialogVisible = false">取 消</el-button>
        <el-button type="danger" size="small" @click="submitDelmenu()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import menuService from '../../service/menuService.js'
export default {
  name: 'menu-list',
  data() {
    return {
      // 初始化树属性值
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 添加菜单弹窗
      addMenuDialogVisible: false,
      // 添加菜单数据
      addMenu: {
        name: '',
        action: '',
        sortedOrder: '',
        parentId: ''
      },
      // 编辑菜单弹窗
      editMenuDialogVisible: false,
      // 编辑菜单数据
      editMenu: {
        name: '',
        action: '',
        sortedOrder: '',
        id: ''
      },
      // 删除菜单弹窗
      delMenuDialogVisible: false,
      // 删除菜单数据
      delMenuId: '',
      // 菜单树
      menuList: [],
      // 父级Id
      parentId: 0,
      menuPath: {
        getPath: '/menu/all',
        addPath: '/menu/add',
        editPath: '/menu/update',
        delPath: '/menu/delete'
      }
    }
  },
  mounted() {
    // 初始化数据
    this.getMenu()
  },
  methods: {
    // 获取数据
    getMenu() {
      menuService.getMenuList(this.menuPath.getPath, {}).then(res => {
        this.menuList = res.data.data
      })
    },
    // 添加
    addMenuItem(node) {
      // 初始化数据
      this.addMenu = {
        name: '',
        action: '',
        sortedOrder: '',
        parentId: ''
      }
      this.addMenu.parentId = node.data.id
      this.addMenuDialogVisible = true
    },
    // 添加请求
    submitAddmenu() {
      this.addMenuDialogVisible = false
      menuService.addMenu(this.menuPath.addPath, this.addMenu).then(res => {
        this.getMenu()
      })
    },
    // 编辑
    editMenuItem(node) {
      this.editMenu.name = node.data.name
      this.editMenu.action = node.data.action
      this.editMenu.sortedOrder = node.data.sortedOrder
      this.editMenu.id = node.data.id
      this.editMenuDialogVisible = true
    },
    // 编辑请求
    submitEditmenu() {
      this.editMenuDialogVisible = false
      menuService.editMenu(this.menuPath.editPath, this.editMenu).then(res => {
        this.getMenu()
      })
    },
    // 删除
    delMenuItem(node) {
      this.delMenuId = node.data.id
      this.delMenuDialogVisible = true
    },
    // 删除请求
    submitDelmenu() {
      this.delMenuDialogVisible = false
      let path = ''
      menuService
        .delMenu(this.menuPath.delPath, {
          id: this.delMenuId
        })
        .then(res => {
          this.getMenu()
        })
    },
    // 关闭弹窗
    handleClose() {
      this.addMenuDialogVisible = false
      this.editMenuDialogVisible = false
      this.delMenuDialogVisible = false
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.addMenuItem(node)}>
              添加
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.editMenuItem(node)}>
              编辑
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.delMenuItem(node)}>
              删除
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>
<style>
.data-container .el-tree {
  width: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>

