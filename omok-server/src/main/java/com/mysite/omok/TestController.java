package com.mysite.omok;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.websocket.Session;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin
public class TestController {

	private final Map<Session, String> map;
	
	@GetMapping("/hello")
	public void test() {
		System.out.println(map.toString());
	}
}
