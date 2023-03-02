package com.mysite.omok;

//import java.util.Collections;
//import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@ServerEndpoint("/userList")
public class UserListController {
	
	private static Logger logger = LoggerFactory.getLogger(UserListController.class);
    	
    @OnOpen
    public void onOpen(Session session) throws Exception {
    }

    @OnMessage
    public void onMessage(String message, Session session) throws Exception {
        Map<Session, String> userList = UserList.getUserList();
        
    	ObjectMapper objectMapper = new ObjectMapper();
        Map<String, String> map = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});
        
        String type = map.get("type");
        if(type.equals("SET_NICKNAME")) {
        	String nickname = map.get("nickname");
            userList.put(session, nickname);
        	logger.info("{} is connected.", nickname);
            logger.info(userList.toString());
        } else if(type.equals("GET_USERLIST")) {
        	String userListMessage = objectMapper.writeValueAsString(userList.values());
        	session.getAsyncRemote().sendText(userListMessage);
        	logger.info("Sent a message to {}.", session.toString());
        }
    }

    @OnClose
    public void onClose(Session session) {
    	Map<Session, String> userList = UserList.getUserList();
        userList.remove(session);
        logger.info(userList.toString());
    }
    
    @OnError
    public void onError(Throwable throwable) {
    	logger.info("error occured: {}", throwable.toString());
    }
}
