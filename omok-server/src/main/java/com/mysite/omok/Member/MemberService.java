package com.mysite.omok.Member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member create(String username, String email, String password) {
        Member member = new Member(username, email, password, LocalDateTime.now());
        this.memberRepository.save(member);
        return member;
    }

    public Member getMember(String username) throws Exception {
        Optional<Member> member = memberRepository.findByUsername(username);
        if(member.isPresent()) {
            return member.get();
        } else {
            throw new Exception("찾으려는 회원이 없습니다.");
        }
    }

    public void recordLogin(String username) throws Exception {
        Optional<Member> optionalMember = memberRepository.findByUsername(username);
        if(optionalMember.isPresent()) {
            Member member = optionalMember.get();
            member.setLastLogin(LocalDateTime.now());
            this.memberRepository.save(member);
        } else {
            throw new Exception("찾으려는 회원이 없습니다.");
        }
    }

}