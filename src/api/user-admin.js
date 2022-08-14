// 管理员接口

import service from "@/utils/requset";

// 查询管理员列表
export const getUserAdminListApi = (params) => {
    return service({
        url: '/admin/sys_user/list',
        method: 'get',
        params: params
    })
}

// 查询单个管理员详情
export const getUserAdminInfoApi = (params) => {
    return service({
        url: '/admin/sys_user/rowInfo',
        method: 'get',
        params
    })
}


// 增加管理员
export const addUserAdminApi = (data) => {
    return service({
        url: '/admin/sys_user/add',
        method: 'post',
        data: data
    })
}

// 修改管理员
export const editUserAdminApi = (data) => {
    return service({
        url: '/admin/sys_user/update',
        method: 'post',
        data: data
    })
}
// 删除管理员
export const delUserAdminInfoApi = (params) => {
    return service({
        url: '/admin/sys_user/del',
        method: 'get',
        params: params
    })
}


