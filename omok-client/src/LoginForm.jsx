import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    connectToMainServer,
    mainServerConnection,
} from "./network";
import {
    Center,
    Card,
    CardHeader,
    CardBody,
    Text,
    Box,
    Input,
    Button,
    Stack
} from "@chakra-ui/react"

export default function LoginForm() {

    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    return (
        <Center>
            <Card boxShadow='lg' mt={50} maxW={500} borderRadius={10}>
                <CardHeader bg='lightblue' borderTopRadius={10}>
                    <Text>오목</Text>
                </CardHeader>
                <CardBody>
                    <Stack spacing={15}>
                        <Text>닉네임을 입력해주세요.</Text>
                        <Box id="error" bg='lightblue' p={2} borderRadius={3} style={{ display: 'none' }}>
                            <Text>서버와의 연결 도중 에러가 발생했습니다.</Text>
                        </Box>
                        <Input 
                            name="nickname"
                            value={nickname} 
                            onChange={e => setNickname(e.target.value)} 
                        />
                        <Button
                            bg="lightblue"
                            onClick={() => {
                                connectToMainServer(nickname);
                                mainServerConnection.onerror = () => {
                                    document.getElementById("error").style.display = "block";
                                };
                                mainServerConnection.onopen = () => {
                                    navigate("/main", { state: { nickname: nickname }});
                                };
                            }}
                        >
                            연결
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Center>
    );
}