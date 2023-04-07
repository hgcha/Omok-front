package com.mysite.omok.Member;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/member")
@Controller
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    @ResponseBody
    public String login(@RequestBody LoginForm loginForm, HttpSession session) throws Exception {
        Member member = memberService.getMember(loginForm.getUsername());
        if(member.getPassword().equals(loginForm.getPassword())) {
            memberService.recordLogin(member.getUsername());
            return "성공적으로 로그인되었습니다.";
        } else {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }
    }

    @PostMapping("/signup")
    @ResponseBody
    public String signup(@RequestBody SignupForm signupForm) {
        memberService.create(signupForm.getUsername(), signupForm.getEmail(), signupForm.getPassword());
        return "회원 가입이 완료되었습니다.";
    }

    @GetMapping
    @ResponseBody
    public Member getMember(@RequestParam("username") String username) throws Exception {
        return memberService.getMember(username);
    }

}
