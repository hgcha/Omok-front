package com.mysite.omok;

import jakarta.websocket.Session;
import lombok.Getter;

@Getter
public class User {

	private String nickname;
	private Session session;
	private Session gameServerSession;
	private Game game = null;
	
	public User(String nickname, Session session) {
		this.nickname = nickname;
		this.session = session;
	}
	
	public void enterGame(Game game) {
		game.acceptPlayer(this);
		this.game = game;
	}
	
	public void leaveGame(Game game) {
		game.releasePlayer(this);
		this.game = null;
	}

	public void setGameServerSession(Session session) {
		this.gameServerSession = session;
	}
}