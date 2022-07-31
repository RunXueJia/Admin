import service from "@/utils/requset";

// 查询标签列表
export const getCateListApi = (params) => {
    return service({
        url: '/admin/ydd_cate/list',
        ///admin/ydd_cate/list
        method: 'get',
        params,
    })
}

// 查询单个标签
export const getCateInfoApi = (id) => {
    return service({
        url: '/admin/ydd_cate/rowInfo/?id=' + id,
        method: 'get',
    })
}


// 增加标签
export const addCateApi = (data) => {
    return service({
        url: '/admin/ydd_cate/add',
        method: 'post',
        data,
    })
}

// 修改标签
export const editCateApi = (data) => {
    return service({
        url: '/admin/ydd_cate/update',
        method: 'post',
        data,
    })
}
// 删除标签
export const delCateInfoApi = (id) => {
    return service({
        url: '/admin/ydd_cate/del/?id=' + id,
        method: 'get',
    })
}