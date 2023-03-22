import { Box } from "@chakra-ui/react";
import { gameServerConnection } from "../network";
import decideWinner from "./decideWinner";
import whiteStone from "./images/whiteStone.png";
import blackStone from "./images/blackStone.png";

export default function Square({ 
    line, 
    row, 
    col, 
    board, 
    setBoard, 
    turn, 
    setTurn, 
    color, 
    winner, 
    setWinner,
    isPlaying
 }) {

    function handleClick() {
        if (board[row][col])
            return;

        const nextBoard = board.map(row => {
            return row.slice()
        });
        nextBoard[row][col] = color;
        gameServerConnection.send(JSON.stringify({
            type: 'GET_OPPONENT_POSITION',
            color: color,
            row: row,
            col: col,
        }));
        setWinner(decideWinner({
            row: row,
            col: col,
        }, nextBoard));
        setTurn(turn === 'white' ? 'black' : 'white');
        setBoard(nextBoard);
    }

    return (
        <Box
            display="inline-block"
            onClick={() => {
                if (!winner && turn === color && isPlaying)
                    handleClick();
            }}
        >
            <img src={line} width='25px' height='25px' alt='line' style={{ zIndex: 0 }} />
            {
                board[row][col] === "black" ?
                <img src={blackStone} width='25px' height='25px' alt='blackStone' style={{ position: 'relative', top: '-28px', left: '1px', zIndex: 1 }} />
                : board[row][col] === "white" ?
                <img src={whiteStone} width='25px' height='25px' alt='whiteStone' style={{ position: 'relative', top: '-28px', left: '1px', zIndex: 1 }} />
                : null
            }
        </Box>
    );
}