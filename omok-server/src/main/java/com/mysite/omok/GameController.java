package com.mysite.omok;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor
@RestController
public class GameController {

	private final List<Game> gameList;
	
	@PostMapping("/createGame")
	public void createGame(HttpSession session, @RequestBody String title) {
//		gameList.add(new Game(title, nickname));
//		System.out.println("createGame " + session.toString() + ": " + nickname);
	}
	
	@GetMapping("/gameList")
	public List<Game> gameList() {
		return gameList;
	}

}
