package com.mysite.omok;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UserController {

	@PostMapping("/user")
	public void setNickname(HttpSession session, @RequestBody String nickname) {
		System.out.println(session.toString());
		System.out.println(nickname);
	}
	
}	