

import service from "@/utils/requset";

// 获取全部角色信息
export const getRolesListApi = (params) => {
    return service({
        url: '/admin/sys_role/list',
        method: 'get',
        params,
    })
}

// 获取角色 全部
export const getRolesAllApi = () => {
    return service({
        url: '/admin/sys_role/allData',
        method: 'get',
    })
}

// 获取角色详情
export const getRolesInfoApi = (params) => {
    return service({
        url: '/admin/sys_role/rowInfo',
        method: 'get',
        params
    })
}


// 添加角色 
export const addRolesApi = (data) => {
    return service({
        url: '/admin/sys_role/add',
        method: 'post',
        data,
    })
}


// 修改角色 
export const editRolesApi = (data) => {
    return service({
        url: '/admin/sys_role/update',
        method: 'post',
        data,
    })
}


// 删除角色 
export const delRolesApi = (params) => {
    return service({
        url: '/admin/sys_role/del',
        method: 'get',
        params,
    })
}