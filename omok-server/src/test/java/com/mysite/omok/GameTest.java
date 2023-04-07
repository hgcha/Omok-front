package com.mysite.omok;

import com.mysite.omok.Member.Player;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GameTest {

    @Test
    @DisplayName("acceptPlayer가 정상적으로 작동하는지 확인")
    void releasePlayerTest() {
        Game game = new Game("Hello!", 1L);
        Player playerA = new Player("UserA", null);
        game.acceptPlayer(playerA);
        game.releasePlayer(playerA);

        assertThat(game.getPlayers().size()).isEqualTo(0);
    }

    @Test
    @DisplayName("acceptPlayer가 정상적으로 작동하는지 확인")
    void acceptPlayerTest() {
        Game game = new Game("GameA", 2L);
        Player playerA = new Player("UserA", null);
        Player playerB = new Player("UserB", null);
        Player playerC = new Player("UserC", null);

        game.acceptPlayer(playerA);
        assertThat(game.getPlayers().size()).isEqualTo(1);

        game.acceptPlayer(playerB);
        game.acceptPlayer(playerC);
        assertThat(game.getPlayers().size()).isEqualTo(2);
    }

}