package com.mysite.omok;

import com.fasterxml.jackson.databind.ObjectMapper;
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
	private final Set<User> players = new HashSet<>();
	private final String title;
	private final Long index;

	public boolean acceptPlayer(User user) {
		if(isFull()) {
			return false;
		}

		return players.add(user);
	}
	
	public boolean releasePlayer(User user) {
		if(isEmpty()) {
			return false;
		}

		return players.remove(user);
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

	public Optional<User> getOpponent(String nickname) {
		return players.stream().filter(user -> !user.getNickname().equals(nickname)).findAny();
	}

	public User findPlayerByNickname(String nickname) {
		return players.stream().filter(user -> user.getNickname().equals(nickname)).findAny().get();
	}

	public boolean isAllReady() {
		if(players.size() != 2) {
			return false;
		}
		for(User player : players) {
			if(!player.isReady()) {
				return false;
			}
		}

		return true;
	}

	public void play() throws Exception {
    	
    	if(!this.isFull()) return;

		User black = null;
		User white = null;
		for(User player : players) {
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