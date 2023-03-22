export let mainServerConnection = null;
export let gameServerConnection = null;
let intervalId = null;

export function connectToMainServer(nickname) {
    mainServerConnection = new WebSocket("ws://localhost:8080/main/" + nickname);
}

export function disconnectFromMainServer() {
    mainServerConnection.close();
    if (intervalId !== null) clearInterval(intervalId);
    console.log("Disconnected from main server!");
}

export function connectToGameServer(index, nickname) {
    gameServerConnection = new WebSocket("ws://localhost:8080/game/" + index + "/" + nickname);
}

export function disconnectFromGameServer() {
    gameServerConnection.close();
}