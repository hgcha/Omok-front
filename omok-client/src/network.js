export let userListConnection = null;
export let connection = null;
let intervalId = null;

export function connectToUserListServer(nickname, setUserList) {
    userListConnection = new WebSocket("ws://localhost:8080/userList");
    userListConnection.onopen = () => {
        userListConnection.send(JSON.stringify({type: "SET_NICKNAME", nickname: nickname}));
        intervalId = setInterval(() => {
            userListConnection.send(JSON.stringify({type: "GET_USERLIST"}));
        }, 1000);
    };
    userListConnection.onmessage = response => {
        setUserList(JSON.parse(response.data));
    };

    console.log('Connected to user list server!');
}

export function disconnectFromUserListServer() {
    userListConnection.close();
    if(intervalId) clearInterval(intervalId);
    console.log("Disconnected from user list server!");
}

export function disconnectFromServer() {};
export function connectToServer() {};

// export function sendToServer(object) {
//     while(!connection.readyState === 1) {
//     }
//     connection.send(object);
//     console.log('Send to server: ' + object);
// }