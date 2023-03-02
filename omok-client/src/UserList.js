import { useEffect, useContext, useState } from "react";
import { connectToUserListServer, disconnectFromUserListServer } from "./network";
import { NicknameContext } from "./NicknameContext";
import "./bootstrap.min.css";

export default function UserList() {
    
    const [userList, setUserList] = useState([]);
    const nickname = useContext(NicknameContext);

    useEffect(() => {
        connectToUserListServer(nickname, setUserList);
        return disconnectFromUserListServer;
    }, []);
        
    return (
        <div className="list-group list-group-flush">
            <p><b>userList</b></p>
            <ul>
                {userList.map(user => <li className="list-group-item">{user}</li>)}
            </ul>
        </div>
    );
}