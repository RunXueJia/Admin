import service from "@/utils/requset";

export const LoginApi = (data) => service({
    url: '/admin/index/login',
    data,
    method: 'post'
})
//
export const GetUserInfoApi = () => service({
    url: '/admin/index/profile',
    method: 'post'
})

export const upImageApi = (data) => service({
    url: '/admin/common/upload?type=images',
    method: 'post',
    data
})
//获取会员列表

export const getUserListApi = (params) => {
    return service({
        url: '/admin/ydd_user/list',
        ///admin/ydd_User/list
        method: 'get',
        params,
    })
}

// 查询单个标签
export const getUserInfoApi = (id) => {
    return service({
        url: '/admin/ydd_user/rowInfo/?id=' + id,
        method: 'get',
    })
}


// 增加标签
export const addUserApi = (data) => {
    return service({
        url: '/admin/ydd_user/add',
        method: 'post',
        data,
    })
}

// 修改标签
export const editUserApi = (data) => {
    return service({
        url: '/admin/ydd_user/update',
        method: 'post',
        data,
    })
}
// 删除标签
export const delUserInfoApi = (id) => {
    return service({
        url: '/admin/ydd_user/del/?id=' + id,
        method: 'get',
    })
}