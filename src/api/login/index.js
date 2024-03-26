import { http } from "@/utils/http";


// 登录
export function login(data) {
    return http.request({
        url: "/v2/user/login",
        method: "post",
        data,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    });
}

// 注册
export function register(data) {
    return http.request({
        url: "/v2/user/register",
        method: "post",
        data,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    });
}

// 用户详情
export function getUserInfo(params) {
    return http.request({
        url: "/v2/user/info",
        method: "get",
        params
    });
}

export function downloadLog(data) {
    return http.request({
        url: "/v2/downloadLog/create",
        method: "post",
        data,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    });
}