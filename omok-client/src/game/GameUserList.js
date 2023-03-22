import {
    Card,
    CardHeader,
    CardBody,
    Center,
    Stack,
    Divider
} from "@chakra-ui/react";

export default function GameUserList({ gameUserList }) {
    
    return (
        <Card w={150} float='right'>
            <CardHeader bg='lightblue' fontSize={15} borderTopRadius={10}>
                <Center>유저 목록</Center>
            </CardHeader>
            <Stack spacing={4}>
                {
                    gameUserList.map((gameUser, idx) =>
                        <>
                            <CardBody maxH={30}>
                                <Center>
                                    {gameUser.nickname} {gameUser.ready ? "✅" : ""} 
                                </Center>
                            </CardBody>
                            { idx === gameUserList.length - 1 ? <Divider/> : null}
                        </>
                    )
                }
            </Stack>
        </Card>
    );

}