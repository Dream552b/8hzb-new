import { http } from "@/utils/http";


// 登录
export function login(data) {
    return http.request({
        url: "/api/v2/user/login",
        method: "post",
        data,
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
    });
}
