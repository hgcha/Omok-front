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

export default function SignupForm() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    return (
        <Center>
            <Card boxShadow='lg' mt={50} maxW={500} borderRadius={10}>
                <CardHeader bg='lightblue' borderTopRadius={10}>
                </CardHeader>
                <CardBody>
                    <Stack spacing={15}>
                        <Box id="error" bg='lightblue' p={2} borderRadius={3} style={{ display: 'none' }}>
                            <Text>오류가 발생했습니다.</Text>
                        </Box>
                        <Input 
                            type="text"
                            name="username"
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            placeholder="아이디"
                        />
                        <Input 
                            type="text"
                            name="email"
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                            placeholder="이메일"
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
                                axios.post("http://localhost:8080/member/signup", {
                                    username: username,
                                    email: email,
                                    password: password
                                }).then(response => {
                                    console.log(response);
                                    navigate("/");
                                }).catch(() => {
                                    document.getElementById("error").style.display = "block";
                                })
                            }}
                        >
                            회원가입
                        </Button>
                    </Stack>
                </CardBody>
            </Card>
        </Center>
    );
}