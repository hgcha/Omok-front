export let connection = null;

export function connectToServer() {
    connection = new WebSocket("ws://localhost:8080/omok");
    console.log('Connected to server!');
}

export function disconnectFromServer() {
    connection.close();
    console.log("Disconnected from server!");
}