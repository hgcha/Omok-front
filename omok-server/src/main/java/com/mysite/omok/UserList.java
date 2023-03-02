package com.mysite.omok;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import jakarta.websocket.Session;

public class UserList {

	private static final Map<Session, String> userList = Collections.synchronizedMap(new HashMap<Session, String>());
	
	private UserList() {}
	
	public static Map<Session, String> getUserList() {
		return userList;
	}
	
}