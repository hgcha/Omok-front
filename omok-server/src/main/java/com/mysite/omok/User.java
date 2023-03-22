package com.mysite.omok;

import jakarta.websocket.Session;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class User {

	private final String nickname;
	private final Session session;
	private boolean isReady = false;

	public void setReady(boolean isReady) {
		this.isReady = isReady;
	}

	public Map<String, Object> getInfo() {
		Map<String, Object> info = new HashMap<>();
		info.put("nickname", nickname);
		info.put("ready", Boolean.valueOf(isReady));
		return info;
	}

}