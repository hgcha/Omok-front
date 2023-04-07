package com.mysite.omok.Member;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mysite.omok.GameRecord.GameRecord;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String password;

    private LocalDateTime joinedAt;

    private Integer numberOfGamesPlayed = 0;

    private Integer numberOfGamesWon = 0;

    private LocalDateTime lastLogin;

    @OneToMany(mappedBy = "winner")
    @JsonIgnore
    private List<GameRecord> winGameRecord;

    @OneToMany(mappedBy = "loser")
    @JsonIgnore
    private List<GameRecord> loseGameRecord;

    public Member(String username, String email, String password, LocalDateTime joinedAt) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.joinedAt = joinedAt;
    }

    public Member() {
    }
}
