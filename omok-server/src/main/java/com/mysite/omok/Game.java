package com.mysite.omok;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.omok.messages.SetColorMessage;

import lombok.Getter;

@Getter
public class Game {

	private String title;
	private User[] players = new User[2];
	private int index;
    private static Logger logger = LoggerFactory.getLogger(Game.class);

	public Game(String title, int index) {
		this.title = title;
		this.index = index;
	}
	
	public int acceptPlayer(User user) {
		for(int i = 0; i < 2; i++) {
			if(players[i] == null) {
				players[i] = user;
				return 0;
			}
		}
		
		return -1;
	}
	
	public int releasePlayer(User user) {
		for(int i = 0; i < 2; i++) {
			if(players[i] == user) {
				players[i] = null;
				return 0;
			}
		}
		
		return -1;
	}

	public boolean isEmpty() {
		for(int i = 0; i < 2; i++) {
			if(players[i] != null) {
				return false;
			}
		}
		
		return true;
	}
	
	public boolean isFull() {
		for(int i = 0; i < 2; i++) {
			if(players[i] == null) {
				return false;
			}
		}
		
		return true;
	}
	
	public void play() throws Exception {
    	
    	if(!this.isFull()) return;
    	
		logger.info("Game #" + this.index + " is now playing!");

		User black = players[0];
		User white = players[1];
		    	
    	ObjectMapper objectMapper = new ObjectMapper();
    	String messageToBlack = objectMapper.writeValueAsString(new SetColorMessage("black"));
    	String messageToWhite = objectMapper.writeValueAsString(new SetColorMessage("white"));
    	
    	black.getGameServerSession().getAsyncRemote().sendText(messageToBlack);
    	white.getGameServerSession().getAsyncRemote().sendText(messageToWhite);
	}

}