export default function decideWinner(previousStonePosition, board) {

    let startPoints = [
        //Checking horizontal line
        {
            row: previousStonePosition.row,
            col: Math.max(0, previousStonePosition.col - 4)
        },
        //Checking vertical line
        {
            row: Math.max(0, previousStonePosition.row - 4),
            col: previousStonePosition.col
        },
        //Checking \ diagonal line
        {
            row: Math.max(0, previousStonePosition.row - 4),
            col: Math.max(0, previousStonePosition.col - 4)
        },
        //Checking / diagonal line
        {
            row: Math.max(0, previousStonePosition.row - 4),
            col: Math.min(18, previousStonePosition.col + 4)
        }
    ];

    let endPoints = [
        //Checking horizontal line
        {
            row: previousStonePosition.row,
            col: Math.min(18, previousStonePosition.col + 4)
        },
        //Checking vertical line
        {
            row: Math.min(18, previousStonePosition.row + 4),
            col: previousStonePosition.col
        },
        //Checking \ diagonal line
        {
            row: Math.min(18, previousStonePosition.row + 4),
            col: Math.min(18, previousStonePosition.col + 4)
        },
        //Checking / diagonal line
        {
            row: Math.min(18, previousStonePosition.row + 4),
            col: Math.max(0, previousStonePosition.col - 4)
        }
    ];

    let move = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1]
    ];

    for(let i = 0; i < 4; i++) {
        let row = startPoints[i].row;
        let col = startPoints[i].col;
        let dr = move[i][0];
        let dc = move[i][1];
        let maxCount = 0;
        let count = 0;
        let length = Math.max(endPoints[i].row - startPoints[i].row, endPoints[i].col - startPoints[i].col) + 1;

        for(let j = 0; j < length; j++) {
            if(board[row][col] === board[previousStonePosition.row][previousStonePosition.col]) {
                count++;
            } else {
                maxCount = Math.max(maxCount, count);
                count = 0;
            }
    
            row += dr;
            col += dc;           
        }

        if(maxCount === 5) {
            return board[previousStonePosition.row][previousStonePosition.col];
        }
    }

    return null;
}