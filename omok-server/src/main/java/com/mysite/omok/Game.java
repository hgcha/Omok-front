package com.mysite.omok;

import jakarta.websocket.Session;
import lombok.Getter;

@Getter
public class Game {

	private String title;
	private Session[] players = new Session[2];

	public Game(String title, Session player) {
		this.title = title;
		players[0] = player;
	}
}
