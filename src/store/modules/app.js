import { setToken, setUsername, getUsername, removeToken, removeUsername } from '@/utils/cookie'
import { Login, Logout } from '@/api/login';

const state = {
    token: '',
    username: '' || getUsername()
}
const getters = {}

const actions = {
    loginAction(content, requestData) {
        return  new Promise((resolve, reject) => {
            Login(requestData).then( response => {
                let data = response.data;
                content.commit('SET_TOKEN', data.token);
                content.commit('SET_USERNAME', data.username);
                setToken(data.token);
                setUsername(data.username);
                resolve(response);
            }).catch( error => {
                reject(error);
            })
        })
    },
    logoutAction({ commit }) {
        return  new Promise((resolve, reject) => {
            Logout().then( response => {
                removeToken();
                removeUsername();
                commit('SET_TOKEN', '');
                commit('SET_USERNAME', '');
                resolve(response);
            }).catch( error => {
                reject(error);
            })
        })
    }
}

const mutations = {
    SET_TOKEN(state, value){
        state.token = value
    },
    SET_USERNAME(state, value){
        state.username = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}