package com.mysite.omok.GameRecord;

import com.mysite.omok.Member.Member;
import com.mysite.omok.Member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/gameRecord")
@CrossOrigin("*")
@RequiredArgsConstructor
@Controller
public class GameRecordController {

    private final GameRecordService gameRecordService;
    private final MemberService memberService;

    @PostMapping
    @ResponseBody
    public String record(@RequestBody Map<String, String> request) throws Exception {
        gameRecordService.create(request.get("winnerColor"), request.get("winner"), request.get("loser"));
        return "게임이 기록되었습니다.";
    }
}
