import { reactive } from "vue";
import { io } from "socket.io-client";

export const socketState = reactive({
    connected: false,
    matchOdds: [],
    matchLive: [],
    matchStatusIDChange: {},
    matchRoomOnlineUserNum: 0,
    matchLiveStatusChange: {}
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? "/socketIo" : "/socketIo";

export const socket = io("", { path: URL });

socket.on("connect", () => {
    socketState.connected = true;
    console.log('connect');

});

socket.on("disconnect", () => {
    socketState.connected = false;
    console.log('disconnect');

});

socket.on("matchOdds", (...args) => {
    if (args[0].code !== 200) return
    socketState.matchOdds = args[0].data
    // console.log('matchOdds',args);

});

socket.on("matchLive", (...args) => {
    if (args[0].code !== 200) return
    socketState.matchLive = args[0].data

    // console.log('matchLive', args);

});

// 中场
socket.on("matchStatusIDChange", (...args) => {
    // console.log('中场matchStatusIDChange', args);
    if (args[0].code !== 200) return
    socketState.matchStatusIDChange = args[0].data
    // console.log('matchLive', args);

});


// 在线人数
socket.on("matchRoomOnlineUser", (...args) => {
    // console.log('matchRoomOnlineUser', args);
    if (args[0].code !== 200) return
    socketState.matchRoomOnlineUserNum = args[0].data

});

// 详情比赛房间推送-主播流状态推送
socket.on("matchLiveStatusChange", (...args) => {
    // console.log('matchRoomOnlineUser', args);
    if (args[0].code !== 200) return
    socketState.matchLiveStatusChange = args[0].data

});




socket.on("bar", (...args) => {
    socketState.barEvents.push(args);
    console.log('bar', args);

});