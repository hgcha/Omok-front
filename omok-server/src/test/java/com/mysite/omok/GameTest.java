package com.mysite.omok;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class GameTest {

    @Test
    @DisplayName("acceptPlayer가 정상적으로 작동하는지 확인")
    void releasePlayerTest() {
        Game game = new Game("Hello!", 1L);
        User userA = new User("UserA", null);
        game.acceptPlayer(userA);
        game.releasePlayer(userA);

        assertThat(game.getPlayers().size()).isEqualTo(0);
    }

    @Test
    @DisplayName("acceptPlayer가 정상적으로 작동하는지 확인")
    void acceptPlayerTest() {
        Game game = new Game("GameA", 2L);
        User userA = new User("UserA", null);
        User userB = new User("UserB", null);
        User userC = new User("UserC", null);

        game.acceptPlayer(userA);
        assertThat(game.getPlayers().size()).isEqualTo(1);

        game.acceptPlayer(userB);
        game.acceptPlayer(userC);
        assertThat(game.getPlayers().size()).isEqualTo(2);
    }

}