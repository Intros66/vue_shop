import service from '@/utils/request'
export function FindMenuTree(){
    return service({
        method: 'get',
        url: '/menus'
    })
}