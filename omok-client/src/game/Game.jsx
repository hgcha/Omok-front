import {
    useState,
    useEffect,
    useContext,
} from "react";
import {
    Flex,
    Stack,
    Box,
    Button,
    Spacer,
    Center,
} from "@chakra-ui/react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import {
    mainServerConnection,
    gameServerConnection,
    connectToGameServer,
    disconnectFromGameServer,
} from "../network";
import Board from "./Board";
import GameUserList from "./GameUserList";
import decideWinner from "./decideWinner";
import Display from "./Display";
import axios from "axios";
import { LoginContext } from "../LoginContext";
import { PlayContext } from "../PlayContext";

export default function Game() {

    const { username } = useContext(LoginContext);
    const { gameIndex } = useParams();
    const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));
    const [turn, setTurn] = useState("black");
    const [color, setColor] = useState(null);
    const [winner, setWinner] = useState(null);
    const [gameUserList, setGameUserList] = useState([{ 
        username: username, 
        ready: false,
    }]);
    const { isPlaying, setIsPlaying } = useContext(PlayContext);
    const [withdrawer, setWithdrawer] = useState(null);
    const isFull = gameUserList.length === 2;
    const isAllReady = isFull && gameUserList.every(gameUser => gameUser.ready === true);
    const navigate = useNavigate();

    function init() {
        setBoard(Array(19).fill(Array(19).fill(null)));
        setTurn("black");
        setColor(null);
        setWinner(null);
        setGameUserList(gameUserList.map(gameUser => {
            return { ...gameUser, ready: false };
        }));
        setIsPlaying(false);
        setWithdrawer(null);
    }

    function reportResult() {
        axios.post("http://localhost:8080/gameRecord", {
            winnerColor: color,
            winner: username,
            loser: gameUserList.find(gameUser => gameUser.username !== username).username
        })
    }

    useEffect(() => {
        console.log(username);
        mainServerConnection.onmessage = null;
        connectToGameServer(gameIndex, username);

        return () => {
            disconnectFromGameServer();
        }
    }, [gameIndex, username]);

    useEffect(() => {
        if (gameServerConnection) {
            gameServerConnection.onmessage = (message) => {
                const data = JSON.parse(message.data);
                let nextGameUserList;
                switch (data['type']) {
                    case "GAME_USERLIST":
                        console.log(JSON.parse(data.gameUserList));
                        setGameUserList(JSON.parse(data.gameUserList));
                        break;
                    case "OPPONENT_READY_STATE":
                        nextGameUserList = gameUserList.map(gameUser => {
                            return { ...gameUser };
                        });
                        console.log("OPPONENT_READY_STATE", nextGameUserList, data);
                        console.log("OPPONENT_READY_STATE_DATA_READY", data.ready)
                        nextGameUserList.find(gameUser => gameUser.username === data.username).ready = data.ready;
                        setGameUserList(nextGameUserList);
                        break;
                    case 'SET_STONE_COLOR':
                        setColor(data.color);
                        console.log('Setted to ' + data.color + '!');
                        break;
                    case 'GET_OPPONENT_POSITION':
                        const nextBoard = board.map(row => {
                            return row.slice();
                        });
                        nextBoard[data.row][data.col] = data.color;
                        setWinner(decideWinner({
                            row: data.row,
                            col: data.col,
                        }, nextBoard));
                        setBoard(nextBoard);
                        setTurn(data.color === "white" ? "black" : "white");
                        break;
                    case "GIVE_UP":
                        setWithdrawer(data.color);
                        setWinner(data.color === "white" ? "black" : "white");
                        setIsPlaying(false);
                        break;
                    case "OPPONENT_CHAT":
                        break;
                    default:
                        break;
                }
            }
        }
    });

    return (
        <Center>
            <Box mt={20} w={1000}>
                <Flex>
                    <Stack spacing={4} w="70%">
                        <Display 
                            isFull={isFull}
                            isAllReady={isAllReady}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            winner={winner}
                            turn={turn}
                            color={color}
                            withdrawer={withdrawer}
                            init={init}
                            reportResult={reportResult}
                        />
                        <Flex>
                            <Button
                                onClick={() => navigate(-1)}
                                boxShadow="lg"
                                w="45%"
                                isDisabled={isPlaying}
                            >
                                나가기
                            </Button>
                            <Spacer />
                            {
                                isPlaying ?
                                    <Button
                                        boxShadow="lg"
                                        w="45%"
                                        onClick={() => {
                                            gameServerConnection.send(JSON.stringify({
                                                type: "GIVE_UP",
                                                color: color,
                                            }));
                                            setIsPlaying(false);
                                            setWinner(color === "white" ? "black" : "white");
                                            setWithdrawer(color);
                                        }}
                                    >
                                        기권하기
                                    </Button>
                                    :
                                    <Button
                                        boxShadow="lg"
                                        w="45%"
                                        onClick={() => {
                                            const nextGameUserList = gameUserList.map(gameUser => {
                                                return { ...gameUser };
                                            });
                                            console.log(nextGameUserList);
                                            const readyState = nextGameUserList.find(gameUser => gameUser.username === username).ready;
                                            gameServerConnection.send(JSON.stringify({ 
                                                type: "OPPONENT_READY_STATE",
                                                username: username,
                                                ready: !readyState,
                                            }));
                                            nextGameUserList.find(gameUser => gameUser.username === username).ready = !readyState;
                                            setGameUserList(nextGameUserList);
                                        }}
                                    >
                                        준비
                                    </Button>

                            }
                        </Flex>
                        <Center>
                            <Board
                                board={board}
                                setBoard={setBoard}
                                turn={turn}
                                setTurn={setTurn}
                                color={color}
                                winner={winner}
                                setWinner={setWinner}
                                isPlaying={isPlaying}
                            />
                        </Center>
                    </Stack>
                    <Spacer />
                    <GameUserList gameUserList={gameUserList} />
                </Flex>
            </Box>
        </Center>
    );
}