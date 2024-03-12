import { reactive } from "vue";
import { io } from "socket.io-client";

export const socketState = reactive({
    connected: false,
    matchOdds: [],
    matchLive: [],
    matchStatusIDChange: {}
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "/socketIo";

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
    // console.log('matchOdds', args[0]);

});

socket.on("matchLive", (...args) => {
    if (args[0].code !== 200) return
    socketState.matchLive = args[0].data
    // console.log('matchLive', args);

});

// 中场
socket.on("matchStatusIDChange", (...args) => {
    console.log('中场matchStatusIDChange', args);

    if (args[0].code !== 200) return
    socketState.matchStatusIDChange = args[0].data
    // console.log('matchLive', args);

});



socket.on("bar", (...args) => {
    socketState.barEvents.push(args);
    console.log('bar', args);

});