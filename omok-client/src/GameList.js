import { useState, useEffect } from 'react';
import axios from 'axios';
import Board from './Board';
import './bootstrap.min.css';
import { connectToServer, disconnectFromServer } from './network';

export default function GameList() {
    
    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        const id = setInterval(() => {
            axios.get("http://localhost:8080/gameList", { withCredentials: true })
                .then(response => setGameList(response.data));
        }, 1000);

        connectToServer();
        
        return () => {
            clearInterval(id);
            disconnectFromServer();
        }, []});
    
    function handleClick(index) {
        return <Board index={index}/>;
    }

    return (
        <div className='card'>
            <ul>
                {gameList.map((game, index) => {
                    return (
                        <li>
                            <div className='card-body' sonClick={() => handleClick(index)}>
                                {game.name} :: {game.numPlayers} / 2
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}