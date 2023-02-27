package com.mysite.omok;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.omok.messages.SetColorMessage;

import jakarta.websocket.Session;

public class GameRoom {

	private Session white;
	private Session black;
    private static Logger logger = LoggerFactory.getLogger(GameRoom.class);

	public GameRoom(Session black, Session white) throws Exception {
    	logger.info("Created new gameRoom!");

		this.black = black;
		this.white = white;
		    	
    	ObjectMapper objectMapper = new ObjectMapper();
    	String messageToBlack = objectMapper.writeValueAsString(new SetColorMessage("black"));
    	String messageToWhite = objectMapper.writeValueAsString(new SetColorMessage("white"));
    	
    	black.getAsyncRemote().sendText(messageToBlack);
    	white.getAsyncRemote().sendText(messageToWhite);
	}
	
	public void sendStonePosition(Session sender, String position) throws Exception {
//		logger.info("sender: {}, position: {}", sender, position);
        Session receiver = null;
		if(sender == white) {
			receiver = black;
		} else {
			receiver = white;
		}
		
		if(receiver.isOpen()) {
			receiver.getAsyncRemote().sendText(position);	
		} else {
			logger.info("receiver logged out!");
		}
	}
}
