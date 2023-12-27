//引入Vue
import Vue from 'vue'
// 引入路由第三方包
import VueRouter from 'vue-router'

import store from '@/store'

// 在vue项目中使用vue-router进行管理
Vue.use(VueRouter)


// 引入组件
import Login from '../views/Login.vue'
import Main from '../views//Main.vue'
import PostView from '../views/postArticle/postView.vue'
import ManageView from '../views/manageArticle/manageView.vue'

const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: Main,
        redirect: "/postblog",
        children: [{
            path: "postblog",
            component: PostView
        },
        {
            path: "manageblog",
            component: ManageView
        }]
    }

]

//创建router实例，对外暴露
const router = new VueRouter({
    routes,
    mode: "history"
})


router.beforeEach((to, from, next) => {
    const isAdminLoggedIn = store.state.User !== null; // 假设状态存储了管理员登录信息

    if (to.path === '/login' && isAdminLoggedIn) {
        // 如果管理员已登录并且尝试访问登录页面，则重定向到其他页面（例如，首页）
        next('/postblog');
    } else if (!isAdminLoggedIn && to.path !== '/login') {
        // 如果管理员未登录并且尝试访问非登录页面，则重定向到登录页面
        next('/login');
    } else {
        // 其他情况放行
        next();
    }
});


export default router