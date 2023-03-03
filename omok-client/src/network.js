export let mainServerConnection = null;
export let gameServerConnection = null;
let intervalId = null;

export function connectToMainServer() {
    mainServerConnection = new WebSocket("ws://localhost:8080/main");
}

//     mainServerConnection.onmessage = response => {
//         const data = JSON.parse(response.data);
//         console.log(data.gameList);
//         console.log(data.userList);
//         setGameList(data.gameList);
//         setUserList(data.userList); 
//     };

//     console.log('Connected to main server!');
// }

export function disconnectFromMainServer() {
    mainServerConnection.close();
    if(intervalId === null) clearInterval(intervalId);
    console.log("Disconnected from main server!");
}

export function connectToGameServer(index) {
    gameServerConnection = new WebSocket("ws://localhost:8080/game/" + index);
}

export function disconnectFromGameServer() {
    gameServerConnection.close();
}