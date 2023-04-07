package com.mysite.omok.Member;

import jakarta.websocket.Session;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class Player {

	private final String username;
	private final Session session;
	private boolean isReady = false;

	public void setReady(boolean isReady) {
		this.isReady = isReady;
	}

	public Map<String, Object> getInfo() {
		Map<String, Object> info = new HashMap<>();
		info.put("username", username);
		info.put("ready", Boolean.valueOf(isReady));
		return info;
	}

}