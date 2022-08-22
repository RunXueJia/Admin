import Layout from '@/views/layout'
export default {
    path: '/user',
    component: Layout,
    meta: {
        title: '会员管理'
    },
    redirect: '/user_user',
    children: [
        {
            path: '/user_user',
            component: () => import('@/views/user//user'),
            meta: {
                title: '用户管理'
            },
        },
    ]
}