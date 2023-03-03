package com.mysite.omok;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class GameList {
	
	private static final Game[] gameList = new Game[8];
	
	private GameList() {}
	
	public static Game[] getGameList() {
		return gameList;
	}
	
	public static List<HashMap<String, Object>> getGameJsonList() {
		List<HashMap<String, Object>> gameJsonList = new LinkedList<HashMap<String, Object>>();
		for(int i = 0; i < 8; i++) {
			if(gameList[i] != null) {
				HashMap<String, Object> gameJson = new HashMap<>();
				gameJson.put("title", gameList[i].getTitle());
				gameJson.put("index", gameList[i].getIndex());
				gameJsonList.add(gameJson);
			}
		}
		
		return gameJsonList;
	}

}