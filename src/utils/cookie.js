import Cookies from 'js-cookie'

// 变量
const tokenKey = 'token'
const usernameKey = 'username'
// 获取token
export function getToken(){ return Cookies.get(tokenKey); }
// 写入token
export function setToken(value){ return Cookies.set(tokenKey, value); }
// 删除token
export function removeToken(){ return Cookies.remove(tokenKey); }
// 获取username
export function getUsername(){ return Cookies.get(usernameKey); }
// 写入username
export function setUsername(value){ return Cookies.set(usernameKey, value); }
// 删除username
export function removeUsername(){ return Cookies.remove(usernameKey); }