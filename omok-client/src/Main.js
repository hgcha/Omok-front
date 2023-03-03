import { useState, useEffect, useContext } from "react";
import { connectToMainServer, disconnectFromMainServer, mainServerConnection } from "./network";
import CreateGame from "./CreateGame";
import GameList from "./GameList";
import UserList from "./UserList";

export default function Main({ setGameIndex }) {

    const [userList, setUserList] = useState([]);
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            mainServerConnection.send(JSON.stringify({ type: "GET_INFO" }));
        }, 1000);

        mainServerConnection.onmessage = (response) => {
            const data = JSON.parse(response.data);
            console.log(data);
            setUserList(data.userList);
            setGameList(data.gameList);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <CreateGame setGameIndex={setGameIndex} />
            <GameList gameList={gameList} setGameIndex={setGameIndex} />
            <UserList userList={userList} />
        </>
    );

}