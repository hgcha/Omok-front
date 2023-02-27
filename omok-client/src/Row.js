import topLeftCorner from './images/topLeftCorner.png';
import topRightCorner from './images/topRightCorner.png';
import bottomLeftCorner from './images/bottomLeftCorner.png';
import bottomRightCorner from './images/bottomRightCorner.png';
import upLine from './images/upLine.png';
import downLine from './images/downLine.png';
import leftLine from './images/leftLine.png';
import rightLine from './images/rightLine.png';
import crossLine from './images/crossLine.png';
import Square from './Square.js';

export default function Row(props) {

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
