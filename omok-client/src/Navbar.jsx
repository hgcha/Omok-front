import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Spacer,
    Flex,
} from "@chakra-ui/react";
import { PlayContext } from "./PlayContext";

export default function Navbar() {

    const username = sessionStorage.getItem("username");
    const isLogin = username === null ? false : true;
    const { isPlaying } = useContext(PlayContext);
    const navigate = useNavigate();

    return (
        <Flex backgroundColor={'lightblue'} h={75}>
            <Button ml={'2.5%'} mt={15} mr={'1%'} h={45} onClick={() => {
                if (isLogin)
                    navigate("/main");
                else
                    navigate("/")
            }} isDisabled={isPlaying} 
            display={isLogin ? "block" : "none"}
            >
                게임 대기방
            </Button>
            <Button mt={15} mr={10} h={45} onClick={() => {
                if (isLogin)
                    navigate("/profile");
                else
                    navigate("/");
            }} isDisabled={isPlaying} 
            display={isLogin ? "block" : "none"}
            >
                프로필 보기
            </Button>
            <Spacer/>
            <Button
                mt={15} mr={'1%'} h={45}
                display={isLogin ? "block" : "none"}
                onClick={() => {
                    sessionStorage.removeItem("username");
                    navigate("/");
                }}
                isDisabled={isPlaying}
            >
                로그아웃
            </Button>
            <Button
                mt={15} mr={'2.5%'} h={45}
                onClick={() => {
                    navigate("/signup");
                }}
                display={isLogin ? "none" : "block"}
            >
                회원가입
            </Button>
        </Flex>
    )
}