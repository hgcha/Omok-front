import axios from 'axios';
import { useContext } from 'react';
import Board from './Board';
import { NicknameContext } from './NicknameContext';

export default function CreateGame() {

    const nickname = useContext(NicknameContext);

    function handleClick() {
        axios.post("http://localhost:8080/createGame", {user: nickname}, {withCredentials: true})
            .then(response => {
                const index = response.data.index;
                return <Board index={index}/>;
            });
    }

    return (
        <button onClick={handleClick}>방 만들기!</button>
    );
}