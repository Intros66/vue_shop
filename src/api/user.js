import service from '@/utils/request'
export function getUser(){
    return service({
        method: 'get',
        url: '/users',
        queryInfo: {
            query: '',
            pagenum: 1,
            pagesize: 1
        }
    })
}