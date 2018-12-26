// 路由配置
const router = [
  {
    path: '/home',
    component: resolve => require(['../page/home.vue'], resolve),
    children: [
      {
        path: '/user',
        name: 'user',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/index.vue'], resolve)
      },
      {
        path: '/user_detail',
        name: 'user_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/detail.vue'], resolve)
      },
      {
        path: '/chooce_system',
        name: 'chooce_system',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/user/sendSystem.vue'], resolve)
      },
      {
        path: '/system',
        name: 'system',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/zhnySystem/index.vue'], resolve)
      },
      {
        path: '/system_detail',
        name: 'system_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/zhnySystem/detail.vue'], resolve)
      },
      {
        path: '/article',
        name: 'article',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/article/index.vue'], resolve)
      },
      {
        path: '/creat_article',
        name: 'creat_article',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/article/creatArticle.vue'], resolve)
      },
      {
        path: '/edit_article',
        name: 'edit_article',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/article/editArticle.vue'], resolve)
      },
      {
        path: '/check_article',
        name: 'check_article',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/article/checkArticle.vue'], resolve)
      },
      {
        path: '/notice_article',
        name: 'notice_article',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/article/notice.vue'], resolve)
      },
      {
        path: '/notification_detail',
        name: 'notification_detail',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/notification/detail.vue'], resolve)
      },
      {
        path: '/notification',
        name: 'notification',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/notification/index.vue'], resolve)
      },
      {
        path: '/news',
        name: 'news',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/news/index.vue'], resolve)
      },
      {
        path: '/news_article',
        name: 'news_article',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/news/checkArticle.vue'], resolve)
      },
      {
        path: '/device_index',
        name: 'device_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/deviceType/index.vue'], resolve)
      },
      {
        path: '/study',
        name: 'study',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/study/index.vue'], resolve)
      },
      {
        path: '/device_creat',
        name: 'device_creat',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/deviceType/creat.vue'], resolve)
      },
      {
        path: '/device_edit',
        name: 'device_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/deviceType/edit.vue'], resolve)
      },
      {
        path: '/system_index',
        name: 'system_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/index.vue'], resolve)
      },
      {
        path: '/system_creat',
        name: 'system_creat',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/creat.vue'], resolve)
      },
      {
        path: '/system_edit',
        name: 'system_edit',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/system/edit.vue'], resolve)
      },
      {
        path: '/devices_index',
        name: 'devices_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/device/index.vue'], resolve)
      },
      {
        path: '/farm_system_index',
        name: 'farm_system_index',
        meta: {
          requireAuth: true,
          permission: []
        },
        component: resolve => require(['../view/farmSystem/index.vue'], resolve)
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    component: resolve => require(['../page/login.vue'], resolve)
  },
  {
    path: '*',
    name: 'Page404',
    component: resolve => require(['../page/404.vue'], resolve)
  }
]

export default router
