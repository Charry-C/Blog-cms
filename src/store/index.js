import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//用来存储数据,最简单的实现数据响应式变化的方法就是在computed属性中
//返回属性,当属性变化时会重新计算
const state = {
    User: null,
    articleText: ""
}

//响应组件中的事件
//调用 context.commit 提交一个 mutation，
//通过 context.state 来获取 state
//通过 context.getters 来获取 getters
//可以通过解构的方式使用context对象的方法{commit,dispatch,state}
const actions = {
    actionA() {

    }
}

//唯一能用来改变Vuex中state数据的方法
const mutations = {
    changeText(state, val) {
        this.state.articleText = val
    },
    clearArticleCon(state) {
        this.state.articleText = null
    },
    clearUser(state) {
        state.User = null
    },
    addUser(state, user) {
        state.User = user
    }

}

//用来将state数据进行加工，
//当组件调用$store.getter.xxx获取getters中的返回值
//相当于组件中的computed
const getters = {

}


//创建store实例，对外暴露
const store = new Vuex.Store({
    state,
    mutations
})

export default store