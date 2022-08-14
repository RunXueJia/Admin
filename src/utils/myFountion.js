import dayjs from 'dayjs'

export const ShowImg = (url) => process.env.VUE_APP_ApiUrl + '/' + url

export const TimeToStr = (time) => dayjs(time).format('YYYY-MM-DD')

export function tranListToTreeData(list, rootValue) {
    const arr = []
    // console.log(list);

    // 遍历数组每个元素  询问是否有pid为rootValue （即0）
    list.forEach(item => {
        if (item.meta.pid === rootValue) {
            const children = tranListToTreeData(list, item.id)
            if (children.length) item.children = children
            arr.push(item)
        }
    })
    return arr
}
