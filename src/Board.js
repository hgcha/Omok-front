import { useState } from 'react';
import topLeftCorner from './images/topLeftCorner.png';
import topRightCorner from './images/topRightCorner.png';
import bottomLeftCorner from './images/bottomLeftCorner.png';
import bottomRightCorner from './images/bottomRightCorner.png';
import upLine from './images/upLine.png';
import downLine from './images/downLine.png';
import leftLine from './images/leftLine.png';
import rightLine from './images/rightLine.png';
import crossLine from './images/crossLine.png';
import whiteStone from './images/whiteStone.png';
import blackStone from './images/blackStone.png';
import './App.css';
import decideWinner from './decideWinner';

export default function Board() {

    const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
    const [isBlackTurn, setIsBlackTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const rows = [];
    for (let i = 0; i < 19; i++) {
        rows.push(<Row rowNumber={i}
            board={board}
            setBoard={setBoard}
            isBlackTurn={isBlackTurn}
            setIsBlackTurn={setIsBlackTurn}
            winner={winner}
            setWinner={setWinner}
        />);
    }

    let content;
    if(winner) {
        content = 'Winner: ' + (winner === 'B' ? 'Black' : 'White');
    } else {
        content = 'Next turn: ' + (isBlackTurn ? 'Black' : 'White');
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

function Row(props) {

    let leftmost;
    let middle;
    let rightmost;

    if (props.rowNumber === 0) {
        leftmost = topLeftCorner;
        middle = upLine;
        rightmost = topRightCorner;
    } else if (props.rowNumber === 18) {
        leftmost = bottomLeftCorner;
        middle = downLine;
        rightmost = bottomRightCorner;
    } else {
        leftmost = leftLine;
        middle = crossLine;
        rightmost = rightLine;
    }

    const row = [];
    row.push(<Square line={leftmost} position={0} {...props} />);
    for (let i = 1; i <= 17; i++)
        row.push(<Square line={middle} position={i} {...props} />);
    row.push(<Square line={rightmost} position={18} {...props} />);

    return (
        <div>
            {row}
        </div>
    );
}

function Square({ line, rowNumber, position, board, setBoard, isBlackTurn, setIsBlackTurn, winner, setWinner }) {

    function handleClick() {
        if (board[rowNumber][position])
            return;

        const nextBoard = board.map(row => {
            return row.slice();
        });

        if (isBlackTurn) {
            nextBoard[rowNumber][position] = 'B';
        } else {
            nextBoard[rowNumber][position] = 'W';
        }

        setWinner(decideWinner({row: rowNumber, col: position}, nextBoard));
        setIsBlackTurn(!isBlackTurn);
        setBoard(nextBoard);
    }

    let stone = null;
    if (board[rowNumber][position] === 'W') {
        stone = <img src={whiteStone} width='25px' height='25px' alt='whiteStone' style={{ position: 'relative', top: '-28px', left: '1px', zIndex: 1 }} />;
    } else if (board[rowNumber][position] === 'B') {
        stone = <img src={blackStone} width='25px' height='25px' alt='blackStone' style={{ position: 'relative', top: '-28px', left: '1px', zIndex: 1 }} />;
    } else {
        stone = null;
    }

    return (
        <div className='square' onClick={() => {
            if(!winner)
                handleClick();
        }}>
            <img src={line} width='25px' height='25px' alt='pattern' style={{ position: 'relative', top: '0px', left: '0px', zIndex: 0 }} />
            {stone}
        </div>
    );
}