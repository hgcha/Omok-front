import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import axios from "axios";

export default function LoginForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return (
        <Center>
            <Card boxShadow='lg' mt={50} maxW={500} borderRadius={10}>
                <CardHeader bg='lightblue' borderTopRadius={10}>
                </CardHeader>
                <CardBody>
                    <Stack spacing={15}>
                        <Box id="error" bg='lightblue' p={2} borderRadius={3} style={{ display: 'none' }}>
                            <Text>아이디와 비밀번호를 정확히 입력했는지 확인해주세요.</Text>
                        </Box>
                        <Input 
                            type="text"
                            name="username"
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            placeholder="아이디"
                        />
                        <Input 
                            type="password"
                            name="password"
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            placeholder="비밀번호"
                        />
                        <Button
                            bg="lightblue"
                            onClick={() => {
                                axios.post("http://localhost:8080/member/login", {
                                    username: username,
                                    password: password
                                }).then(() => {
                                    sessionStorage.setItem("username", username);
                                    navigate("/main");
                                }).catch(error => {
                                    document.getElementById("error").style.display = "block";
                                })
                            }}
                        >
                            로그인
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Center>
    );
}