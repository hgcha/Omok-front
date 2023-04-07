package com.mysite.omok.GameRecord;

import com.mysite.omok.Member.Member;
import com.mysite.omok.Member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class GameRecordService {

    private final GameRecordRepository gameRecordRepository;
    private final MemberRepository memberRepository;

    public GameRecord create(String winnerColor, String winnerUsername, String loserUsername) {
        Member winner = memberRepository.findByUsername(winnerUsername).get();
        Member loser = memberRepository.findByUsername(loserUsername).get();

        GameRecord gameRecord = new GameRecord();
        gameRecord.setWinnerColor(winnerColor);
        gameRecord.setWinner(winner);
        gameRecord.setLoser(loser);
        gameRecord.setEndTime(LocalDateTime.now());
        this.gameRecordRepository.save(gameRecord);

        winner.setNumberOfGamesPlayed(winner.getNumberOfGamesPlayed() + 1);
        winner.setNumberOfGamesWon(winner.getNumberOfGamesWon() + 1);
        this.memberRepository.save(winner);

        loser.setNumberOfGamesPlayed(loser.getNumberOfGamesPlayed() + 1);
        this.memberRepository.save(loser);

        return gameRecord;
    }

}
