import Layout from '@/views/layout'
export default {
    path: '/content',
    component: Layout,
    meta: {
        title: '内容管理'
    },
    redirect: '/content_cate',
    children: [
        {
            path: '/content_cate',
            component: () => import('@/views/content/cate'),
            meta: {
                title: '分类管理'
            },
        },
        {
            path: '/content_tag',
            component: () => import('@/views/content/tag'),
            meta: {
                title: '标签管理'
            },
        },
        {
            path: '/content_article',
            component: () => import('@/views/content/article'),
            meta: {
                title: '文章管理'
            },
        },
        {
            path: '/content_addArticle',
            component: () => import('@/views/content/article/addArticle.vue'),
            meta: {
                title: '新增文章'
            },
        },
        {
            path: '/content_editArticle',
            component: () => import('@/views/content/article/editArticle.vue'),
            meta: {
                title: '修改文章'
            },
        }
    ]
}