import { useContext } from 'react';
import Board from './Board';
import { mainServerConnection } from './network';
import { NicknameContext } from './NicknameContext';

export default function CreateGame({ setGameIndex }) {

    const nickname = useContext(NicknameContext);

    function handleClick() {
        mainServerConnection.onmessage = (response) => {
            const data = JSON.parse(response.data);
            console.log(data);
            if(data.status === "success") {
                setGameIndex(data.index);
            }
        };
        mainServerConnection.send(JSON.stringify({type: "CREATE_GAME", nickname: nickname}));
    }

    return (
        <button onClick={handleClick}>방 만들기!</button>
    );
}