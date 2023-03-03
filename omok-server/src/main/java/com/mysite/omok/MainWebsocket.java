package com.mysite.omok;

import java.util.HashMap;
import java.util.List;
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

@Service
@ServerEndpoint("/main")
public class MainWebsocket {
	
	private static Logger logger = LoggerFactory.getLogger(MainWebsocket.class);
	private static ObjectMapper objectMapper = new ObjectMapper();
    private List<User> userList = UserList.getUserList();
    private Game[] gameList = GameList.getGameList();
    
    @OnOpen
    public void onOpen(Session session) throws Exception {
    }

    @OnMessage
    public void onMessage(String message, Session session) throws Exception {
        
        Map<String, String> request = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});
    	Map<String, Object> response = new HashMap<>();

        String type = request.get("type");
        if(type.equals("LOGIN")) {
        	String nickname = request.get("nickname");
            userList.add(new User(nickname, session));
            logger.info(userList.toString());
        } else if(type.equals("GET_INFO")) {
        	
        	// cannot send List<String>
        	response.put("userList", UserList.getUserNicknameList());
        	response.put("gameList", GameList.getGameJsonList());
        	
        	session.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
        	logger.info("Sent a message to {}.", session.toString());
        } else if(type.equals("CREATE_GAME")) {
        	logger.info("CREATE_GAME request received");
        	for(int i = 0; i < gameList.length; i++) {
    			if(gameList[i] == null) {
    				gameList[i] = new Game("오목 #" + i + "번 방", i);
    				response.put("status", "success");
    	    		response.put("index", String.valueOf(i));
    	    		
    	        	session.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
    				return;
    			}
    		}
    		
        	response.put("status", "fail");
        	session.getAsyncRemote().sendText(objectMapper.writeValueAsString(response));
        }
    }

    @OnClose
    public void onClose(Session session) {
    	for(User user : userList) {
    		if(user.getSession() == session) {
    			userList.remove(user);		
    		}
    	}
        logger.info(userList.toString());
    }
    
    @OnError
    public void onError(Throwable throwable) {
    	logger.info("error occured: {}", throwable.toString());
    }
}
