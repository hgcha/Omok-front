import { 
    Stack, 
    Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function GameList({ gameList, username }) {
    
    const navigate = useNavigate();
    
    return (
        <Stack spacing={5}>
            {gameList.map(game => {
                if(game !== null)
                    return (
                        <Button 
                            display={'block'}
                            w='100%' 
                            p={0} 
                            onClick={() => navigate(
                                "/game/" + game[0],
                                { state: { username: username } }
                            )}
                        >
                            <span style={{float: 'left', marginLeft: 10}}>{game[1]}</span>
                            <span style={{float: 'right', marginRight: 10}}>{game[2]} / 2</span>
                        </Button>
                    );
                else {
                    return null;
                }
            })}
        </Stack>
    );
}