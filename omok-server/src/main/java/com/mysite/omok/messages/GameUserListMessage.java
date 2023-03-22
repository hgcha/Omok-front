package com.mysite.omok.messages;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameUserListMessage {
    private String type = "GAME_USERLIST";
    private String gameUserList;

    public GameUserListMessage(String gameUserList) {
        this.gameUserList = gameUserList;
    }

}
