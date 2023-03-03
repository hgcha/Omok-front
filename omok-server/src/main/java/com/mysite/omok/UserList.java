package com.mysite.omok;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

public class UserList {

	private static final List<User> userList = Collections.synchronizedList(new LinkedList<User>());
	
	private UserList() {}
	
	public static List<User> getUserList() {
		return userList;
	}
	
	public static String[] getUserNicknameList() {
		String[] userNicknameList = new String[userList.size()];
		for(int i = 0; i < userNicknameList.length; i++) {
			userNicknameList[i] = userList.get(i).getNickname();
		}
		
		return userNicknameList;
	}
	
}