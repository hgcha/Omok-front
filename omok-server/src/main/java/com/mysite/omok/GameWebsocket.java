package com.mysite.omok;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.omok.messages.GameUserListMessage;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Component
@ServerEndpoint("/game/{gameIndex}/{nickname}")
public class GameWebsocket {

	private static List<Game> gameList = GameList.getGameList();
	private static ObjectMapper objectMapper = new ObjectMapper();
	private static Logger logger = LoggerFactory.getLogger(GameWebsocket.class);
	private Game game;
	private User user;

	@OnOpen
	public void onOpen(Session session, @PathParam("gameIndex") int gameIndex, @PathParam("nickname") String nickname) throws Exception {
		Optional<Game> optionalGame = GameList.getGame(gameIndex);
		if (optionalGame.isPresent()) {
			game = optionalGame.get();
			user = new User(nickname, session);
			game.acceptPlayer(user);

			// 게임에 있는 모든 유저에게 게임 유저 리스트를 보냄.
			Set<User> players = game.getPlayers();
			String message = objectMapper.writeValueAsString(
					new GameUserListMessage(objectMapper.writeValueAsString(players.stream().map(User::getInfo).toArray()))
			);
			for (User player : game.getPlayers()) {
				player.getSession().getAsyncRemote().sendText(message);
			}

			logger.info(nickname + "님이 게임 #" + gameIndex + "에 접속하였습니다.");
		}
	}

	@OnMessage
	public void onMessage(String message, @PathParam("gameIndex") int gameIndex, @PathParam("nickname") String nickname) throws Exception {

		Map<String, String> req = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});
		Optional<User> opponent = game.getOpponent(nickname);
		switch (req.get("type")) {
			case "GET_OPPONENT_POSITION", "GIVE_UP" ->
				opponent.ifPresent(value -> value.getSession().getAsyncRemote().sendText(message));
			case "OPPONENT_READY_STATE" -> {
				User player = game.findPlayerByNickname(nickname);
				player.setReady(Boolean.parseBoolean(req.get("ready")));
				opponent.ifPresent(value -> value.getSession().getAsyncRemote().sendText(message));
				if (game.isAllReady()) {
					game.play();
					logger.info("게임 #" + gameIndex + "가 시작되었습니다.");
				}
			}
		}
	}

	@OnClose
	public void onClose(@PathParam("gameIndex") int gameIndex, @PathParam("nickname") String nickname) throws Exception {
		game.releasePlayer(user);
		logger.info(nickname + "님이 게임 #" + gameIndex + "에서 나갔습니다.");

		// 게임에 남아 있는 사람이 없는 경우 게임 종료.
		if(game.isEmpty()) {
			gameList.remove(game);
			logger.info("게임 #" + gameIndex + "가 종료되었습니다.");
			return;
		}

		// 게임에 남아 있는 사람이 있는 경우 남은 사람에게 게임 유저 리스트를 보냄.
		Set<User> players = game.getPlayers();
		String message = objectMapper.writeValueAsString(
				new GameUserListMessage(objectMapper.writeValueAsString(players.stream().map(User::getInfo).toArray()))
		);
		Optional<User> opponent = game.getOpponent(nickname);
		if(opponent.isPresent()) {
			opponent.get().getSession().getAsyncRemote().sendText(message);
		}
	}

	@OnError
	public void onError(Throwable throwable) {
		logger.info("에러가 발생했습니다: " + throwable.toString());
	}

}
