package com.mysite.omok;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mysite.omok.Member.Player;
import com.mysite.omok.messages.SetColorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Getter
@RequiredArgsConstructor
public class Game {

	private static final Logger logger = LoggerFactory.getLogger(Game.class);
	private static final ObjectMapper objectMapper = new ObjectMapper();
	private final Set<Player> players = new HashSet<>();
	private final String title;
	private final Long index;

	public boolean acceptPlayer(Player player) {
		if(isFull()) {
			return false;
		}

		return players.add(player);
	}
	
	public boolean releasePlayer(Player player) {
		if(isEmpty()) {
			return false;
		}

		return players.remove(player);
	}

	public boolean isEmpty() {
		if(players.size() == 0) {
			return true;
		}

		return false;
	}
	
	public boolean isFull() {
		if(players.size() == 2) {
			return true;
		}

		return false;
	}

	public Optional<Player> getOpponent(String username) {
		return players.stream().filter(player -> !player.getUsername().equals(username)).findAny();
	}

	public Player findPlayerByNickname(String username) {
		return players.stream().filter(player -> player.getUsername().equals(username)).findAny().get();
	}

	public boolean isAllReady() {
		if(players.size() != 2) {
			return false;
		}
		for(Player player : players) {
			if(!player.isReady()) {
				return false;
			}
		}

		return true;
	}

	public void play() throws Exception {
    	
    	if(!this.isFull()) return;

		Player black = null;
		Player white = null;
		for(Player player : players) {
			if(black == null) {
				black = player;
			} else {
				white = player;
			}
		}

    	String messageToBlack = objectMapper.writeValueAsString(new SetColorMessage("black"));
    	String messageToWhite = objectMapper.writeValueAsString(new SetColorMessage("white"));

		black.getSession().getAsyncRemote().sendText(messageToBlack);
		white.getSession().getAsyncRemote().sendText(messageToWhite);
	}

	public String[] getInfo() {
		String[] info = new String[]{String.valueOf(index), this.getTitle(), String.valueOf(this.getPlayers().size())};
		return info;
	}

}