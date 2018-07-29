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

// 视频管理
import VideoList from '@/components/Video/List'
import VideoDetail from '@/components/Video/Detail'
import VideoCategory from '@/components/Video/Category'
import VideoCheck from '@/components/Video/CheckConfig'
import VideoNotice from '@/components/Video/Notice'


// 驾驶人管理
import DriverList from '@/components/Driver/List'
import DriverDetail from '@/components/Driver/Detail'

// 试题管理
import QuestionList from '@/components/Question/List'
import QuestionCategory from '@/components/Question/Category'
import QuestionCheck from '@/components/Question/CheckConfig'
import QuestionDetail from '@/components/Question/Detail'
import QuestionNotice from '@/components/Question/Notice'

// 预约管理
import BookList from '@/components/Book/List'


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
        },{
          path: '/home',
          name: 'home',
          component: Home
        }, {
          path: '/book/list',
          component: BookList
        }, {
          path: '/question/category',
          component: QuestionCategory
        }, {
          path: '/question/check',
          component: QuestionCheck
        }, {
          path: '/question/list',
          component: QuestionList
        }, {
          path: '/question/detail',
          component: QuestionDetail
        },{
          path: '/question/notice',
          component: QuestionNotice
        }, {
          path: '/driver/list',
          component: DriverList
        }, {
          path: '/driver/detail',
          component: DriverDetail
        }, {
          path: '/video/list',
          component: VideoList
        }, {
          path: '/video/detail',
          component: VideoDetail
        }, {
          path: '/video/category',
          component: VideoCategory
        }, {
          path: '/video/check',
          component: VideoCheck
        },{
          path: '/video/notice',
          component: VideoNotice
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
