import dayjs from 'dayjs'

export const ShowImg = (url) => process.env.VUE_APP_ApiUrl + '/' + url

export const TimeToStr = (time) => dayjs(time).format('YYYY-MM-DD') 