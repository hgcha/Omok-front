import {
    Card,
    CardBody,
    CardHeader,
    Divider,
    Center,
    Stack
} from '@chakra-ui/react';

export default function UserList({ userList }) {

    return (
        <Card mt={10} mb={10} w={150} float='right'>
            <CardHeader bg='lightblue' fontSize={15} borderTopRadius={10}>
                <Center>유저 목록</Center>
            </CardHeader>
            <Stack spacing={1}>
                {userList.map(user => 
                    <div key={user}>
                        <CardBody>
                            <Center>
                                {user}
                            </Center>
                        </CardBody>
                        <Divider />
                    </div>
                )}
            </Stack>
        </Card>
    );
}