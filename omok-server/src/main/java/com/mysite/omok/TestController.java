package com.mysite.omok;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnError;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;

@Service
@ServerEndpoint("/omok")
public class TestController {
    private static List<Session> clients = Collections.synchronizedList(new ArrayList<Session>());
    private static Logger logger = LoggerFactory.getLogger(TestController.class);
    private static GameRoom gameRoom = null;
    
    @OnOpen
    public void onOpen(Session session) throws Exception {
    	synchronized(clients) {
            logger.info("open session : {}, clients={}", session.toString(), clients);

            if(!clients.contains(session)) {
                clients.add(session);
                logger.info("session open : {}", session);
            } else {
                logger.info("이미 연결된 session");
            }
            
            if(clients.size() == 2) {        	
            	gameRoom = new GameRoom(clients.get(0), clients.get(1));
            }
    	}
    }

    @OnMessage
    public void onMessage(String message, Session session) throws Exception {
        if(gameRoom != null) {
        	gameRoom.sendStonePosition(session, message);
        }
    }

    @OnClose
    public void onClose(Session session) {
        logger.info("session close : {}", session);
        clients.remove(session);
        gameRoom = null;
    }
    
    @OnError
    public void onError(Throwable throwable) {
    	logger.info("error occured: {}", throwable.toString());
    }
}
