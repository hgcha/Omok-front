package com.mysite.omok;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.omok.Member.Player;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@ServerEndpoint("/main/{nickname}")
public class MainWebsocket {

    private static Set<Player> playerSet = Collections.synchronizedSet(new HashSet<>());
    private static List<Game> gameList = GameList.getGameList();
    private static Logger logger = LoggerFactory.getLogger(MainWebsocket.class);
	private static ObjectMapper objectMapper = new ObjectMapper();
    private Player player;

    @OnOpen
    public void onOpen(Session session, @PathParam("nickname") String nickname) throws Exception {
        player = new Player(nickname, session);
        playerSet.add(player);
        logger.info(nickname + "이 입장하셨습니다.");
    }

    @OnMessage
    public void onMessage(String message, Session session) throws Exception {
        
        Map<String, String> req = objectMapper.readValue(message, new TypeReference<Map<String, String>>() {});
    	Map<String, Object> resp = new HashMap<>();

        switch (req.get("type")) {
            case "GET_INFO":
                resp.put("userList", playerSet.stream().map(Player::getUsername).toArray());
                resp.put("gameList", gameList.stream().map(Game::getInfo).toArray());

                session.getAsyncRemote().sendText(objectMapper.writeValueAsString(resp));
                break;

            case "CREATE_GAME":
                Game game = GameList.createGame();
    		    if(game != null) {
                    resp.put("status", "success");
                    resp.put("game", game);

                    session.getAsyncRemote().sendText(objectMapper.writeValueAsString(resp));
                    logger.info("새로운 게임이 생성되었습니다.");
                    return;
                }

                resp.put("status", "fail");
                session.getAsyncRemote().sendText(objectMapper.writeValueAsString(resp));
                logger.info("새로운 게임을 생성하는데 실패했습니다.");
                break;
        }
    }

    @OnClose
    public void onClose() {
        playerSet.remove(player);
        logger.info(player.getUsername() + "님이 나가셨습니다.");
    }
    
    @OnError
    public void onError(Throwable throwable) {
    	logger.info("에러가 발생했습니다: " + throwable.toString());
    }
}
