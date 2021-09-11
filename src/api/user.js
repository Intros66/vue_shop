import service from '@/utils/request'
export function getUser(data){
    return service({
        method: 'get',
        url: '/users',
        data
    })
}