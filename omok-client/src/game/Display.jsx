import { 
    useState,
    useEffect,
} from "react";
import {
    Box,
    Text,
    Center,
} from "@chakra-ui/react";

export default function Display({ isFull, isAllReady, isPlaying, setIsPlaying, winner, turn, color, withdrawer }) {

    const [count, setCount] = useState(3);

    useEffect(() => {
        if (isAllReady) {
            if (count !== 0) {
                setTimeout(() => {
                    setCount(count => count - 1);
                }, 1000)
            } else {
                setIsPlaying(true);
                setCount(3);
            }
        }
    }, [isAllReady, count, setIsPlaying]);

    let content;
    if(winner !== null) {
        if(withdrawer !== null) {
            content = (withdrawer === color ? "기권했습니다." : (withdrawer === "white" ? "백" : "흑") + "이 기권했습니다. 당신이 승리했습니다!");
        } else {
            content = (winner === color ? "당신이 승리했습니다!" : "패배했습니다.");
        }
    } else {
        if(isPlaying) {
            content = (turn === color ? "당신 차례입니다." : "상대 차례입니다.");
        } else {
            if(isAllReady) {
                content = count + "초 후에 게임이 시작됩니다.";
            } else {
                if(isFull) {
                    content = "모두 준비되면 게임이 시작됩니다.";
                } else {
                    content = "게임할 상대를 기다리는 중입니다.";
                }
            }
        }
    }

    return (
        <Box
            p={2}
            bg='lightblue'
            boxShadow='lg'
        >
            <Center>
                <Text>{content}</Text>
            </Center>
        </Box>
    );

}