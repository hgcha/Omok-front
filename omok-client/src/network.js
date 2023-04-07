export let mainServerConnection = null;
export let gameServerConnection = null;

export function connectToMainServer(nickname) {
    mainServerConnection = new WebSocket("ws://localhost:8080/main/" + nickname);
}

export function disconnectFromMainServer() {
    mainServerConnection.close();
    console.log("Disconnected from main server!");
}

export function connectToGameServer(index, nickname) {
    gameServerConnection = new WebSocket("ws://localhost:8080/game/" + index + "/" + nickname);
}

export function disconnectFromGameServer() {
    gameServerConnection.close();
}