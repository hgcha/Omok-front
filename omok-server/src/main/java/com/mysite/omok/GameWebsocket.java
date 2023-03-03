package com.mysite.omok;

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
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;

@Service
@ServerEndpoint("/game/{gameIndex}")
public class GameWebsocket {

	private Game[] gameList = GameList.getGameList();
	private List<User> userList = UserList.getUserList();
	private static ObjectMapper objectMapper = new ObjectMapper();
	private static Logger logger = LoggerFactory.getLogger(GameWebsocket.class);

	@OnOpen
	public void onOpen(Session session) throws Exception {
	}

	@OnMessage
	public void onMessage(String message, Session session, @PathParam("gameIndex") int gameIndex) throws Exception {

		
		Map<String, String> req = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {
		});

		
		String type = req.get("type");
		String nickname = req.get("nickname");


		System.out.println(type);
		System.out.println(nickname);
		System.out.println(gameIndex);
		
		Game currentGame = null;
		for (Game game : gameList) {
			if (game != null && game.getIndex() == gameIndex) {
				currentGame = game;
				break;
			}
		}
				
		User currentUser = null;
		for (User user : userList) {
			System.out.println(user.getNickname());
			if (user.getNickname().equals(nickname)) {
				currentUser = user;
				break;
			}
		}
		
		switch (type) {
		case "ENTER_GAME":
			currentUser.setGameServerSession(session);
			currentGame.acceptPlayer(currentUser);
			if (currentGame.isFull()) {
				System.out.println("full!");
				currentGame.play();
			}
			break;
		case "LEAVE_GAME":
			currentGame.releasePlayer(currentUser);
			break;
		case "GET_OPPONENT_POSITION":
			Session receiver = null;
			for (User player : currentGame.getPlayers()) {
				System.out.println(player.getNickname());
				if (!player.getNickname().equals(nickname)) {
					receiver = player.getGameServerSession();
				}
			}

			if (receiver.isOpen()) {
				receiver.getAsyncRemote().sendText(message);
			} else {
				logger.info("receiver logged out!");
			}
		}
	}

	@OnClose
	public void onClose(Session session) {
	}

	@OnError
	public void onError(Throwable throwable) {
	}

}
