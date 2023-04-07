import {
    useContext,
    useState,
} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Text,
    Center,
} from "@chakra-ui/react";
import axios from "axios"
import { useEffect } from "react";
import { LoginContext } from "./LoginContext";

function convertDatetime(datetime) {

    const result = datetime.split('T');
    
    return result[0] + " " + result[1].substring(0, 8);
} 

export default function Profile() {

    const [member, setMember] = useState(null);
    const { username } = useContext(LoginContext);

    useEffect(() => {
        axios.get("http://localhost:8080/member?username=" + username)
            .then(response => {
                setMember(response.data);
            }).catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <Center>
            <Card mt={100} ml={100} w={1000} boxShadow='lg' borderRadius={10}>
                <CardHeader backgroundColor={'lightblue'} borderTopRadius={10}>
                </CardHeader>
                <CardBody>
                    {
                        member ? (
                            <div>
                                <Text>
                                    아이디: {member['username']} <br/>
                                    이메일: {member['email']} <br/>
                                    플레이한 게임 수: {member['numberOfGamesPlayed']} <br/>
                                    승리한 게임 수: {member['numberOfGamesWon']} <br/>
                                    승률: {Math.round(member['numberOfGamesWon'] / member['numberOfGamesPlayed'] * 100) + "%"} <br/>
                                    마지막 로그인: {convertDatetime(member['lastLogin'])} <br/>
                                    가입일: {convertDatetime(member['joinedAt'])} <br/>
                                </Text>
                            </div>
                        ) : "데이터를 로딩 중입니다."
                    }
                </CardBody>
            </Card>
        </Center>
    );
}