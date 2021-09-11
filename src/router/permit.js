import router from './index'
// cookie
import { getToken } from '../utils/cookie.js'
// 前置路由
router.beforeEach((to, from, next) => {
    if(getToken()){
        next();
    }else {
        if (to.path === '/login'){ // 这里是处理 login 页面的时候，没有 token
            next();
        }else {
            next({ name: 'Login' }) // 这里是处理管理后台时没有 token ，进行 path 路由指向。
        }
    }
})

// 后置路由
router.afterEach((to, from) => {
    if(to.meta.title){
        document.title = to.meta.title
    }else {
        document.title = '后台管理系统'
    }
})