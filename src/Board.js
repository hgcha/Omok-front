import { useState, useEffect } from 'react';
import Row from './Row.js';
import decideWinner from './decideWinner.js';
import './App.css';
import { connection, connectToServer, disconnectFromServer } from './network.js';

export default function Board() {

    const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
    const [turn, setTurn] = useState('black');
    const [color, setColor] = useState(null);
    const [beforeMove, setBeforeMove] = useState({ row: null, col: null });

    useEffect(() => {
        connectToServer();
        return disconnectFromServer;
    }, []);

    useEffect(() => {
        if(connection) {
            connection.onmessage = onMessage;
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
            <p>
                {content}
            </p>
            <div>
                {rows}
            </div>
        </>
    );
}