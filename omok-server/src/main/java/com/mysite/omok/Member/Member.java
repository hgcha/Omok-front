package com.mysite.omok.User;

import com.mysite.omok.GameRecord.GameRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    private Integer numberOfGamesPlayed;

    private Integer numberOfGamesWon;

    private LocalDateTime lastLogin;

    private LocalDateTime joinedAt;

    @OneToMany(mappedBy = "winner")
    private List<GameRecord> winGameRecord;

    @OneToMany(mappedBy = "loser")
    private List<GameRecord> loseGameRecord;

}
