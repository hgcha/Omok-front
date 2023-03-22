import {
    useState, 
    useEffect,
} from "react";
import { 
    useNavigate,
    useLocation,
} from "react-router-dom";
import { 
    Box,
    Flex,
    Spacer,
    Stack,
    Button,
} from '@chakra-ui/react';
import { mainServerConnection } from "../network";
import GameList from "./GameList";
import UserList from "./UserList";

export default function Main() {

    const [userList, setUserList] = useState([]);
    const [gameList, setGameList] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const intervalId = setInterval(() => {
            mainServerConnection.send(JSON.stringify({ type: "GET_INFO" }));
        }, 1000);

        mainServerConnection.onmessage = (response) => {
            const data = JSON.parse(response.data);
            setUserList(data.userList);
            setGameList(data.gameList);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Box mt={100} ml={100} w={1000} boxShadow='lg'>
            <Flex m={10}>
                <Stack w='70%' spacing={10} mb={10}>
                    <CreateGameButton nickname={location.state.nickname} />
                    <GameList gameList={gameList} nickname={location.state.nickname}/>    
                </Stack>
                <Spacer/>
                <UserList userList={userList} />
            </Flex>
        </Box>
    );      

}

function CreateGameButton({ nickname }) {

    const navigate = useNavigate();

    function handleClick() {
        mainServerConnection.onmessage = (response) => {
            const data = JSON.parse(response.data);
            if(data.status === "success") {
                navigate(
                    "/game/" + data.game.index,
                    { state: { nickname: nickname }} 
                );
            }
        };
        mainServerConnection.send(JSON.stringify({type: "CREATE_GAME"}));
    }

    return (
        <Button bg='lightblue' boxShadow='lg' onClick={handleClick}>방 만들기!</Button>
    );
}