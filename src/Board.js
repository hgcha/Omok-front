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

export default function Board() {
    
    const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));

    const firstRow = [];
    firstRow.push(<Square line={topLeftCorner}/>);
    for(let i = 0; i < 17; i++)
        firstRow.push(<Square line={upLine}/>);
    firstRow.push(<Square line={topRightCorner}/>);

    const middleRows = [];
    for(let i = 0; i < 17; i++) {
        const middleRow = [];
        middleRow.push(<Square line={leftLine}/>);
        for(let i = 0; i < 17; i++)
            middleRow.push(<Square line={crossLine}/>);
        middleRow.push(<Square line={rightLine}/>);

        middleRows.push(<div>{middleRow}</div>);    
    }

    const lastRow = [];
    lastRow.push(<Square line={bottomLeftCorner}/>);
    for(let i = 0; i < 17; i++)
        lastRow.push(<Square line={downLine}/>);
    lastRow.push(<Square line={bottomRightCorner}/>);

    return (
        <>
            <div style = {{
                clear: 'both',
                content: '',
                display: 'table'
            }}>
                {firstRow}            
            </div>
            {middleRows}
            <div style = {{
                clear: 'both',
                content: '',
                display: 'table'
            }}>
                {lastRow}
            </div>
        </>
    );
}

function Square({ line }) {

    const [stone, setStone] = useState(null);

    let content = null;
    if(stone === 'white') {
        content = <img src={whiteStone} width='25px' height='25px' style={{position: 'relative', top: '-28px', left: '1px', zIndex: 1}}/>;
    } else if(stone === 'black') {
        content = <img src={blackStone} width='25px' height='25px' style={{position: 'relative', top: '-28px', left: '1px', zIndex: 1}}/>;
    }
    return (
        <div className='square' onClick={() => {
            setStone('white');
        }}>
            <img src={line} width='25px' height='25px' style={{position: 'relative', top: '0px', left: '0px', zIndex: 0}}/>
            {content}
        </div>
    );
}