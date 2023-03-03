import { useState, useEffect, useContext } from 'react';
import Row from './Row.js';
import decideWinner from './decideWinner.js';
import './App.css';
import { gameServerConnection, connectToGameServer, disconnectFromGameServer, disconnectFromMainServer, mainServerConnection } from './network.js';
import './bootstrap.min.css'
import { NicknameContext } from './NicknameContext.js';

export default function Board({ gameIndex, setGameIndex }) {

    const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
    const [turn, setTurn] = useState('black');
    const [color, setColor] = useState(null);
    const [beforeMove, setBeforeMove] = useState({ row: null, col: null });
    const nickname = useContext(NicknameContext);

    console.log('board: ' + gameIndex);

    useEffect(() => {
        mainServerConnection.onmessage = null;

        connectToGameServer(gameIndex);
        gameServerConnection.onopen = () => {
            gameServerConnection.send(JSON.stringify({ type: "ENTER_GAME", nickname: nickname }));
        }
        return () => {
            gameServerConnection.send(JSON.stringify({ type: "LEAVE_GAME", nickname: nickname }));
            disconnectFromGameServer();
        }
    }, []);

    useEffect(() => {
        if (gameServerConnection) {
            gameServerConnection.onmessage = onMessage;
        }
    }, [onMessage]);

    function onMessage(message) {
        const data = JSON.parse(message.data);
        switch (data['type']) {
            case 'SET_STONE_COLOR':
                setColor(data.color);
                console.log('Setted to ' + data.color + '!');
                break;
            case 'GET_OPPONENT_POSITION':
                const nextBoard = board.map(row => {
                    return row.slice();
                });

                const row = data.row;
                const col = data.col;
                nextBoard[row][col] = data.color;

                setBoard(nextBoard);
                setBeforeMove({ row: row, col: col });
                if (data.color === 'white') {
                    setTurn('black');
                } else {
                    setTurn('white');
                }

                break;
            default:
                break;
        }
    }

    function handleLeaveButtonClick() {
        gameServerConnection.send(JSON.stringify({ type: "GAME_LEAVE", nickname: nickname }));
        setGameIndex(null);
    }

    const winner = decideWinner(beforeMove, board);

    let content;
    if (winner) {
        content = 'Winner: ' + (winner === 'black' ? 'Black' : 'White');
    } else {
        if (turn === color) {
            content = 'Your turn!';
        } else {
            content = 'Waiting for opponent...';
        }
    }

    const rows = [];
    for (let i = 0; i < 19; i++) {
        rows.push(<Row rowNumber={i}
            board={board}
            setBoard={setBoard}
            turn={turn}
            setTurn={setTurn}
            color={color}
            winner={winner}
            setBeforeMove={setBeforeMove}
        />);
    }

    return (
        <>
            <div className='d-block p-2 text-bg-primary rounded mb-3 shadow'>
                {content}
            </div>
            <button onClick={handleLeaveButtonClick}>
                LEAVE
            </button>
            <div className='d-block rounded shadow bg-white'>
                {rows}
            </div>
        </>
    );
}