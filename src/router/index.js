import Vue from 'vue'
import Router from 'vue-router'
// 登录
import Login from '@/components/Login.vue'
// 首页
import Home from '@/components/Home.vue'
import Bm from '@/components/Bm.vue'
// 用户管理
import Admin from '@/components/User/Admin.vue'
import Role from '@/components/User/Role.vue'
import Permission from '@/components/User/Permission.vue'
import Menu from '@/components/User/Menu.vue'
import Log from '@/components/User/Log.vue'


Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      component: Login
    }, {
      path: '/login',
      component: Login
    },
    {
      path: '/bm',
      component: Bm,
      children: [{
          path: '/',
          name: 'home',
          component: Home
        }, {
          path: '/user/admin',
          name: 'admin',
          component: Admin
        },
        {
          path: '/user/role',
          name: 'role',
          component: Role
        },
        {
          path: '/user/permission',
          name: 'permission',
          component: Permission
        },
        {
          path: '/user/menu',
          name: 'menu',
          component: Menu
        },
        {
          path: '/user/log',
          name: 'log',
          component: Log
        }
      ]
    }
  ]
})
