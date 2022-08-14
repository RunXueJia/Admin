import service from "@/utils/requset";

// 获取全部菜单信息
export const getMenuListApi = () => {
    return service({
        url: '/admin/sys_menu/allData',
        method: 'get',
    })
}


// 添加菜单信息
export const addMenuApi = (data) => {
    return service({
        url: '/admin/sys_menu/add',
        method: 'post',
        data,
    })
}

// 编辑菜单信息
export const editMenuApi = (data) => {
    return service({
        url: '/admin/sys_menu/update',
        method: 'post',
        data,
    })
}
// 获取菜单信息详情
export const getMenuInfoApi = (params) => {
    return service({
        url: '/admin/sys_menu/rowInfo',
        method: 'get',
        params,
    })
}

// 删除
export const delMenuApi = (params) => {
    return service({
        url: '/admin/sys_menu/del',
        method: 'get',
        params,
    })
}

