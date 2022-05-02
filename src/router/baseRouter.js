import Layout from '../layout/index.vue'
export default () => [
  {
    path: '/chart',
    component: Layout,
    redirect: 'chart',
    name: 'Chart',
    meta: {
      title: '图表',
      icon: 'el-icon-user-solid'
    },
    children: [
      {
        path: 'gantt',
        component: () => import('@/views/chart/gantt/index'),
        name: 'Gantt',
        meta: { title: '甘特图', icon: 'fwb' }
      },
      {
        path: 'calendar',
        component: () => import('@/views/chart/calendar/index'),
        name: 'calendar',
        meta: { title: '日历', icon: 'fwb' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: 'roleManagement',
    name: 'RoleManagement',
    meta: {
      title: '系统管理',
      icon: 'el-icon-user-solid'
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/system/role/index'),
        name: 'Role',
        meta: { title: '角色管理', icon: 'role' }
      },
      {
        path: 'menuManager',
        component: () => import('@/views/system/menuManager/index'),
        name: 'MenuManager',
        meta: { title: '菜单管理', icon: 'menu' }
      },
      {
        path: 'department',
        component: () => import('@/views/system/department/index'),
        name: 'Department',
        meta: { title: '部门管理', icon: 'dept' }
      },
      {
        path: 'dictionary',
        component: () => import('@/views/system/dictionary/index'),
        name: 'Dictionary',
        meta: { title: '字典管理', icon: 'dictionary' }
      }
    ]
  },
  {
    path: '/test',
    component: Layout,
    redirect: 'a',
    name: 'Test',
    meta: {
      title: '测试A菜单',
      icon: 'el-icon-notebook-1'
    },
    children: [
      {
        path: 'test',
        component: () => import('@/views/test/index'),
        name: 'Index',
        meta: { title: '测试' }
      },
      {
        path: 'select',
        component: () => import('@/views/test/select/index'),
        name: 'Select',
        meta: { title: '业务组件封装' }
      },
      {
        path: 'aim-point',
        component: () => import('@/views/test/aim-point/index'),
        name: 'AimPoint',
        meta: { title: 'aimPoint' }
      },
      {
        path: 'questionnaire',
        component: () => import('@/views/test/questionnaire/index'),
        name: 'Questionnaire',
        meta: { title: '添加问卷' }
      },
      {
        path: 'slot',
        component: () => import('@/views/test/slot/index'),
        name: 'Slot',
        meta: { title: 'slot' }
      },
      {
        path: 'columnChange',
        component: () => import('@/views/test/columnChange/index'),
        name: 'ColumnChange',
        meta: { title: 'columnChange' }
      },
      {
        path: 'task',
        component: () => import('@/views/test/task/index'),
        name: 'Task',
        meta: { title: 'task' }
      },
      {
        path: 'directive',
        component: () => import('@/views/test/directive/index'),
        name: 'Directive',
        meta: { title: '自定义指令' }
      },
      {
        path: 'verify',
        component: () => import('@/views/test/verify/index'),
        name: 'Verify',
        meta: { title: '验证码' }
      },
      {
        path: 'shop',
        component: () => import('@/views/test/shop/index'),
        name: 'Shop',
        meta: { title: '购物车' }
      },
      {
        path: 'tabs',
        component: () => import('@/views/test/tabs/index'),
        name: 'Tabs',
        meta: { title: 'tabs' }
      },
      {
        path: 'export',
        component: () => import('@/views/test/export/index'),
        name: 'Export',
        meta: { title: 'export' }
      },
      {
        path: 'upload',
        component: () => import('@/views/test/upload/index'),
        name: 'Upload',
        meta: { title: 'upload' }
      }
    ]
  }
]
