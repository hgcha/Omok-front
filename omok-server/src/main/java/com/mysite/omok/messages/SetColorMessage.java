package com.mysite.omok.messages;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetColorMessage {
	private String type;
	private String color;

	public SetColorMessage(String color) {
		this.type = "SET_STONE_COLOR";
		this.color = color;
	}
}
