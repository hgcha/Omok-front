package com.mysite.omok;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

public class GameList {
	
	private static List<Game> gameList = new LinkedList<>();
	private static Long sequenceId = 0L;

	private GameList() {}

	public static Optional<Game> getGame(int index) {
		return gameList.stream().filter(game -> game.getIndex() == index).findAny();
	}

	public static List<Game> getGameList() {
		return gameList;
	}

	public static Game createGame() {
		Game game = new Game("오목 #" + (sequenceId + 1) + "번 방", sequenceId);
		gameList.add(game);
		sequenceId++;
		return game;
	}

}