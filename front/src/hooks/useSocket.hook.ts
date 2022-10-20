import { reactive, ref } from "vue";
import { io, type Socket } from "socket.io-client";
import { useAuth } from "./useAuth.hook";
import * as controllers from '~/socket';

const socket = ref<Socket>();
const state = reactive({
  connected: false,
  disconnected: false,
});

export function useSocket() {
    const {token} = useAuth();

    function createSocketConnection(url = "http://localhost:3002") {
        console.log("-> url", url);

        if (state.connected) return;

        socket.value = io(url, {
            secure: false,
            auth: {
                token: token.value 
            },
        });

        socket.value.on("connect", () => {
            state.connected = true;
        });

        socket.value.on("disconnect", () => {
            state.disconnected = false;
        });

        Object.entries(controllers).forEach(([name, controller]) => {
            socket.value?.on(name, controller);
        });
    }

    function connect() {
        if (state.connected) return;

        socket.value?.connect();
    }

    function disconnect() {
        if (state.disconnected) return;

        socket.value?.disconnect();
    }

    function send(event: string, data?: any, callback?: (args: any) => void) {
        if (callback) {
            socket.value?.emit(event, data, callback);
        } else {
            socket.value?.emit(event, data);
        }
    }

    return {
        createSocketConnection,
        socket,
        state,
        send,
        connect,
        disconnect,
    };
}