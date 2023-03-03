import { gameServerConnection } from './network.js';
import whiteStone from './images/whiteStone.png';
import blackStone from './images/blackStone.png';
import { useContext } from 'react';
import { NicknameContext } from './NicknameContext.js';

export default function Square({ line, rowNumber, position, board, setBoard, turn, setTurn, color, winner, setBeforeMove }) {

    const nickname = useContext(NicknameContext);

    function handleClick() {
        if (board[rowNumber][position])
            return;

        const nextBoard = board.map(row => {
            return row.slice()
        });

        nextBoard[rowNumber][position] = color;
        
        const StonePositionMessage = {
            type: 'GET_OPPONENT_POSITION',
            nickname: nickname,
            color: color,
            row: rowNumber,
            col: position
        };

        gameServerConnection.send(JSON.stringify(StonePositionMessage));
        setTurn(turn === 'white' ? 'black' : 'white');
        setBeforeMove({row: rowNumber, col: position});
        setBoard(nextBoard);
    }

    let stone = null;
    if (board[rowNumber][position] === 'white') {
        stone = <img src={whiteStone} width='25px' height='25px' alt='whiteStone' style={{ position: 'relative', top: '-28px', left: '1px', zIndex: 1 }} />;
    } else if (board[rowNumber][position] === 'black') {
        stone = <img src={blackStone} width='25px' height='25px' alt='blackStone' style={{ position: 'relative', top: '-28px', left: '1px', zIndex: 1 }} />;
    } else {
        stone = null;
    }

    return (
        <div className='square' onClick={() => {
            if(!winner && turn === color)
                handleClick();
        }}>
            <img src={line} width='25px' height='25px' alt='pattern' style={{ position: 'relative', top: '0px', left: '0px', zIndex: 0 }} />
            {stone}
        </div>
    );
}