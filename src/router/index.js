import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/layout/index.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      title: "登录"
    },
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '/consoleIndex',
        name: 'ConsoleIndex',
        meta: {
          title: "首页"
        },
        component: () => import('../views/console/index.vue')
      }
    ]
  },
  // 用户管理
  {
    path: '/userList',
    name: 'users',
    component: Layout,
    children: [
      {
        path: '/users',
        name: 'Users',
        meta: {
          title: "用户列表"
        },
        component: () => import('../views/user/index.vue')
      }
    ]
  },
  // 权限管理
  {
    path: '/role_right',
    name: 'role',
    component: Layout,
    children: [
      {
        path: '/rights',
        name: 'Rights',
        meta: {
          title: '权限列表'
        },
        component: () => import('../views/power/Rights.vue')
      }
    ]
  }

];

const router = new VueRouter({
  routes,
});

export default router;
