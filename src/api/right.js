import service from '../utils/request'

// 获取权限列表
export function getRights(type){
    return service({
        method: 'get',
        url: `/rights/${type}`
    })
}
// 获取角色列表
export function getRoles(){
    return service({
        method: 'get',
        url: '/roles'
    })
}
// 删除角色或权限
export function deleteRightOrRole(roleId, rightId){
    return service({
        method: 'delete',
        url: `roles/${roleId}/rights/${rightId}`
    })
}

// 角色授权
export function authRole(roleId, data){
    return service({
        method: 'post',
        url: `/roles/${roleId}/rights`,
        data
    })
}

// 分配用户角色
export function disRole(roleId, data){
    return service({
        method: 'put',
        url: `/users/${roleId}/role`,
        data
    })
}