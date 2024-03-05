
/**
 * 通用js方法封装处理
 */

// 日期格式化
export function parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
        return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        } else if (typeof time === 'string') {
            time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 已过去了多少分钟  只用在足球
export function getMinutesPassed(timeObj) {
    const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳（单位：秒）

    if (!timeObj.statusID) {
        timeObj.statusID = timeObj.matchStatus
    }
    if (timeObj.statusID === 3) {
        return '45'
    }
    let timePassed = Math.floor((currentTime - timeObj.liveTime) / 60); // 已经过去的分钟数

    timePassed = timePassed + 1 //纳米计算公式


    if (timeObj.statusID === 2) {
        //上半场
        timePassed = timePassed + 1
        if (timePassed > 45) {
            timePassed = 45
        }
    }
    if (timeObj.statusID === 4) {
        //下半场
        timePassed = timePassed + 1 + 45//纳米计算公式

    }

    if (timePassed > 90) {
        timePassed = 90
    }
    return timePassed;
}


// 秒转分秒
export function secondsToMinutesAndSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes
    remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
    return minutes + ':' + remainingSeconds
}
