package com.mysite.omok.messages;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StonePositionMessage {
	private String type;
	private String color;
	private int row;
	private int col;
	
	public StonePositionMessage(String color, int row, int col) {
		this.type = "GET_OPPONENT_POSITION";
		this.color = color;
		this.row = row;
		this.col = col;
	}
	
}