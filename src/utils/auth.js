import Cookies from "js-cookie";

const TokenKey = 'VUE-ADMIN-TOKEN'

export const setToken = (token) => Cookies.set(TokenKey, token)
export const getToken = () => Cookies.get(TokenKey)
export const removeToken = () => Cookies.remove(TokenKey)