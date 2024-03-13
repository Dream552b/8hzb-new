import { http } from "@/utils/http";


// 赛事列表
export function getHotCompetitionList(params) {
    return http.request({
        url: "/v2/hotCompetition/list",
        method: "get",
        params
    });
}

// 比赛列表
export function getMatchList(params) {
    return http.request({
        url: "/v2/match/list",
        method: "get",
        params
    });
}

// 比赛详情
export function getMatchInfo(params) {
    return http.request({
        url: "/v2/match/info",
        method: "get",
        params
    });
}

// 广告详情
export function getAdvertisement(params) {
    return http.request({
        url: "/v2/advertisement/info",
        method: "get",
        params
    });
}
