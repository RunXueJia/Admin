import service from "@/utils/requset";

// 查询标签列表
export const getTagListApi = (params) => {
    return service({
        url: '/admin/ydd_tag/list',
        method: 'get',
        params,
    })
}

// 查询单个标签
export const getTagInfoApi = (id) => {
    return service({
        url: '/admin/ydd_tag/rowInfo/?id=' + id,
        method: 'get',
    })
}


// 增加标签
export const addTagApi = (data) => {
    return service({
        url: '/admin/ydd_tag/add',
        method: 'post',
        data,
    })
}

// 修改标签
export const editTagApi = (data) => {
    return service({
        url: '/admin/ydd_tag/update',
        method: 'post',
        data,
    })
}
// 删除标签
export const delTagInfoApi = (id) => {
    return service({
        url: '/admin/ydd_tag/del/?id=' + id,
        method: 'get',
    })
}