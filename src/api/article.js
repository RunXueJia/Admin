import service from "@/utils/requset";

// 查询文章列表
export const getArticleListApi = (params) => {
    return service({
        url: '/admin/ydd_article/list',
        ///admin/ydd_article/list
        method: 'get',
        params,
    })
}

// 查询单个文章
export const getArticleInfoApi = (id) => {
    return service({
        url: '/admin/ydd_article/rowInfo/?id=' + id,
        method: 'get',
    })
}


// 增加文章
export const addArticleApi = (data) => {
    return service({
        url: '/admin/ydd_article/add',
        method: 'post',
        data,
    })
}

// 修改文章
export const editArticleApi = (data) => {
    return service({
        url: '/admin/ydd_article/update',
        method: 'post',
        data,
    })
}
// 删除文章
export const delArticleInfoApi = (id) => {
    return service({
        url: '/admin/ydd_article/del/?id=' + id,
        method: 'get',
    })
}