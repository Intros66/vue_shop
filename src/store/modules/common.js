import { FindMenuTree } from "../../api/menu";

// 菜单列表
const state = {
    menuList = null
}

const getters = {}

const actions = {
    getMenuList(content, requestData) {
        return  new Promise((resolve, reject) => {
            FindMenuTree(requestData).then( response => {
                console.log(response);
                let data = response.data;
                // content.commit('SET_MENULIST', data.token);
                resolve(response);
            }).catch( error => {
                reject(error);
            })
        })
    },
}

const mutations = {
    SET_MENULIST(state, value){
        state.menuList = value
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
