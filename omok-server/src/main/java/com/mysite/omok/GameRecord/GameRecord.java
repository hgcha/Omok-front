package com.mysite.omok.GameRecord;

import com.mysite.omok.Member.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
public class GameRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String winnerColor;

    private LocalDateTime endTime;

    @ManyToOne
    private Member winner;

    @ManyToOne
    private Member loser;

}
