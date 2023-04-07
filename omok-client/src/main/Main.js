import {
    useState, 
    useEffect,
    useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { 
    Box,
    Flex,
    Spacer,
    Stack,
    Button,
    Center,
} from '@chakra-ui/react';
import { connectToMainServer, disconnectFromMainServer, mainServerConnection } from "../network";
import GameList from "./GameList";
import UserList from "./UserList";
import { LoginContext } from "../LoginContext";

export default function Main() {

    const [userList, setUserList] = useState([]);
    const [gameList, setGameList] = useState([]);
    const { username } = useContext(LoginContext);

    useEffect(() => {
        connectToMainServer(username);
        
        let intervalId;
        mainServerConnection.onopen = () => {
            intervalId = setInterval(() => {
                mainServerConnection.send(JSON.stringify({ type: "GET_INFO" }));
            }, 1000);
        };

        mainServerConnection.onmessage = (response) => {
            const data = JSON.parse(response.data);
            setUserList(data.userList);
            setGameList(data.gameList);
        }

        return () => {
            disconnectFromMainServer();
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Center>
            <Box mt={100} ml={100} w={1000} boxShadow='lg'>
                <Flex m={10}>
                    <Stack w='70%' spacing={10} mb={10}>
                        <CreateGameButton username={username} />
                        <GameList gameList={gameList} username={username}/>    
                    </Stack>
                    <Spacer/>
                    <UserList userList={userList} />
                </Flex>
            </Box>
        </Center>
    );      

}

function CreateGameButton({ username }) {

    const navigate = useNavigate();

    function handleClick() {
        mainServerConnection.onmessage = (response) => {
            const data = JSON.parse(response.data);
            if(data.status === "success") {
                navigate(
                    "/game/" + data.game.index,
                    { state: { username: username }} 
                );
            }
        };
        mainServerConnection.send(JSON.stringify({type: "CREATE_GAME"}));
    }

    return (
        <Button bg='lightblue' boxShadow='lg' onClick={handleClick}>방 만들기!</Button>
    );
}