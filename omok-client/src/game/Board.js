import { Box } from '@chakra-ui/react';
import Row from './Row.js';

export default function Board(props) {

    const rows = [];
    for (let i = 0; i < 19; i++) {
        rows.push(
            <Row 
                row={i}
                {...props}
            />
        );
    }

    return (
        <Box display="inline-block">
            {rows}
        </Box>
    );
}