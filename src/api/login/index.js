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

// 用户详情
export function getUserInfo(params) {
    return http.request({
        url: "/v2/user/info",
        method: "get",
        params
    });
}