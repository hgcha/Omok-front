import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Text,
    Spacer,
    Flex,
} from "@chakra-ui/react";
import { LoginContext } from "./LoginContext";
import { PlayContext } from "./PlayContext";

export default function Navbar() {

    const { isLogin, setIsLogin } = useContext(LoginContext);
    const { isPlaying, setIsPlaying } = useContext(PlayContext);
    const navigate = useNavigate();

    return (
        <Flex backgroundColor={'lightblue'} h={75}>
            <Text p={25} mr={'10%'}>
                오목
            </Text>
            <Button mt={15} mr={'1%'} h={45} onClick={() => {
                if (isLogin)
                    navigate("/main");
                else
                    navigate("/")
            }} isDisabled={isPlaying}>
                게임 대기방
            </Button>
            <Button mt={15} mr={10} h={45} onClick={() => {
                if (isLogin)
                    navigate("/profile");
                else
                    navigate("/");
            }} isDisabled={isPlaying}>
                프로필 보기
            </Button>
            <Spacer/>
            <Button
                mt={15} mr={'1%'} h={45}
                display={isLogin ? "block" : "none"}
                onClick={() => {
                    setIsLogin(false);
                    navigate("/");
                }}
                isDisabled={isPlaying}
            >
                로그아웃
            </Button>
            <Button
                mt={15} mr={'1%'} h={45}
                display={isLogin ? "none" : "block"}
                onClick={() => {
                    navigate("/");
                }}
            >
                로그인
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